#!/usr/bin/env node
// Converts a GitBook export (Git Sync repository) into this Docusaurus project:
//   <src>/**/*.md           -> docs/**/*.md   (GitBook syntax converted, README.md of the root -> index.md)
//   <src>/SUMMARY.md        -> sidebar_position / sidebar_label front matter and _category_.json files
//   <src>/.gitbook/assets/* -> static/img/*   (flat, sanitized names, duplicates merged)
//
// Usage: npm run migrate -- [--src <dir>] [--dry-run] [--force] [--report <file>]
//   --dry-run   show what would happen, write nothing
//   --force     overwrite pages that already exist in docs/ (by default they are left alone,
//               so hand edits survive a re-run)
// The conversion rules are documented in README.md ("Migrating from GitBook").

import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, posix, relative, resolve} from 'node:path';
import matter from 'gray-matter';
import {firstHeading, listFiles, mapOutsideCode, scanLines} from './lib/markdown.mjs';
import {DOCS, ROOT, STATIC_IMG, parseArgs} from './lib/paths.mjs';

const {flags} = parseArgs(process.argv.slice(2), ['src', 'report']);
const SRC = resolve(flags.src ?? join(ROOT, '..', 'Docosaurus', 'lisppad-site-gitbook'));
const DRY = Boolean(flags['dry-run']);
const FORCE = Boolean(flags.force);
const REPORT = resolve(flags.report ?? join(ROOT, 'migration-report.md'));

const HINT_TYPES = {info: 'info', success: 'tip', warning: 'warning', danger: 'danger'};
const KIND_ALT = {
  proc: 'procedure',
  syntax: 'syntax',
  const: 'constant',
  obj: 'object',
  pred: 'predicate',
  param: 'parameter',
  generic: 'generic procedure',
};

const stats = {pages: 0, written: 0, skipped: 0, hints: 0, contentRefs: 0, icons: 0, assetRefs: 0, galleries: 0, htmlLinks: 0};
const issues = [];
const labelOverrides = [];
const issue = (file, message) => issues.push(`${file}: ${message}`);

if (!existsSync(join(SRC, 'SUMMARY.md'))) {
  console.error(`Not a GitBook export (no SUMMARY.md in ${SRC}). Use --src <dir>.`);
  process.exit(1);
}

// ---------------------------------------------------------------- SUMMARY.md

/** @returns {{title: string, path: string, section: string|null}[]} */
function parseSummary() {
  const entries = [];
  let section = null;
  for (const line of readFileSync(join(SRC, 'SUMMARY.md'), 'utf8').split('\n')) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      section = heading[1];
      continue;
    }
    const item = line.match(/^\s*[*-]\s+\[(.*)\]\(([^)]*)\)\s*$/);
    if (item) entries.push({title: item[1], path: decodeURI(item[2]), section});
  }
  return entries;
}

const summary = parseSummary();
const entryByPath = new Map(summary.map((e) => [e.path, e]));

// Sidebar order: for every folder, children in order of first appearance in SUMMARY.md.
const order = new Map(); // folder ('' = root) -> [child key]
const register = (folder, key) => {
  if (!order.has(folder)) order.set(folder, []);
  if (!order.get(folder).includes(key)) order.get(folder).push(key);
};
for (const {path} of summary) {
  const segments = path.split('/');
  const file = segments.pop();
  segments.forEach((segment, i) => register(segments.slice(0, i).join('/'), segment));
  if (file === 'README.md') {
    if (segments.length === 0) register('', 'index.md');
  } else {
    register(segments.join('/'), file);
  }
}
const positionOf = (folder, key) => {
  const i = order.get(folder)?.indexOf(key) ?? -1;
  return i < 0 ? undefined : (i + 1) * 10;
};

// ---------------------------------------------------------------- assets

const assetDir = join(SRC, '.gitbook', 'assets');
const assetFiles = existsSync(assetDir) ? listFiles(assetDir) : [];
const md5 = (file) => createHash('md5').update(readFileSync(join(assetDir, file))).digest('hex');
const sanitize = (name) => name.normalize('NFC').replace(/\s*\((\d+)\)(?=\.[^.]+$)/, '-$1').replace(/[^A-Za-z0-9._/-]+/g, '-');

