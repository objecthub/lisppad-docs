// Collects the pages of some docs folders (title, link, date) and hands them to the <PageList> component as
// global data: usePluginData('folder-pages').lists[folder], an array of {title, permalink, date}.
// The titles and links come from the docs plugin, so they are the ones of the pages themselves; `date` is the
// front matter `date` (null if there is none). Used for the posts on the News page and for the libraries on
// the LispKit and LispPad pages.
//
// Usage in docusaurus.config.js: [folderPages, {folders: ['news', 'libraries/lispkit']}]
//
// Order: newest first; pages of the same day, and pages without a date, keep their order in the sidebar
// (so a folder without dates is listed as in the sidebar). Pages without a date come after those with one.

import {basename} from 'node:path';

/** The front matter `date` (a Date, as YAML parses `2025-12-22`, or a string) as 'YYYY-MM-DD', or null. */
function isoDate(value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString().slice(0, 10) : null;
}

export default function folderPagesPlugin(context, {folders = []} = {}) {
  return {
    name: 'folder-pages',

    async allContentLoaded({allContent, actions}) {
      const docs = allContent['docusaurus-plugin-content-docs']?.default?.loadedVersions?.[0]?.docs ?? [];
      const lists = {};
      for (const folder of folders) {
        lists[folder] = docs
          .filter((doc) => doc.sourceDirName === folder && !doc.unlisted)
          .filter((doc) => !/^(README|index)\.mdx?$/i.test(basename(doc.source))) // the folder's own page
          .map((doc) => ({
            title: doc.title,
            permalink: doc.permalink,
            date: isoDate(doc.frontMatter.date),
            position: doc.sidebarPosition ?? 0,
          }))
          .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.position - b.position)
          .map(({title, permalink, date}) => ({title, permalink, date}));
      }
      actions.setGlobalData({lists});
    },
  };
}
