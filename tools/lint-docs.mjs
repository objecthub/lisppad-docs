#!/usr/bin/env node
// Content checks that the Docusaurus build does not do. Exits with status 1 on errors.
//
//   errors:   leftover GitBook syntax (tags, data-gb attributes, emoji shortcodes such as :rocket:), images that do
//             not exist in static/img, raw-HTML links to .md files, missing page heading, duplicate sidebar
//             positions, unterminated code fences
//   warnings: images that no page uses, very large images, page file names that are not lower-case-hyphenated,
//             pages with <del> (GitBook's mangled "~")
//
// Usage: npm run lint:docs [-- --verbose]   (--verbose also lists pages without a description)

import {existsSync, readFileSync, statSync} from 'node:fs';
import {basename, dirname, join, posix} from 'node:path';
import matter from 'gray-matter';
import {EMOJI_SHORTCODE_RE, firstHeading, listFiles, scanLines} from './lib/markdown.mjs';
import {DOCS, ROOT, STATIC_IMG, parseArgs} from './lib/paths.mjs';

const {flags} = parseArgs(process.argv.slice(2));
const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;
const errors = [];
const warnings = [];
const referenced = new Set();
const positions = new Map(); // folder -> Map(position -> key)

const imageFiles = existsSync(STATIC_IMG) ? listFiles(STATIC_IMG) : [];
const imageSet = new Set(imageFiles);
const pages = listFiles(DOCS, ['.md', '.mdx']);

for (const rel of pages) {
  const raw = readFileSync(join(DOCS, rel), 'utf8');
  const {data, content} = matter(raw);
  const lines = scanLines(content);
  if (lines.unclosed) errors.push(`${rel}: code fence is never closed`);
  const prose = lines.filter((l) => !l.code).map((l) => l.line).join('\n');

  if (!firstHeading(content)) errors.push(`${rel}: no level-1 heading ("# Title")`);
  if (/\{%/.test(prose)) errors.push(`${rel}: GitBook tag left over ({% ... %})`);
  if (prose.includes('.gitbook/')) errors.push(`${rel}: reference to .gitbook/ left over`);
  if (/\sdata-gb-/.test(prose)) errors.push(`${rel}: GitBook-specific HTML left over (data-gb-... attribute)`);
  for (const m of prose.replace(/`[^`\n]*`/g, '').matchAll(EMOJI_SHORTCODE_RE)) {
    errors.push(`${rel}: emoji shortcode ${m[0]} is not rendered; use the emoji itself`);
  }
  if (/<del>/.test(prose)) {
    warnings.push(`${rel}: contains <del> (strikethrough); GitBook turns pairs of "~" into strikethrough, check that this is intended`);
  }
  for (const m of prose.matchAll(/<a\s[^>]*href="([^"]*\.md)(?:#[^"]*)?"/g)) {
    errors.push(`${rel}: raw HTML link to "${m[1]}" is not resolved by Docusaurus; link to the page route (e.g. /examples/lispkit/ocr) or use Markdown link syntax`);
  }
  for (const m of prose.matchAll(/(?:src="|\]\()\/img\/([^"\s)]+)/g)) {
    const name = decodeURIComponent(m[1]);
    referenced.add(name);
    if (!imageSet.has(name)) errors.push(`${rel}: image /img/${name} does not exist in static/img`);
  }
  if (!data.description && flags.verbose) warnings.push(`${rel}: no description in front matter`);

  const base = basename(rel);
  if (!/^[a-z0-9][a-z0-9.-]*\.mdx?$/.test(base) && !/^README\.mdx?$/.test(base)) {
    warnings.push(`${rel}: file name should be lower-case with hyphens (it becomes the page URL)`);
  }
  if (data.sidebar_position !== undefined && !/^(README|index)\.mdx?$/i.test(base)) {
    const folder = posix.dirname(rel);
    if (!positions.has(folder)) positions.set(folder, new Map());
    const taken = positions.get(folder);
    if (taken.has(data.sidebar_position)) {
      errors.push(`${rel}: sidebar_position ${data.sidebar_position} is also used by ${taken.get(data.sidebar_position)}`);
    }
    taken.set(data.sidebar_position, base);
  }
}

// Images used by the site configuration, styles and components also count as referenced.
for (const rel of listFiles(join(ROOT, 'src')).concat(['../docusaurus.config.js'])) {
  const file = rel.startsWith('../') ? join(ROOT, rel.slice(3)) : join(ROOT, 'src', rel);
  if (!existsSync(file)) continue;
  for (const m of readFileSync(file, 'utf8').matchAll(/img\/([A-Za-z0-9._-]+)/g)) referenced.add(m[1]);
}
for (const name of imageFiles) {
  if (!referenced.has(name)) warnings.push(`static/img/${name}: not used by any page`);
  const size = statSync(join(STATIC_IMG, name)).size;
  if (size > MAX_IMAGE_BYTES) warnings.push(`static/img/${name}: ${(size / 1024 / 1024).toFixed(1)} MB (try npm run images:optimize)`);
}

for (const message of warnings) console.log(`warning: ${message}`);
for (const message of errors) console.log(`error:   ${message}`);
console.log(`\nChecked ${pages.length} pages and ${imageFiles.length} images: ${errors.length} errors, ${warnings.length} warnings.`);
process.exit(errors.length ? 1 : 0);
