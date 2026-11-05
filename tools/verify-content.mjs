#!/usr/bin/env node
// Safety net against silently lost content: compares the amount of text in every page's Markdown source with the
// text of the page in build/. A page whose built text is much shorter than its source (e.g. because raw HTML was
// dropped or a broken construct swallowed the rest of the page) is reported. A page that is much longer than its
// source is reported too, except for .mdx pages, whose components add text.
//
// Usage: npm run verify:content [-- --tolerance 0.15]   (run `npm run build` first)

import {existsSync, readFileSync} from 'node:fs';
import {join, posix} from 'node:path';
import matter from 'gray-matter';
import {listFiles, mapOutsideCode} from './lib/markdown.mjs';
import {BUILD, DOCS, parseArgs} from './lib/paths.mjs';

const {flags} = parseArgs(process.argv.slice(2), ['tolerance']);
const TOLERANCE = Number(flags.tolerance ?? 0.15);
const CHROME_WORDS = 12; // breadcrumbs, "Edit this page", pagination links around the article text

if (!existsSync(BUILD)) {
  console.error('There is no build/ folder. Run `npm run build` first.');
  process.exit(1);
}

const words = (text) => (text.match(/[\p{L}\p{N}]+/gu) ?? []).length;
const decode = (text) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&(?:amp|lt|gt|quot|nbsp|apos);/g, ' ');

function sourceWords(markdown) {
  const withoutMarkers = markdown.replace(/^[ \t]*(?::::*\w*|```.*|~~~.*)$/gm, ' '); // admonition and code fence markers
  return words(
    decode(
      mapOutsideCode(withoutMarkers, (text) =>
        text
          .replace(/<\/?[A-Za-z][^<>]*>/g, ' ') // HTML tags (their attributes are not text); code such as `<point>` is untouched
          .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links and images: keep the text only
      )
    )
  );
}

function builtWords(html) {
  const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1];
  if (article === undefined) return null;
  return words(decode(article.replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]*>/g, ' ')));
}

const problems = [];
let checked = 0;
for (const rel of listFiles(DOCS, ['.md', '.mdx'])) {
  const {data, content} = matter(readFileSync(join(DOCS, rel), 'utf8'));
  const route = data.slug ?? `/${rel.replace(/\.mdx?$/, '').replace(/(^|\/)(README|index)$/i, '')}`;
  const file = route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`;
  const path = [join(BUILD, file), join(BUILD, route, 'index.html')].find(existsSync);
  if (!path) {
    problems.push(`${rel}: no built page found for ${route}`);
    continue;
  }
  const built = builtWords(readFileSync(path, 'utf8'));
  if (built === null) {
    problems.push(`${rel}: built page ${route} has no <article>`);
    continue;
  }
  const expected = sourceWords(content) + CHROME_WORDS;
  checked++;
  const ratio = built / expected;
  // An MDX page renders components (e.g. the list of posts on the News page), which add text that is not in
  // the source, so for those only missing text counts.
  const tooMuch = !rel.endsWith('.mdx') && ratio > 1 + TOLERANCE * 2;
  if (Math.abs(built - expected) > 10 && (ratio < 1 - TOLERANCE || tooMuch)) {
    problems.push(`${rel}: ${expected - CHROME_WORDS} words in the source, about ${built - CHROME_WORDS} on the page (${Math.round(ratio * 100)}%)`);
  }
}

for (const problem of problems) console.log(problem);
console.log(`\nCompared ${checked} pages: ${problems.length} with a suspicious difference.`);
process.exit(problems.length ? 1 : 0);
