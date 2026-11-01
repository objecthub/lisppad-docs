#!/usr/bin/env node
// Shrinks oversized screenshots in static/img (the GitBook export has 18 MB of images).
// Dry run by default: it only reports what it would save.
//
// Usage: npm run images:optimize [-- --write] [--max-width 2000] [--min-saving 0.1]
//   --write       replace the files (use git to review/revert)
//   --max-width   downscale wider images to this width in pixels (default 2000)
//   --min-saving  skip a file unless it gets at least this fraction smaller (default 0.1)

import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import sharp from 'sharp';
import {listFiles} from './lib/markdown.mjs';
import {STATIC_IMG, parseArgs} from './lib/paths.mjs';

const {flags} = parseArgs(process.argv.slice(2), ['max-width', 'min-saving']);
const MAX_WIDTH = Number(flags['max-width'] ?? 2000);
const MIN_SAVING = Number(flags['min-saving'] ?? 0.1);
const SKIP_BELOW_BYTES = 40 * 1024; // icons and small images are not worth touching

let before = 0;
let after = 0;
let changed = 0;
for (const name of listFiles(STATIC_IMG, ['.png', '.jpg', '.jpeg'])) {
  const path = join(STATIC_IMG, name);
  const original = readFileSync(path);
  before += original.length;
  if (original.length < SKIP_BELOW_BYTES) {
    after += original.length;
    continue;
  }
  const image = sharp(original, {animated: false}).rotate();
  const {width = 0} = await image.metadata();
  const resized = width > MAX_WIDTH ? image.resize({width: MAX_WIDTH}) : image;
  const output = /\.png$/i.test(name)
    ? await resized.png({compressionLevel: 9, adaptiveFiltering: true, effort: 10}).toBuffer()
    : await resized.jpeg({quality: 85, mozjpeg: true}).toBuffer();
  if (output.length <= original.length * (1 - MIN_SAVING)) {
    changed++;
    after += output.length;
    console.log(`${name}: ${(original.length / 1024).toFixed(0)} KB -> ${(output.length / 1024).toFixed(0)} KB${width > MAX_WIDTH ? ` (resized from ${width}px)` : ''}`);
    if (flags.write) writeFileSync(path, output);
  } else {
    after += original.length;
  }
}
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(`\n${changed} files ${flags.write ? 'optimized' : 'could be optimized (dry run, use --write)'}: ${mb(before)} MB -> ${mb(after)} MB`);
