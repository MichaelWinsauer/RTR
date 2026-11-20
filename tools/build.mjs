#!/usr/bin/env node
// Compiles dev/ into 'Rise to Ruin.html' in the project root with Tweego, then opens it in the browser.
//
//   node tools/build.mjs [--no-open] [--test]
//
//   --no-open  compile only, do not launch the browser
//   --test     build in SugarCube test mode (debug view / Tweego -t)
//
// Tweego is taken from PATH. If it is somewhere else, set TWEEGO_EXE to its full path.
// Story formats are read from .storyformats/ (the folder holding sugarcube-2-37-3).

import { spawnSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'dev');
const output = path.join(root, 'RiseToRuin.html');
const formats = path.join(root, '.storyformats');

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
if (!tweego) {
  console.error('Tweego not found. Put it on your PATH or set TWEEGO_EXE to the full path of tweego.exe.');
  process.exit(1);
}

const tweegoArgs = ['-o', output, source];
if (args.includes('--test')) tweegoArgs.unshift('-t');

console.log(`${tweego} ${tweegoArgs.join(' ')}`);
const build = spawnSync(tweego, tweegoArgs, {
  stdio: 'inherit',
  env: { ...process.env, TWEEGO_PATH: formats },
});
if (build.status !== 0 || !fs.existsSync(output)) {
  console.error('\nBuild failed.');
  process.exit(build.status || 1);
}

const kb = Math.round(fs.statSync(output).size / 1024);
console.log(`\nBuilt ${path.relative(process.cwd(), output) || output} (${kb} KB)`);

if (!args.includes('--no-open')) {
  // `start` opens the file with the default browser on Windows; open/xdg-open elsewhere
  const [cmd, cmdArgs] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '""', output]]
    : process.platform === 'darwin' ? ['open', [output]] : ['xdg-open', [output]];
  spawn(cmd, cmdArgs, { stdio: 'ignore', detached: true, windowsVerbatimArguments: true }).unref();
  console.log('Opening in your browser...');
}
