#!/usr/bin/env node
// Checks the media lists of the activities (setup.activities in dev/system/defines/define_activities.twee)
// against the files on disk.
//
//   node tools/activity-media.mjs                    list referenced files that are missing, and files nobody uses
//   node tools/activity-media.mjs --rename           show how the old file names (<text><n>.<ext>) would be renamed
//                                                    to the new scheme (<id>_<n>.<ext>), without touching anything
//   node tools/activity-media.mjs --rename --apply   do those renames
//   --root <folder>                                  the game folder that holds images/ (default: $path in Define Misc)
//
// Folders: images/characters/<sysName>/activities/ (media, stageMedia) and images/characters/<sysName>/tasks/
// (cctv, stageCctv). The tasks folder also holds the media of the task scenes, so it is only checked for
// missing files, not for unused ones.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defineFile = path.join(root, 'dev/system/defines/define_activities.twee');

/* the old file names, before the activities had ids: id -> the text the files were named after */
const LEGACY = {
  mom: {
    sleeping: 'sleeping', working: 'working', showering: 'showering', peeing: 'peeing',
    watching_tv: 'watching TV', cooking: 'cooking', relaxing: 'relaxing',
    helping_landlord0: 'helping the landlord', giving_massage0: 'giving a massage',
    testing_prototype: 'testing the prototype',
  },
  sister: {
    sleeping: 'sleeping', studying: 'studying', showering: 'showering', peeing: 'peeing',
    watching_tv: 'watching TV', watching_reels: 'watching reels', doing_chores: 'doing chores',
    working: 'working', helping_landlord0: 'helping the landlord',
  },
};

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function readActivities() {
  const src = fs.readFileSync(defineFile, 'utf8');
  const start = src.indexOf('<<set setup.activities to');
  if (start === -1) fail('Could not find "<<set setup.activities to" in ' + defineFile);
  const open = src.indexOf('{', start);
  const end = src.indexOf('}>>', open);
  if (end === -1) fail('Could not find the end of setup.activities ("}>>")');
  try {
    /* the "locations" lists call setup.getLocationBySysName; a stub is enough to read the media lists */
    globalThis.setup = { getLocationBySysName: (name) => ({ sysName: name }) };
    return (0, eval)('(' + src.slice(open, end + 1) + ')');
  } catch (e) {
    fail('setup.activities is not plain JavaScript: ' + e.message);
  }
}

function mediaRoot() {
  const i = args.indexOf('--root');
  if (i !== -1 && args[i + 1]) return path.resolve(args[i + 1]);
  const misc = fs.readFileSync(path.join(root, 'dev/system/defines/define_misc.twee'), 'utf8');
  const m = misc.split('\n').find((l) => /^\s*<<set \$path to "file:/.test(l));
  if (!m) fail('No media folder: pass --root <folder> (the folder that holds images/)');
  return fileURLToPath(m.match(/"([^"]+)"/)[1]);
}

const activities = readActivities();
const base = mediaRoot();
const folderOf = (sysName, kind) => path.join(base, 'images/characters', sysName, kind === 'cctv' ? 'tasks' : 'activities');

/* every file list of an activity: [kind, file name], with the per-corruption-stage lists (stageMedia/stageCctv) */
function fileLists(act) {
  const out = [];
  for (const kind of ['media', 'cctv']) {
    for (const file of act[kind] || []) out.push([kind, file, kind]);
    const byStage = act[kind === 'media' ? 'stageMedia' : 'stageCctv'] || {};
    for (const [stage, files] of Object.entries(byStage)) {
      for (const file of files || []) out.push([kind, file, `${kind === 'media' ? 'stageMedia' : 'stageCctv'}.${stage}`]);
    }
  }
  return out;
}
const exists = (p) => fs.existsSync(p);

if (args.includes('--rename')) {
  const apply = args.includes('--apply');
  const plan = [];
  const skipped = [];
  for (const [sysName, list] of Object.entries(activities)) {
    for (const act of Object.values(list)) {
      const oldText = (LEGACY[sysName] || {})[act.id];
      if (!oldText) continue;
      for (const kind of ['media', 'cctv']) {
        for (const file of act[kind] || []) {
          const m = file.match(/^(.*)_(\d+)(\.[^.]+)$/);
          if (!m || m[1] !== act.id) { skipped.push(`${sysName}/${kind}: ${file} does not follow <id>_<n>.<ext>`); continue; }
          const dir = folderOf(sysName, kind);
          const to = path.join(dir, file);
          if (exists(to)) continue;
          const from = path.join(dir, oldText + m[2] + m[3]);
          if (!exists(from)) { skipped.push(`${path.relative(base, to)}: no old file "${oldText + m[2] + m[3]}"`); continue; }
          plan.push({ from, to });
        }
      }
    }
  }
  console.log(`${apply ? 'Renaming' : 'Would rename'} ${plan.length} file(s) in ${base}:`);
  for (const p of plan) {
    console.log(`  ${path.relative(base, p.from)}  ->  ${path.basename(p.to)}`);
    if (apply) fs.renameSync(p.from, p.to);
  }
  if (skipped.length) {
    console.log(`\nNot renamed (${skipped.length}):`);
    for (const s of skipped) console.log('  ' + s);
  }
  if (!apply && plan.length) console.log('\nNothing was changed. Run again with --apply to rename.');
  process.exit(0);
}

/* audit */
let missing = 0;
const used = {};
console.log(`Media folder: ${base}\n`);
for (const [sysName, list] of Object.entries(activities)) {
  used[folderOf(sysName, 'media')] ||= new Set();
  for (const act of Object.values(list)) {
    for (const [kind, file, field] of fileLists(act)) {
      const dir = folderOf(sysName, kind);
      if (kind === 'media') (used[dir] ||= new Set()).add(file);
      if (!exists(path.join(dir, file))) {
        missing++;
        console.log(`MISSING  ${sysName}.${act.id}.${field}: ${path.relative(base, path.join(dir, file))}`);
      }
    }
    if (!(act.media || []).length) console.log(`EMPTY    ${sysName}.${act.id}: no media files yet`);
  }
}
/* only the activities folders: the tasks folder is shared with the task scenes */
let unused = 0;
for (const [dir, files] of Object.entries(used)) {
  if (!exists(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!files.has(f) && fs.statSync(path.join(dir, f)).isFile()) {
      unused++;
      console.log(`UNUSED   ${path.relative(base, path.join(dir, f))}`);
    }
  }
}
console.log(`\n${missing} missing, ${unused} unused.`);
process.exit(missing ? 1 : 0);