/** original asset name -> name in static/img (duplicates map to one canonical file) */
const assetMap = new Map();
const mergedDuplicates = [];
{
  const byHash = new Map();
  for (const file of assetFiles) {
    const hash = md5(file);
    if (!byHash.has(hash)) byHash.set(hash, []);
    byHash.get(hash).push(file);
  }
  const taken = new Set();
  for (const group of byHash.values()) {
    group.sort((a, b) => sanitize(a).length - sanitize(b).length || a.localeCompare(b));
    let canonical = sanitize(group[0]);
    for (let n = 2; taken.has(canonical); n++) canonical = canonical.replace(/(\.[^.]+)$/, `-${n}$1`);
    taken.add(canonical);
    for (const file of group) assetMap.set(file, canonical);
    if (group.length > 1) mergedDuplicates.push(`${group.join(', ')} -> ${canonical}`);
  }
}
const assetVariants = new Map(); // spelling used in a link -> original name
for (const name of assetMap.keys()) {
  for (const variant of new Set([name, name.replaceAll(' ', '%20'), encodeURI(name), encodeURIComponent(name)])) {
    assetVariants.set(variant, name);
  }
}
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const ASSET_RE = new RegExp(
  `(?:\\.\\./|\\./)*\\.gitbook/assets/(${[...assetVariants.keys()].sort((a, b) => b.length - a.length).map(escapeRegExp).join('|')})`,
  'g'
);
const usedAssets = new Set();

// ---------------------------------------------------------------- page conversion

const h1Cache = new Map();
function titleOf(rel) {
  if (!h1Cache.has(rel)) {
    const file = join(SRC, rel);
    h1Cache.set(rel, existsSync(file) ? firstHeading(matter(readFileSync(file, 'utf8')).content) : null);
  }
  return h1Cache.get(rel);
}

