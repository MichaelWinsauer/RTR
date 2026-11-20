#!/usr/bin/env node
// Builds the release version of the game into the release folder.
//
//   node tools/build_release.mjs [--open]
//
//   --open  open the built file in the browser afterwards
//
// Compiles dev/ with Tweego into a temp file, then patches the compiled "Define Misc"
// passage before writing it to RELEASE_DIR:
//   - $path  becomes ""     (media is loaded relative to the HTML)
//   - $debug becomes false
// The dev/ sources are never touched.
//
// Tweego is taken from PATH. If it is somewhere else, set TWEEGO_EXE to its full path.
// The output folder can be overridden with RTR_RELEASE_DIR.

import { spawnSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RELEASE_DIR = process.env.RTR_RELEASE_DIR || 'E:\\Daten\\Development\\Rise to Ruin\\';
const FILE_NAME = 'Rise to Ruin.html';

const args = process.argv.slice(2);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'dev');
const formats = path.join(root, '.storyformats');
const output = path.join(RELEASE_DIR, FILE_NAME);

function fail(msg) {
  console.error(`\n${msg}`);
  process.exit(1);
}

function findTweego() {
  const candidates = [process.env.TWEEGO_EXE, 'tweego', path.join(os.homedir(), 'Downloads', 'tweego', 'tweego.exe')].filter(Boolean);
  for (const c of candidates) {
    const r = spawnSync(c, ['--version'], { encoding: 'utf8' });
    // tweego exits with 1 on --version, so check that it ran and identified itself instead
    if (!r.error && /tweego/i.test(r.stdout + r.stderr)) return c;
  }
  return null;
}

const tweego = findTweego();
if (!tweego) fail('Tweego not found. Put it on your PATH or set TWEEGO_EXE to the full path of tweego.exe.');

// 1. Compile into a temp folder so neither RiseToRuin.html in the project nor dev/ is touched.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rtr-release-'));
const tmpFile = path.join(tmpDir, FILE_NAME);
const tweegoArgs = ['-o', tmpFile, source];

console.log(`${tweego} ${tweegoArgs.join(' ')}`);
const build = spawnSync(tweego, tweegoArgs, {
  stdio: 'inherit',
  env: { ...process.env, TWEEGO_PATH: formats },
});
if (build.status !== 0 || !fs.existsSync(tmpFile)) fail('Build failed.');

let html = fs.readFileSync(tmpFile, 'utf8');
fs.rmSync(tmpDir, { recursive: true, force: true });

// 2. Patch the "Define Misc" passage. Passage text in the compiled HTML is HTML-escaped,
//    so << >> " appear as &lt;&lt; &gt;&gt; &quot;. Only that passage is changed.
const passageRe = /(<tw-passagedata\b[^>]*\bname="Define Misc"[^>]*>)([\s\S]*?)(<\/tw-passagedata>)/;
const match = html.match(passageRe);
if (!match) fail('Could not find the "Define Misc" passage in the compiled HTML.');

let text = match[2];
const patches = [
  { label: '$path  -> ""', re: /(&lt;&lt;set \$path to )&quot;[^&]*&quot;(&gt;&gt;)/g, to: '$1&quot;&quot;$2' },
  { label: '$debug -> false', re: /(&lt;&lt;set \$debug to )true(&gt;&gt;)/g, to: '$1false$2' },
];
for (const p of patches) {
  if (!p.re.test(text)) fail(`Patch "${p.label}" found nothing to replace in "Define Misc". Did the passage change?`);
  p.re.lastIndex = 0;
  text = text.replace(p.re, p.to);
  console.log(`Patched ${p.label}`);
}
html = html.replace(passageRe, (_, open, _body, close) => open + text + close);

// 3. Write to the release folder.
fs.mkdirSync(RELEASE_DIR, { recursive: true });
fs.writeFileSync(output, html, 'utf8');

const kb = Math.round(fs.statSync(output).size / 1024);
console.log(`\nBuilt release ${output} (${kb} KB)`);

if (args.includes('--open')) {
  const [cmd, cmdArgs] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '""', `"${output}"`]]
    : process.platform === 'darwin' ? ['open', [output]] : ['xdg-open', [output]];
  spawn(cmd, cmdArgs, { stdio: 'ignore', detached: true, windowsVerbatimArguments: true }).unref();
  console.log('Opening in your browser...');
}
