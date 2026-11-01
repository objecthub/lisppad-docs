#!/usr/bin/env node
// Derives the site's icon files from one master image (a square PNG with transparent corners).
//
// Usage: npm run icons -- <master.png>
//   static/img/icon.png             copy of the master (social preview image)
//   static/img/logo.png             128 px, navbar logo
//   static/img/favicon.png          64 px, browser tab icon
//   static/img/apple-touch-icon.png 180 px on a solid background (iOS fills transparent corners with black)

import {mkdirSync} from 'node:fs';
import {join, resolve} from 'node:path';
import sharp from 'sharp';
import {STATIC_IMG, parseArgs} from './lib/paths.mjs';

const {flags, positional} = parseArgs(process.argv.slice(2), ['background']);
if (!positional[0] || flags.help) {
  console.error('Usage: npm run icons -- <master.png> [--background "#e1c96c"]');
  process.exit(flags.help ? 0 : 1);
}
const master = resolve(positional[0]);
const background = flags.background ?? '#e1c96c'; // the yellow of the LispPad icon

const {width = 0, height = 0} = await sharp(master).metadata();
if (width !== height || width < 180) {
  console.error(`${master} must be square and at least 180 px wide (it is ${width}x${height}).`);
  process.exit(1);
}

mkdirSync(STATIC_IMG, {recursive: true});
const png = {compressionLevel: 9, effort: 10};
const outputs = [
  ['icon.png', sharp(master).png(png)],
  ['logo.png', sharp(master).resize(128, 128).png(png)],
  ['favicon.png', sharp(master).resize(64, 64).png(png)],
  ['apple-touch-icon.png', sharp(master).resize(180, 180).flatten({background}).png(png)],
];
for (const [name, image] of outputs) {
  const info = await image.toFile(join(STATIC_IMG, name));
  console.log(`static/img/${name}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
}
