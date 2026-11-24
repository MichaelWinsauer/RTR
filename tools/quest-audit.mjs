#!/usr/bin/env node
// Quest-chain audit for the Twee project.
//
//   node tools/quest-audit.mjs [--chain] [--quiet] [--no-links] [--root <dir>]
//
//   --chain     also print every quest line step by step (type, where, what it needs)
//   --quiet     hide INFO findings
//   --no-links  skip the project-wide broken [[link]] / <<goto>> / <<include>> check
//   --root      project root (default: the folder above this script)
//
// Exit code is 1 when there are ERROR findings, so it can run in CI or a git hook.
//
// How it works: the quest arrays ($player/$mom/... .quests, one per key in setup.questLines) are evaluated straight out of
// the <<set ... to [ ... ]>> blocks, so the audit sees exactly what the game sees. Every quest
// has a unique string id; a line starts at <<set $player.quest to "id">> and NextQuest follows
// each quest's "next" id. Array order does not matter.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const rootArg = args.indexOf('--root');
const root = path.resolve(rootArg >= 0 ? args[rootArg + 1] : path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));

// the quest lines come from setup.questLines in Define Quests (see LINES below)
const DEFAULT_LINE_KEYS = ['player', 'mom', 'sister'];
const SKIP_DIRS = new Set(['node_modules', '.git', '.storyformats', '.vscode', 'build', 'tools']);
const QUEST_DIR = /(^|\/)quests\//;

// ---------------------------------------------------------------- loading ----

const rel = (f) => path.relative(root, f).split(path.sep).join('/');
const issues = [];
const report = (sev, where, msg) => issues.push({ sev, where, msg });

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(twee|tw)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const files = walk(root).map((f) => ({ file: rel(f), text: fs.readFileSync(f, 'utf8') }));

