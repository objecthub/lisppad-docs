#!/usr/bin/env node
// Makes sure every URL of the old GitBook site still works on the new site.
//
//   npm run check:urls                         compare tools/data/legacy-urls.txt with the routes in build/
//   npm run check:urls -- --live https://www.lisppad.app
//                                              request every legacy URL from a deployed site (use after a deploy / the DNS cutover)
//   npm run check:urls -- --refresh            re-read the legacy URLs from the GitBook sitemap (only possible while GitBook still publishes)
//
// A legacy URL that is gone must be redirected: add {"from": "/old/path", "to": "/new/path"} to redirects.json
// (client-side redirects, since GitHub Pages is static). Redirect pages count as existing routes.

import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {listFiles} from './lib/markdown.mjs';
import {BUILD, ROOT, parseArgs} from './lib/paths.mjs';

const {flags} = parseArgs(process.argv.slice(2), ['live', 'sitemap']);
const LEGACY = join(ROOT, 'tools', 'data', 'legacy-urls.txt');
const GITBOOK_BASE = 'https://objecthub.gitbook.io/lisppad';

if (flags.refresh) {
  const sitemap = flags.sitemap ?? `${GITBOOK_BASE}/sitemap-pages.xml`;
  const xml = await (await fetch(sitemap)).text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/^\/lisppad/, '') || '/');
  if (!paths.length) {
    console.error(`No URLs found in ${sitemap}`);
    process.exit(1);
  }
  writeFileSync(LEGACY, `${[...new Set(paths)].sort().join('\n')}\n`);
  console.log(`Wrote ${paths.length} URLs to tools/data/legacy-urls.txt`);
}

const legacy = readFileSync(LEGACY, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);

if (flags.live) {
  const base = new URL(flags.live);
  let failures = 0;
  const queue = [...legacy];
  await Promise.all(
    Array.from({length: 8}, async () => {
      while (queue.length) {
        const path = queue.shift();
        try {
          // Keep a base path such as /lisppad-docs/ (staging): new URL('/x', base) would discard it.
          const response = await fetch(new URL(base.pathname.replace(/\/+$/, '') + path, base), {redirect: 'follow'});
          const finalUrl = new URL(response.url);
          if (!response.ok || finalUrl.host !== base.host) {
            failures++;
            console.log(`FAIL ${path}: ${response.status}${finalUrl.host !== base.host ? ` (ended up at ${response.url})` : ''}`);
          }
        } catch (error) {
          failures++;
          console.log(`FAIL ${path}: ${error.message}`);
        }
      }
    })
  );
  console.log(`${legacy.length - failures} of ${legacy.length} legacy URLs are served by ${base.origin}.`);
  process.exit(failures ? 1 : 0);
}

if (!existsSync(BUILD)) {
  console.error('There is no build/ folder. Run `npm run build` first.');
  process.exit(1);
}
const routes = new Set();
for (const file of listFiles(BUILD, ['.html'])) {
  if (file === '404.html') continue;
  routes.add(`/${file.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '')}`.replace(/^\/\//, '/'));
}
routes.add('/'); // build/index.html

const missing = legacy.filter((path) => !routes.has(path));
const extra = [...routes].filter((route) => !legacy.includes(route));
for (const path of missing) console.log(`MISSING ${path}`);
console.log(`${legacy.length - missing.length} of ${legacy.length} legacy URLs exist on the new site; ${extra.length} new URLs (e.g. ${extra.slice(0, 3).join(', ') || 'none'}).`);
if (missing.length) console.log('Add redirects for the missing URLs to redirects.json: [{"from": "/old", "to": "/new"}]');
process.exit(missing.length ? 1 : 0);
