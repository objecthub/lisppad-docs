# GitBook to Docusaurus migration

This file records what was migrated, what was fixed on the way, and how to switch `www.lisppad.app` from GitBook to
GitHub Pages.

## Decisions

| Topic | Decision |
|---|---|
| Hosting | GitHub Pages, deployed by GitHub Actions ([`deploy.yml`](.github/workflows/deploy.yml)) |
| Repository | `objecthub/lisppad-docs` (new). The old `objecthub/lisppad-site` (GitBook Git Sync, branch `gitbook`) stays untouched |
| Domain | `www.lisppad.app`, switched over after staging on `https://objecthub.github.io/lisppad-docs/` |
| Source of truth | The Markdown in this repository. It is no longer derived from `lisppad-reference` |
| Search | Local, offline search ([`@easyops-cn/docusaurus-search-local`](https://github.com/easyops-cn/docusaurus-search-local)) |
| URLs | Identical to GitBook (checked by `npm run check:urls` against the 128 URLs in `tools/data/legacy-urls.txt`) |
| Markdown flavour | `.md` is CommonMark (no JSX), `.mdx` would be MDX; see [README.md](README.md) |

## What was converted

128 pages and 75 images (duplicates merged, 18 MB). Conversion rules: [README.md](README.md#migrating-from-gitbook-npm-run-migrate).
Details of the run: `migration-report.md`.

Fixes made by hand to the migrated pages, because the GitBook export itself was faulty:

* `libraries/lispkit/lispkit-list-set.md`: the SRFI 1 link was mangled by GitBook; it now points to
  `https://srfi.schemers.org/srfi-1/srfi-1.html`.
* `libraries/lispkit/lispkit-thread-future.md`: the heading read `(lispkit-thread-future)`; now `(lispkit thread future)`.
* `libraries/lispkit/lispkit-core.md`: the link to `#loading-source-files` pointed at a heading that is called "Source files".
* `libraries/lispkit/lispkit-markdown.md`: a link to `#lispkit-draw` (an anchor that does not exist) now links to the page `lispkit-draw.md`.

## Known problems that were already on the GitBook site

* `libraries/lispkit/lispkit-format.md`: two rows of the directive table (`~^` "up and out" and "unpack") contain
  broken markup from the GitBook export; the build prints HTML warnings for this page. The correct text is in
  `lisppad-reference/libraries/lispkit-format.md`.
* `libraries/lispkit/README.md` had three links to deleted GitBook pages (dropped), and its list of libraries does not
  mention all libraries (the sidebar does).
* Two images are not used by any page and were not copied: `value.png`, `ocr-illustrated.jpg`.

## Cutover to www.lisppad.app

Current DNS (Google/Squarespace Domains): `lisppad.app` is a Squarespace 301 redirect to `https://www.lisppad.app`,
and `www.lisppad.app` is a CNAME to `19d9fa4286-hosting.gitbook.io` (GitBook). Only the `www` record changes.

1. **Beforehand** (24 to 48 hours): lower the TTL of the `www` CNAME to 300 seconds.
2. **Verify the domain** (GitHub profile settings > Pages > Add a domain > `lisppad.app`; add the TXT record GitHub
   shows). This stops anybody else from claiming the domain for another repository.
3. **Check staging**: <https://objecthub.github.io/lisppad-docs/> is complete; `npm run check` passes.
4. **Switch the build to the production address**: delete the repository variables `SITE_URL` and `BASE_URL`
   (Settings > Secrets and variables > Actions > Variables) so the defaults `https://www.lisppad.app` and `/` apply,
   and re-run the deploy workflow.
5. **Set the custom domain** in Settings > Pages to `www.lisppad.app`. (A `CNAME` file is not needed with Actions
   deployments.)
6. **Change DNS**: replace the CNAME of `www` with `objecthub.github.io.`. Do not touch the other records.
7. **Wait** for GitHub to issue the certificate (minutes to an hour), then tick *Enforce HTTPS* in Settings > Pages.
8. **Verify**: `npm run check:urls -- --live https://www.lisppad.app` (all 128 legacy URLs), the apps' links
   (e.g. `https://www.lisppad.app/libraries/lispkit`) and `https://lisppad.app` (redirects to www).
9. **Retire GitBook**: disable Git Sync for the space, remove the custom domain from the space, unpublish or delete it
   when you are comfortable. The GitBook repository can be archived.

**Rollback** (any time before step 9): set the `www` CNAME back to `19d9fa4286-hosting.gitbook.io.`, and GitBook
serves lisppad.app again within the TTL.

## After the cutover

* Pull requests are built and checked by [`check.yml`](.github/workflows/check.yml); `main` is deployed automatically.
* `tools/data/legacy-urls.txt` stays as the list of URLs that must never break. Deliberately removed pages go into
  `redirects.json`.