// Every quest line the game knows: <<set setup.questLines = ["player", "mom", ...]>> in Define Quests.
// Each key K has its quests in <<set $K.quests to [ ... ]>> and its start in <<set $K.quest to "id">>.
function readLineKeys() {
  for (const { file, text } of files) {
    const m = text.match(/<<set\s+setup\.questLines\s*(?:=|to)\s*(\[[^\]]*\])\s*>>/);
    if (!m) continue;
    try { return JSON.parse(m[1].replace(/'/g, '"')); }
    catch (e) { report('ERROR', file, `Could not read setup.questLines: ${e.message}`); }
  }
  report('WARN', '-', `setup.questLines not found, falling back to ${DEFAULT_LINE_KEYS.join(', ')}`);
  return DEFAULT_LINE_KEYS;
}
const LINES = readLineKeys().map((key) => ({ key, sel: `$${key}.quests`, nextVar: key }));
const passages = new Map(); // name -> { name, tags, file, line, lines[] }
const HEADER = /^::\s*([^[{]+?)\s*(?:\[([^\]]*)\])?\s*(?:\{.*\})?\s*$/;

for (const { file, text } of files) {
  const lines = text.split(/\r?\n/);
  let cur = null;
  lines.forEach((ln, i) => {
    const m = ln.startsWith('::') && HEADER.exec(ln);
    if (m) {
      cur = { name: m[1].trim(), tags: (m[2] || '').split(/\s+/).filter(Boolean), file, line: i + 1, lines: [] };
      if (passages.has(cur.name)) {
        const o = passages.get(cur.name);
        report('ERROR', `${file}:${i + 1}`, `Duplicate passage "${cur.name}" (first defined at ${o.file}:${o.line})`);
      } else passages.set(cur.name, cur);
    } else if (cur) cur.lines.push({ text: ln, no: i + 1 });
  });
}

// ---------------------------------------------------------- array parsing ----

function matchBracket(t, start) {
  let depth = 0;
  for (let i = start; i < t.length; i++) {
    const c = t[i], n = t[i + 1];
    if (c === '/' && n === '*') { i = t.indexOf('*/', i + 2); if (i < 0) return -1; i++; continue; }
    if (c === '/' && n === '/') { i = t.indexOf('\n', i); if (i < 0) return -1; continue; }
    if (c === '"' || c === "'" || c === '`') { for (i++; i < t.length && t[i] !== c; i++) if (t[i] === '\\') i++; continue; }
    if (c === '[' || c === '{') depth++;
    else if ((c === ']' || c === '}') && --depth === 0) return i;
  }
  return -1;
}

// Finds `<<set <selector> to [ ... ]>>` (or `{ ... }`) and evaluates the literal.
function readArray(selector, context = {}) {
  const re = new RegExp('<<set\\s+' + selector.replace(/[$.]/g, '\\$&') + '\\s+to\\s*[\\[{]', 'g');
  for (const { file, text } of files) {
    const m = re.exec(text);
    if (!m) continue;
    const open = m.index + m[0].length - 1;
    const close = matchBracket(text, open);
    const lineOf = (idx) => text.slice(0, idx).split('\n').length;
    if (close < 0) { report('ERROR', `${file}:${lineOf(open)}`, `Unbalanced brackets in ${selector}`); return null; }
    const body = text.slice(open, close + 1);
    let value;
    try { value = vm.runInNewContext('(' + body + ')', { ...context }, { timeout: 1000 }); }
    catch (e) { report('ERROR', `${file}:${lineOf(open)}`, `Could not evaluate ${selector}: ${e.message}`); return null; }
    // line of each entry = line of its n-th top-level `title:`
    const titleLines = [...body.matchAll(/^\s*title\s*:/gm)].map((t) => lineOf(open) + body.slice(0, t.index).split('\n').length - 1);
    return { file, value, lineOf: (i) => titleLines.length === value.length ? titleLines[i] : lineOf(open) };
  }
  return null;
}

const locs = readArray('$locations');
// quest `where` is matched against passage() (see SetLocation / CheckForEvent), i.e. the location's passage name
const locNames = locs ? new Set(locs.value.flatMap((l) => [l.passage, l.name])) : null;
// quests use setup.getLocationBySysName(...) for `where`; any other setup helper is stubbed as "returns undefined"
const setupStub = new Proxy({ getLocationBySysName: (n) => (locs ? locs.value.find((l) => l.sysName === n) : undefined) },
  { get: (t, k) => (k in t ? t[k] : () => undefined) });
const evalContext = { $locations: locs ? locs.value : [], setup: setupStub };
if (!locNames) report('INFO', '-', 'Could not read $locations; skipping the "where" location check');
let slotCount = 0;
for (const { text } of files) for (const m of text.matchAll(/<<set\s+\$timeSlots\[(\d+)\]/g)) slotCount = Math.max(slotCount, +m[1] + 1);

// devices for the quest `device` field: no key = the Stage 0 prototype, otherwise $company.devices[key]
const impactCost = readArray('$company.impactCost')?.value;
const prototypeDef = readArray('$company.prototype')?.value;
// device names are built from the prototype's name ($company.prototype.name + " Veil"), so pass it in
const devices = { prototype: prototypeDef, ...(readArray('$company.devices', { $company: { prototype: prototypeDef || {} } })?.value || {}) };
if (!impactCost || !devices.prototype) report('INFO', '-', 'Could not read $company.impactCost / $company.prototype; skipping the quest device check');

const quests = {}; // key -> { def, entries[] }
for (const L of LINES) {
  const arr = readArray(L.sel, evalContext);
  if (!arr) { report('ERROR', '-', `Quest line ${L.sel} not found`); continue; }
  quests[L.key] = { ...arr, L };
}
const where = (L, i) => `${quests[L].file}:${quests[L].lineOf(i)}`;
const label = (L, i) => `${quests[L].value[i].id} "${quests[L].value[i].title}"`;
const wired = (q) => q.needsEvent === true && !!q.passage && !!q.returnPassage;

// ------------------------------------------------------------- ids & chains ----

const byId = new Map(); // id -> { L, i, q }
for (const [L, { value }] of Object.entries(quests)) {
  value.forEach((q, i) => {
    if (typeof q.id !== 'string' || !q.id) { report('ERROR', where(L, i), `${L}[${i}] "${q.title}": id must be a non-empty string, got ${JSON.stringify(q.id)}`); return; }
    if (byId.has(q.id)) { const o = byId.get(q.id); report('ERROR', where(L, i), `${label(L, i)}: duplicate id (also used at ${where(o.L, o.i)}); ids must be unique across all quest lines`); return; }
    byId.set(q.id, { L, i, q });
  });
}

// the start of each line: <<set $player.quest to "id">>
const starts = {};
for (const { text } of files) {
  for (const m of text.matchAll(/<<set\s+\$(\w+)\.quest\s+(?:to|=)\s*["']([^"']+)["']\s*>>/g)) if (quests[m[1]]) starts[m[1]] = m[2];
}

// walk every line from its start along "next"
const chains = {}; // L -> [index, ...] in story order
for (const L of Object.keys(quests)) {
  const order = [];
  const start = starts[L];
  if (!start) report('ERROR', '-', `No start quest for ${L}: expected <<set $${L}.quest to "some_id">> in Define Quests`);
  else if (!byId.has(start)) report('ERROR', '-', `Start quest of ${L} is "${start}", but no quest has that id`);
  else if (byId.get(start).L !== L) report('ERROR', '-', `Start quest of ${L} is "${start}", but that quest belongs to ${byId.get(start).L}`);
  else {
    const seen = new Set();
    let ref = byId.get(start);
    while (ref) {
      if (seen.has(ref.q.id)) { report('ERROR', where(L, ref.i), `${label(L, ref.i)}: "next" leads back to a quest that already came before, the line loops forever`); break; }
      seen.add(ref.q.id);
      order.push(ref.i);
      const nxt = ref.q.next;
      if (nxt === undefined) break;
      const target = byId.get(nxt);
      if (!target) { report('ERROR', where(L, ref.i), `${label(L, ref.i)}: next "${nxt}" does not exist`); break; }
      if (target.L !== L) { report('ERROR', where(L, ref.i), `${label(L, ref.i)}: next "${nxt}" belongs to ${target.L}, not ${L}`); break; }
      ref = target;
    }
  }
  chains[L] = order;
  const inChain = new Set(order);
  quests[L].value.forEach((q, i) => {
    if (starts[L] && !inChain.has(i) && byId.get(q.id)?.i === i) report('WARN', where(L, i), `${label(L, i)}: not reachable from the start "${starts[L]}" through "next", so it can never become active`);
  });
}
const chainPos = (L, i) => chains[L].indexOf(i);

// every quest id written anywhere in the project must exist
const ID_REFS = [
  /setup\.(?:getQuestById|getQuestLine|questDone|questReached|activateQuest)\(\s*(["'])([^"']+)\1/g,
  /<<SkipToQuest\s+\$(\w+)\s+(["'])([^"']+)\2/g,
];
for (const { file, text } of files) {
  const lines = text.split(/\r?\n/);
  lines.forEach((ln, n) => {
    for (const m of ln.matchAll(ID_REFS[0])) if (!byId.has(m[2])) report('ERROR', `${file}:${n + 1}`, `Unknown quest id "${m[2]}"`);
    for (const m of ln.matchAll(ID_REFS[1])) {
      const t = byId.get(m[3]);
      if (!t) report('ERROR', `${file}:${n + 1}`, `Unknown quest id "${m[3]}"`);
      else if (t.L !== m[1]) report('ERROR', `${file}:${n + 1}`, `SkipToQuest $${m[1]} "${m[3]}": that quest belongs to ${t.L}`);
    }
    // leftovers from the index-based system
    if (/\$(\w+)\.quests\[|\$(\w+)\.quest\s*(\+\+|--|[<>]=?|[=!]==?\s*\d)/.test(ln)) {
      report('ERROR', `${file}:${n + 1}`, `Index-based quest reference: ${ln.trim().slice(0, 90)} (use the quest id helpers from Define Quests)`);
    }
  });
}

// ------------------------------------------------------------ link scanning ----

function targetsOf(lineText) {
  const out = [];
  for (const m of lineText.matchAll(/\[\[(.+?)\]\]/g)) {
    let t = m[1].split('][')[0];
    if (t.includes('|')) t = t.slice(t.lastIndexOf('|') + 1);
    else if (t.includes('->')) t = t.slice(t.lastIndexOf('->') + 2);
    else if (t.includes('<-')) t = t.slice(0, t.indexOf('<-'));
    out.push(t.trim());
  }
  for (const m of lineText.matchAll(/<<(?:goto|include|display)\s+(["'])((?:(?!\1).)+)\1/g)) out.push(m[2].trim());
  for (const m of lineText.matchAll(/<<(?:link|button)\s+(?:"[^"]*"|'[^']*')\s*,?\s*(["'])((?:(?!\1).)+)\1/g)) out.push(m[2].trim());
  for (const m of lineText.matchAll(/data-passage\s*=\s*["']([^"']+)["']/g)) out.push(m[1].trim());
  for (const m of lineText.matchAll(/Engine\s*\.\s*(?:play|goto)\s*\(\s*["']([^"']+)["']/g)) out.push(m[1].trim());
  // a POV passage goes on to $povReturn (<<EndPov>>), so a scene that sets it before the POV leads there
  for (const m of lineText.matchAll(/\$povReturn\s+(?:to|=)\s*(["'])((?:(?!\1).)+)\1/g)) out.push(m[2].trim());
  return out.filter((t) => t && !/\$|<<|\+|\(|["{]|^_[\w.[\]]+$|^https?:|\.(jpg|png|gif|mp4|webm|mp3|ogg)$/i.test(t));
}

if (!flag('--no-links')) {
  for (const p of passages.values()) {
    const seen = new Set();
    for (const { text, no } of p.lines) {
      for (const t of targetsOf(text)) {
        if (passages.has(t) || seen.has(t)) continue;
        seen.add(t);
        report('ERROR', `${p.file}:${no}`, `Broken link: no passage "${t}" (in "${p.name}")`);
      }
    }
  }
}

// ------------------------------------------------------------- quest checks ----

const declared = new Map(); // passage name -> [{L,i}]
for (const L of Object.keys(quests)) {
  quests[L].value.forEach((q, i) => {
    if (q.passage) { if (!declared.has(q.passage)) declared.set(q.passage, []); declared.get(q.passage).push({ L, i }); }
  });
}

const advances = (p) => {
  const set = new Set();
  for (const { text } of p.lines) for (const m of text.matchAll(/<<NextQuest\s+\$(\w+)/g)) set.add(m[1]);
  return set;
};

// passages reachable from a quest passage without walking into another quest's own passage
function reach(start) {
  const seen = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const p = passages.get(queue.shift());
    if (!p) continue;
    for (const { text } of p.lines) for (const t of targetsOf(text)) {
      const q = passages.get(t);
      if (!q || seen.has(t) || !QUEST_DIR.test(q.file) || declared.has(t)) continue;
      seen.add(t); queue.push(t);
    }
  }
  return seen;
}

const reachedAll = new Set();
const needs = new Map(); // "C:L:i" -> Set of "S:M:N"
const addEdge = (a, b) => { if (!needs.has(a)) needs.set(a, new Set()); needs.get(a).add(b); };

for (const [L, { value }] of Object.entries(quests)) {
  value.forEach((q, i) => {
    const at = where(L, i), name = label(L, i);

    // event wiring (GenerateEventsForQuests needs needsEvent + passage + returnPassage)
    if (q.needsEvent === true && (!q.passage || !q.returnPassage)) report('ERROR', at, `${name}: needsEvent is true but passage/returnPassage is missing, so GenerateEventsForQuests creates no event and the quest can never start`);
    if (q.passage && q.needsEvent !== true) report('WARN', at, `${name}: has passage "${q.passage}" but needsEvent is not true, so no event is created for it`);
    for (const k of ['passage', 'returnPassage']) if (q[k] && !passages.has(q[k])) report('ERROR', at, `${name}: ${k} "${q[k]}" does not exist`);

    // schedule data
    if (locNames) for (const entry of q.where || []) {
      const w = (entry && typeof entry === 'object') ? entry.passage : entry;
      if (!locNames.has(w)) report('ERROR', at, `${name}: location "${w}" is not in $locations`);
    }
    for (const d of q.whenDay || []) if (!(d >= 0 && d <= 6)) report('ERROR', at, `${name}: whenDay ${d} is outside 0-6`);
    if (slotCount) for (const t of q.whenTime || []) if (!(t >= 0 && t < slotCount)) report('ERROR', at, `${name}: whenTime ${t} is outside the ${slotCount} time slots`);
    if (q.requirements && (q.requirementsText || []).length !== q.requirements.length) report('WARN', at, `${name}: ${q.requirements.length} requirement(s) but ${(q.requirementsText || []).length} requirementsText line(s)`);

    // optional quests (skip, see "Optional quests" in Define Quests)
    if (q.skip !== undefined) {
      if (typeof q.skip !== 'string' || !q.skip.trim()) report('ERROR', at, `${name}: skip must be a TwineScript string`);
      else if (q.next === undefined) report('ERROR', at, `${name}: has a skip, but it is the last quest of its line, which can never be skipped`);
      else if (/^\s*!\s*\$/.test(q.skip)) report('WARN', at, `${name}: skip "${q.skip}" is also true while the decision is still null; compare with === false instead`);
    }

    // device use (Define Quests turns it into calibration + charge requirements, the scene spends it with <<UseQuestDevice>>)
    if (q.device && impactCost && devices.prototype) {
      // a device list (two targets, the Catalyst Night) is checked entry by entry; a device with anyTarget only
      // needs a calibration, so its target only has to be somebody
      for (const d of (Array.isArray(q.device) ? q.device : [q.device])) {
        const dev = devices[d.key || 'prototype'];
        if (!dev) report('ERROR', at, `${name}: device key "${d.key}" is not in $company.devices`);
        else if (!dev.anyTarget && !(dev.calibrationPresets || []).includes(d.target)) report('ERROR', at, `${name}: device target "${d.target}" is not a calibration preset of ${d.key || 'the prototype'} (${(dev.calibrationPresets || []).join(', ')})`);
        else if (dev.anyTarget && !d.target) report('ERROR', at, `${name}: device entry without a target`);
        if (!(d.impact >= 1 && d.impact < impactCost.length)) report('ERROR', at, `${name}: device impact ${d.impact} is outside 1-${impactCost.length - 1}`);
      }
      if (!q.passage || !passages.has(q.passage)) report('WARN', at, `${name}: has a device but no scene passage to spend the charge in`);
      else if (![...reach(q.passage)].some((n) => passages.get(n).lines.some(({ text }) => /<<UseQuestDevice\s/.test(text)))) report('WARN', at, `${name}: has a device, but "${q.passage}" and the passages it leads to never call <<UseQuestDevice>>, so no charge is spent`);
    }

    // how does this quest advance?
    const last = q.next === undefined;
    if (wired(q) && passages.has(q.passage)) {
      const r = reach(q.passage);
      r.forEach((n) => reachedAll.add(n));
      const ok = [...r].some((n) => advances(passages.get(n)).has(quests[L].L.nextVar));
      if (!ok) report('WARN', at, `${name}: no <<NextQuest $${quests[L].L.nextVar}>> found in "${q.passage}" or the quest passages it leads to; the line may stall here unless something else advances it`);
    } else if (!q.check && !last) {
      report('INFO', at, `${name}: no check and no event, so it must be advanced by other code (<<NextQuest>> elsewhere)`);
    }

    // dependency graph: S = the line has reached the quest, C = the quest is completed
    // (unknown ids in check/requirements/set are already reported by the id scan above)
    const next = byId.get(q.next);
    if (next && next.L === L) addEdge(`S:${L}:${next.i}`, `C:${L}:${i}`);
    addEdge(`C:${L}:${i}`, `S:${L}:${i}`);
    for (const text of [q.check, ...(q.requirements || [])]) {
      if (typeof text !== 'string') continue;
      for (const m of text.matchAll(/setup\.(questDone|questReached)\(\s*(["'])([^"']+)\2/g)) {
        const t = byId.get(m[3]);
        if (!t) continue;
        if (chainPos(t.L, t.i) < 0) report('ERROR', at, `${name}: waits for "${m[3]}", but that quest is not reachable in ${t.L}'s line; this can never be true`);
        else if (m[1] === 'questDone' && t.q.next === undefined) report('ERROR', at, `${name}: waits for "${m[3]}" to be done, but it is the last quest of ${t.L}'s line and is never finished`);
        else addEdge(`C:${L}:${i}`, `${m[1] === 'questDone' ? 'C' : 'S'}:${t.L}:${t.i}`);
      }
    }
  });
}

// deadlocks across quest lines
const color = new Map();
const cycles = new Set();
const nodeText = (n) => { const [k, L, i] = n.split(':'); return `${k === 'S' ? 'reach' : 'finish'} ${label(L, +i)}`; };
function dfs(n, stack) {
  color.set(n, 1); stack.push(n);
  for (const m of needs.get(n) || []) {
    if (color.get(m) === 1) {
      const cyc = stack.slice(stack.indexOf(m));
      const key = [...cyc].sort().join('|');
      if (!cycles.has(key)) {
        cycles.add(key);
        const [, L, i] = m.split(':');
        report('ERROR', where(L, +i), `Deadlock: ${cyc.map(nodeText).join(' -> needs -> ')} -> needs -> ${nodeText(m)}`);
      }
    } else if (!color.get(m)) dfs(m, stack);
  }
  stack.pop(); color.set(n, 2);
}
for (const n of needs.keys()) if (!color.get(n)) dfs(n, []);

// shared / orphaned quest passages
for (const [name, users] of declared) {
  if (users.length > 1) report('WARN', where(users[1].L, users[1].i), `Passage "${name}" is used by ${users.map((u) => label(u.L, u.i)).join(' and ')}`);
}
// POV passages of events and deals are opened from her end-of-day report: setup.dayReports.<sysName>.<id>.passage
// (Define NPCs). Those count as reached, and each of them has to exist.
const dayReportPassages = new Set();
{
  const def = passages.get('Define NPCs');
  const text = def ? def.lines.map((l) => l.text).join('\n') : '';
  const block = /<<set\s+setup\.dayReports\s+to\s+\{([\s\S]*?)\n\}>>/.exec(text);
  if (block) {
    for (const m of block[1].matchAll(/passage:\s*["']([^"']+)["']/g)) {
      dayReportPassages.add(m[1]);
      if (!passages.has(m[1])) report('ERROR', `${def.file}:${def.line}`, `setup.dayReports: passage "${m[1]}" does not exist`);
    }
  }
}
for (const p of passages.values()) {
  if (QUEST_DIR.test(p.file) && !declared.has(p.name) && !reachedAll.has(p.name) && !dayReportPassages.has(p.name)) {
    report('WARN', `${p.file}:${p.line}`, `Orphan: "${p.name}" is in the quests folder but no quest uses it or leads to it`);
  }
}

// unfinished markers
const MARK = /\b(TODO|FIXME|WIP|XXX|lorem ipsum|(?<!:)placeholder(?!\s*=))\b/i;
for (const p of passages.values()) {
  if (p.name.startsWith('Notes for me')) continue;
  for (const { text, no } of p.lines) if (MARK.test(text)) report('WARN', `${p.file}:${no}`, `Unfinished marker: ${text.trim().slice(0, 90)}`);
}

// Stage 1 stubs: quests, data and scenes that are structure only. One line, so they are never forgotten
{
  const stubFiles = files.map(({ file, text }) => ({ file, n: (text.match(/STAGE1-STUB/g) || []).length })).filter((f) => f.n > 0);
  const total = stubFiles.reduce((sum, f) => sum + f.n, 0);
  if (total) report('WARN', '-', `${total} STAGE1-STUB marker(s) left in ${stubFiles.length} file(s): unfinished Stage 1 quests, data and scenes (grep -rn STAGE1-STUB dev)`);
}

// help dialog: every page listed in "Help Index" must exist
{
  const idx = passages.get('Help Index');
  if (idx) {
    for (const { text, no } of idx.lines) {
      const m = /^-\s+(.+?)\s*\|\s*(.+?)\s*$/.exec(text);
      if (m && !passages.has(m[2])) report('ERROR', `${idx.file}:${no}`, `Help page "${m[2]}" (link "${m[1]}") does not exist`);
    }
  }
}

// ------------------------------------------------------------------ output ----

console.log(`Quest audit for ${root}`);
console.log(`${passages.size} passages in ${files.length} files`);
for (const [L, { value }] of Object.entries(quests)) console.log(`  ${L.padEnd(7)} ${String(value.length).padStart(3)} quests  (${quests[L].file})`);

if (flag('--chain')) {
  for (const [L, { value }] of Object.entries(quests)) {
    console.log(`\n== ${L} ==`);
    chains[L].map((i) => [value[i], i]).forEach(([q, i]) => {
      const kind = wired(q) ? 'EVENT ' : q.check ? 'CHECK ' : 'MANUAL';
      const bits = [];
      if (q.where?.length) bits.push(`@ ${q.where.join('/')}`);
      if (q.passage) bits.push(`-> ${q.passage}`);
      if (q.check) bits.push(`check: ${q.check}`);
      if (q.skip) bits.push(`skip: ${q.skip}`);
      for (const r of q.requirements || []) bits.push(`req: ${r}`);
      console.log(`  ${q.id.padEnd(28)}  ${kind}  ${q.title}${bits.length ? '\n        ' + bits.join('\n        ') : ''}`);
    });
  }
}

const order = ['ERROR', 'WARN', 'INFO'];
const counts = { ERROR: 0, WARN: 0, INFO: 0 };
for (const sev of order) {
  if (sev === 'INFO' && flag('--quiet')) continue;
  const list = issues.filter((x) => x.sev === sev);
  if (!list.length) continue;
  console.log(`\n${sev} (${list.length})`);
  for (const x of list) console.log(`  ${x.where}  ${x.msg}`);
}
for (const x of issues) counts[x.sev]++;
console.log(`\n${counts.ERROR} error(s), ${counts.WARN} warning(s), ${counts.INFO} note(s)`);
process.exit(counts.ERROR ? 1 : 0);
