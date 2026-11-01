#!/usr/bin/env node
// Creates a new documentation page and places it in the sidebar.
//
// Usage: npm run new:page -- <folder> <slug> "<Title>" [--after <slug>] [--label "<sidebar label>"] [--description "<text>"]
//   npm run new:page -- libraries/lispkit lispkit-foo "(lispkit foo)" --after lispkit-flow
//
// <folder> is relative to docs/ and is created (as a sidebar category) if it does not exist.
// Without --after the page is appended at the end of the folder. Sidebar positions are
// multiples of 10, so a page can be inserted between two neighbours without touching them;
// if two neighbours are adjacent the folder is renumbered first.

import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join, posix} from 'node:path';
import {DOCS, parseArgs} from './lib/paths.mjs';

const {flags, positional} = parseArgs(process.argv.slice(2), ['after', 'label', 'description']);
const [folder, slug, title] = positional;
if (!folder || !slug || !title || flags.help) {
  console.error('Usage: npm run new:page -- <folder> <slug> "<Title>" [--after <slug>] [--label "<label>"] [--description "<text>"]');
  process.exit(flags.help ? 0 : 1);
}
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error(`Invalid slug "${slug}": use lowercase letters, digits and hyphens (it becomes the page URL).`);
  process.exit(1);
}

const dir = join(DOCS, folder);
const file = join(dir, `${slug}.md`);
if (existsSync(file)) {
  console.error(`${posix.join('docs', folder, `${slug}.md`)} already exists.`);
  process.exit(1);
}

/** Sidebar items of a folder: pages (with a sidebar_position) and sub-folders (position in _category_.json). */
function siblings() {
  const items = [];
  if (!existsSync(dir)) return items;
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    if (entry.isDirectory()) {
      const categoryFile = join(dir, entry.name, '_category_.json');
      const position = existsSync(categoryFile) ? JSON.parse(readFileSync(categoryFile, 'utf8')).position : undefined;
      items.push({key: entry.name, path: categoryFile, position, kind: 'category'});
    } else if (/\.mdx?$/.test(entry.name) && !/^(README|index)\.mdx?$/i.test(entry.name)) {
      const path = join(dir, entry.name);
      const match = readFileSync(path, 'utf8').match(/^sidebar_position:\s*(\d+(?:\.\d+)?)\s*$/m);
      items.push({key: entry.name.replace(/\.mdx?$/, ''), path, position: match ? Number(match[1]) : undefined, kind: 'page'});
    }
  }
  return items.sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || a.key.localeCompare(b.key));
}

function setPosition(item, position) {
  const text = readFileSync(item.path, 'utf8');
  if (item.kind === 'category') {
    const data = JSON.parse(text);
    writeFileSync(item.path, `${JSON.stringify({...data, position}, null, 2)}\n`);
  } else if (/^sidebar_position:/m.test(text)) {
    writeFileSync(item.path, text.replace(/^sidebar_position:.*$/m, `sidebar_position: ${position}`));
  } else if (text.startsWith('---\n')) {
    writeFileSync(item.path, text.replace(/^---\n/, `---\nsidebar_position: ${position}\n`));
  } else {
    writeFileSync(item.path, `---\nsidebar_position: ${position}\n---\n\n${text}`);
  }
  item.position = position;
}

let items = siblings();
let position;
if (flags.after) {
  let index = items.findIndex((i) => i.key === flags.after);
  if (index < 0) {
    console.error(`No page or folder "${flags.after}" in docs/${folder}. Found: ${items.map((i) => i.key).join(', ') || '(nothing)'}`);
    process.exit(1);
  }
  const gap = () => {
    const before = items[index].position ?? (index + 1) * 10;
    const after = items[index + 1]?.position ?? before + 20;
    return {before, after};
  };
  if (gap().after - gap().before < 2 || items.some((i) => i.position === undefined)) {
    items.forEach((item, i) => setPosition(item, (i + 1) * 10)); // renumber the folder
    console.log(`Renumbered the ${items.length} items in docs/${folder} to make room.`);
  }
  const {before, after} = gap();
  position = Math.floor((before + after) / 2);
} else {
  position = (items.reduce((max, i) => Math.max(max, i.position ?? 0), 0) || 0) + 10;
}

if (!existsSync(dir)) {
  mkdirSync(dir, {recursive: true});
  const label = posix.basename(folder).replace(/^./, (c) => c.toUpperCase()).replaceAll('-', ' ');
  const parentItems = (() => {
    const parent = join(DOCS, posix.dirname(folder));
    if (posix.dirname(folder) === '.' || !existsSync(parent)) return [];
    return readdirSync(parent, {withFileTypes: true}).filter((e) => e.isDirectory());
  })();
  writeFileSync(join(dir, '_category_.json'), `${JSON.stringify({label, position: (parentItems.length + 1) * 10, collapsed: true}, null, 2)}\n`);
  console.log(`Created new sidebar category "${label}" (docs/${folder}/_category_.json); adjust label and position as needed.`);
}

const frontMatter = [`sidebar_position: ${position}`];
if (flags.label) frontMatter.push(`sidebar_label: ${JSON.stringify(flags.label)}`);
if (flags.description) frontMatter.push(`description: ${JSON.stringify(flags.description)}`);
writeFileSync(file, `---\n${frontMatter.join('\n')}\n---\n\n# ${title}\n\nWrite the page here.\n`);
console.log(`Created docs/${folder}/${slug}.md (sidebar position ${position}). URL: /${posix.join(folder, slug)}`);