/** Converts GitBook's {% hint %} and {% content-ref %} blocks (line oriented, code-aware). */
function convertLiquid(text, rel) {
  const out = [];
  let ref = null;
  let lastRef = -1;
  for (const {line, code} of scanLines(text)) {
    if (code) {
      out.push(line);
      continue;
    }
    let m;
    if (ref) {
      if (/\{%\s*endcontent-ref\s*%\}/.test(line)) {
        if (ref.startsWith('/broken/')) {
          issue(rel, `dropped content-ref to a deleted GitBook page (${ref})`);
        } else {
          const url = ref.endsWith('/') ? `${ref}README.md` : ref; // folder links point at the folder's README
          const target = posix.normalize(posix.join(posix.dirname(rel), url));
          const title = titleOf(target) ?? url;
          if (!titleOf(target)) issue(rel, `content-ref target "${url}" has no heading`);
          if (lastRef === out.length - 2 && out[out.length - 1] === '') out.pop(); // keep the list tight
          out.push(`* [${title}](${url})`);
          lastRef = out.length - 1;
          stats.contentRefs++;
        }
        ref = null;
      }
    } else if ((m = line.match(/^\s*\{%\s*content-ref\s+url="([^"]+)"\s*%\}\s*$/))) {
      ref = m[1];
    } else if ((m = line.match(/^\s*\{%\s*hint\s+style="(\w+)"\s*%\}\s*$/))) {
      out.push(`:::${HINT_TYPES[m[1]] ?? 'note'}`, '');
      stats.hints++;
    } else if (/^\s*\{%\s*endhint\s*%\}\s*$/.test(line)) {
      if (out[out.length - 1] !== '') out.push('');
      out.push(':::');
    } else {
      out.push(line);
    }
  }
  return out.join('\n');
}

/** Rewrites asset links and normalizes the HTML GitBook generates. */
function convertText(text, rel) {
  let result = text.replace(ASSET_RE, (_, spelling) => {
    const name = assetMap.get(assetVariants.get(spelling));
    usedAssets.add(name);
    stats.assetRefs++;
    return `/img/${name}`;
  });
  // Inline kind icons (procedure, syntax, ...): <img ... data-size="line"> -> <img class="kind" alt="...">
  result = result.replace(
    /<img src="(\/img\/(proc|syntax|const|obj|pred|param|generic)\.png)" alt="" data-size="line">/g,
    (_, src, kind) => {
      stats.icons++;
      return `<img class="kind" src="${src}" alt="${KIND_ALT[kind]}">`;
    }
  );
  result = result.replace(/\s+data-size="(?:line|original)"/g, '');
  // Docusaurus resolves `.md` links in Markdown, but not in raw HTML (<a href="x.md">): use the route.
  result = result.replace(/(<a\s[^>]*?href=")([^":#]+?\.md)(#[^"]*)?"/g, (_, head, href, fragment = '') => {
    const target = posix.normalize(posix.join(posix.dirname(rel), href));
    stats.htmlLinks++;
    return `${head}/${target.replace(/\.md$/, '').replace(/\/?README$/, '')}${fragment}"`;
  });
  result = result.replace(/<div>(\s*<figure>)/g, (_, rest) => {
    stats.galleries++;
    return `<div class="gallery">${rest}`;
  });
  if (result.includes('.gitbook/')) issue(rel, 'unresolved reference to .gitbook/');
  return result;
}

function convertPage(rel, source) {
  const parsed = matter(source);
  let body = convertLiquid(parsed.content, rel);
  body = mapOutsideCode(body, (text) => convertText(text, rel));
  for (const {line, code} of scanLines(body)) {
    if (!code && line.includes('{%')) issue(rel, `leftover liquid tag: ${line.trim()}`);
  }

  const folder = posix.dirname(rel) === '.' ? '' : posix.dirname(rel);
  const file = posix.basename(rel);
  const entry = entryByPath.get(rel);
  const h1 = firstHeading(body);
  const data = {};
  if (rel === 'README.md') data.slug = '/';
  if (file !== 'README.md' || rel === 'README.md') {
    const position = positionOf(folder, rel === 'README.md' ? 'index.md' : file);
    if (position) data.sidebar_position = position;
  }
  if (entry && h1 && entry.title !== h1 && file !== 'README.md') {
    data.sidebar_label = entry.title;
    labelOverrides.push(`${rel}: sidebar "${entry.title}" vs heading "${h1}"`);
  }
  if (!entry) issue(rel, 'not listed in SUMMARY.md (no sidebar position)');
  if (parsed.data.description) data.description = String(parsed.data.description).trim();
  const frontMatter = Object.keys(data).length ? `${matter.stringify('', data).trimEnd()}\n\n` : '';
  return frontMatter + body.replace(/^\n+/, '');
}

// ---------------------------------------------------------------- output

function write(path, content) {
  if (existsSync(path) && !FORCE) {
    stats.skipped++;
    return;
  }
  stats.written++;
  if (DRY) return;
  mkdirSync(dirname(path), {recursive: true});
  writeFileSync(path, content);
}

const pages = listFiles(SRC, ['.md']).filter((f) => f !== 'SUMMARY.md' && !f.startsWith('.gitbook/'));
const folders = new Set();
for (const rel of pages) {
  stats.pages++;
  const dest = rel === 'README.md' ? 'index.md' : rel;
  write(join(DOCS, dest), convertPage(rel, readFileSync(join(SRC, rel), 'utf8')));
  for (let dir = posix.dirname(dest); dir !== '.'; dir = posix.dirname(dir)) folders.add(dir);
}

// _category_.json for every folder: label, order, collapsed.
for (const folder of [...folders].sort()) {
  const parent = posix.dirname(folder) === '.' ? '' : posix.dirname(folder);
  const readme = entryByPath.get(`${folder}/README.md`);
  const firstEntry = summary.find((e) => e.path.startsWith(`${folder}/`));
  const heading = firstEntry?.section;
  const fallback = folder.split('/').pop().replace(/^./, (c) => c.toUpperCase());
  const label = readme?.title ?? (heading && heading.toLowerCase() === folder.toLowerCase() ? heading : fallback);
  const category = {label, position: positionOf(parent, posix.basename(folder)), collapsed: true};
  write(join(DOCS, folder, '_category_.json'), `${JSON.stringify(category, null, 2)}\n`);
}

// Images.
const unreferenced = [];
mkdirSync(STATIC_IMG, {recursive: true});
for (const [original, name] of new Map([...assetMap].reverse())) {
  if (!usedAssets.has(name)) {
    unreferenced.push(original);
    continue;
  }
  const dest = join(STATIC_IMG, name);
  if (!DRY && !existsSync(dest)) {
    mkdirSync(dirname(dest), {recursive: true});
    copyFileSync(join(assetDir, original), dest);
  }
}

// ---------------------------------------------------------------- report

const report = [
  '# Migration report',
  '',
  `Source: \`${relative(ROOT, SRC)}\``,
  '',
  `- Pages: ${stats.pages} (${stats.written} written, ${stats.skipped} left alone because they already exist; use --force to overwrite)`,
  `- Converted: ${stats.hints} hints, ${stats.contentRefs} content-refs, ${stats.icons} kind icons, ${stats.galleries} galleries, ${stats.htmlLinks} HTML page links, ${stats.assetRefs} asset references`,
  `- Images: ${usedAssets.size} copied to static/img, ${unreferenced.length} unreferenced and skipped`,
  '',
  '## Problems',
  '',
  ...(issues.length ? issues.map((i) => `- ${i}`) : ['None.']),
  '',
  '## Merged duplicate images',
  '',
  ...(mergedDuplicates.length ? mergedDuplicates.map((i) => `- ${i}`) : ['None.']),
  '',
  '## Unreferenced images (not copied)',
  '',
  ...(unreferenced.length ? unreferenced.map((i) => `- ${i}`) : ['None.']),
  '',
  '## Sidebar labels that differ from the page heading',
  '',
  ...(labelOverrides.length ? labelOverrides.map((i) => `- ${i}`) : ['None.']),
  '',
].join('\n');
if (!DRY) writeFileSync(REPORT, report);
console.log(report);
console.log(DRY ? '(dry run: nothing was written)' : `Report written to ${REPORT}`);
