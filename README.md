# LispPad documentation

Source of the LispPad and LispPad Go documentation website (<https://www.lisppad.app>), built with
[Docusaurus](https://docusaurus.io/) and published with GitHub Pages. The pages are plain Markdown files in
[`docs/`](docs); this repository replaces the former GitBook site (see [MIGRATION.md](MIGRATION.md)).

## Quick start

Requires Node.js 20 or later.

```bash
npm install     # once
npm start       # live preview at http://localhost:3000 (reloads when you save a file)
```

Publishing: commit and push to `main`. The GitHub workflow [`deploy.yml`](.github/workflows/deploy.yml) runs the checks,
builds the site and deploys it to GitHub Pages (about two minutes). Pull requests are built and checked by
[`check.yml`](.github/workflows/check.yml) without being deployed.

## Writing documentation

The folder structure of `docs/` is the structure of the site: `docs/libraries/lispkit/lispkit-box.md` is the page
`/libraries/lispkit/lispkit-box`. A folder's `README.md` is the landing page of that folder's sidebar section.

```markdown
---
sidebar_position: 60            # order in the sidebar (multiples of 10, so pages can be inserted between)
sidebar_label: (lispkit box)    # optional: sidebar text if it should differ from the heading
description: One-line summary   # optional: used for search engines and link previews
---

# (lispkit box)

Text, with `inline code`, [links to other pages](../lispkit/lispkit-list.md) and [external links](https://r7rs.org).
```

* **New page:** `npm run new:page -- libraries/lispkit lispkit-flow "(lispkit flow)" --after lispkit-box`
  creates the file, picks the sidebar position and prints the URL. Without `--after` the page goes to the end.
* **New section:** `npm run new:page` with a folder that does not exist yet also creates `docs/<folder>/_category_.json`
  (sidebar label and position, edit it as needed).
* **Links between pages** use relative file paths ending in `.md` (checked by the build; a broken link fails it).
* **Code:** fenced blocks with a language get syntax highlighting. `scheme`, `applescript`, `ebnf` and `markdown` are
  enabled; other languages can be added under `prism.additionalLanguages` in `docusaurus.config.js`.
* **Images:** put the file into `static/img/` and reference it as `![alt text](/img/name.png)`. Use descriptive,
  lower-case file names. `npm run images:optimize` lists oversized screenshots.
* **Figures and screenshot galleries** use HTML, which works in `.md` files:

  ```html
  <figure><img src="/img/Session.png" alt="The session window"><figcaption><p>A LispPad session</p></figcaption></figure>

  <div class="gallery"><figure>…</figure> <figure>…</figure></div>
  ```
* **Library signatures** carry a kind icon (`proc`, `syntax`, `const`, `obj`, `pred`, `param`, `generic`):

  ```html
  **(box? _obj_)** <img class="kind" src="/img/proc.png" alt="procedure">
  ```
* **Notes:** `:::info`, `:::tip`, `:::warning`, `:::danger` … `:::` ([admonitions](https://docusaurus.io/docs/markdown-features/admonitions)).
* **Collapsible sections:** `<details><summary>Title</summary> … </details>` with blank lines around the content.
* **Diagrams:** a fenced block with the language `mermaid` ([Mermaid](https://mermaid.js.org/)).
* **Plain Markdown on purpose:** `.md` files are parsed as CommonMark, so `<`, `{` and `}` in Scheme text need no
  escaping. Only a file with the extension `.mdx` is parsed as MDX and may use React components.

## Tools

| Command | What it does |
|---|---|
| `npm start` / `npm run build` / `npm run serve` | Live preview / production build into `build/` / serve the build locally |
| `npm run new:page -- <folder> <slug> "<Title>" [--after <slug>]` | Create a page and put it into the sidebar |
| `npm run lint:docs` | Content checks: leftover GitBook syntax, missing images, duplicate sidebar positions, unused or huge images |
| `npm run check:urls` | Every URL of the old GitBook site (`tools/data/legacy-urls.txt`) must still exist; `-- --live https://www.lisppad.app` checks a deployed site |
| `npm run verify:content` | Compares the text of every source page with the built page and reports pages that lost content |
| `npm run images:optimize` | Reports (`-- --write` applies) smaller versions of oversized screenshots |
| `npm run check` | Everything above in one go: lint, build, URL parity, content verification (this is what CI runs) |
| `npm run migrate` | The one-time GitBook converter, see below |

Renamed or deleted pages: add `{"from": "/old/path", "to": "/new/path"}` to [`redirects.json`](redirects.json), so old
links keep working (the site is static, so these are client-side redirects).

## Where is the site published?

Production is `https://www.lisppad.app`. `docusaurus.config.js` takes the address from the environment variables
`SITE_URL` and `BASE_URL` (default `https://www.lisppad.app` and `/`). In GitHub Actions they come from the repository
variables of the same names, which makes it possible to deploy a staging copy to `https://objecthub.github.io/lisppad-docs/`
before the custom domain points here. Raw-HTML `src` and `href` attributes starting with `/` get the base URL prefixed
automatically (`src/remark/html-base-url.mjs`).

## Migrating from GitBook (`npm run migrate`)

`npm run migrate -- [--src <GitBook repo>] [--dry-run] [--force]` converts a GitBook Git Sync repository. It is
code-block-aware and, by default, does not overwrite pages that already exist (so hand edits survive; `--force` overwrites).
It writes a summary to `migration-report.md`.

| GitBook | Docusaurus |
|---|---|
| `SUMMARY.md` | `sidebar_position` and `sidebar_label` in every page, `_category_.json` per folder |
| `{% hint style="info" %}` … `{% endhint %}` | `:::info` … `:::` (`success` becomes `tip`) |
| `{% content-ref url="x.md" %}` | A link list using the heading of the target page; links to deleted pages are dropped and reported |
| `<img … data-size="line">` icons | `<img class="kind" alt="procedure" …>` |
| `<div><figure>` galleries | `<div class="gallery"><figure>` |
| `../.gitbook/assets/NAME` | `/img/NAME` in `static/img/` (names sanitized, identical files merged) |
| `<a href="x.md">` in raw HTML | the page route, because Docusaurus only resolves `.md` links written in Markdown |
| front matter `layout`, `coverY` | dropped (`description` is kept) |
