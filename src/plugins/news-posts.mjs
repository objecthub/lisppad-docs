// Collects the posts in docs/news (title, link, date) and hands them to the <NewsList> component on the
// News page as global data: usePluginData('news-posts').posts, newest first. The titles and links come from
// the docs plugin, so they are the ones of the pages themselves; the date is the front matter `date`.

import {basename} from 'node:path';

const FOLDER = 'news';

/** The front matter `date` (a Date, as YAML parses `2025-12-22`, or a string) as 'YYYY-MM-DD', or null. */
function isoDate(value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString().slice(0, 10) : null;
}

export default function newsPostsPlugin() {
  return {
    name: 'news-posts',

    async allContentLoaded({allContent, actions}) {
      const docs = allContent['docusaurus-plugin-content-docs']?.default?.loadedVersions?.[0]?.docs ?? [];
      const posts = docs
        .filter((doc) => doc.sourceDirName === FOLDER && !doc.unlisted)
        .filter((doc) => !/^(README|index)\.mdx?$/i.test(basename(doc.source))) // the News page itself
        .map((doc) => ({
          title: doc.title,
          permalink: doc.permalink,
          date: isoDate(doc.frontMatter.date),
          position: doc.sidebarPosition ?? 0,
        }))
        // Newest first; posts of the same day keep their order in the sidebar, posts without a date come last.
        .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.position - b.position)
        .map(({title, permalink, date}) => ({title, permalink, date}));
      actions.setGlobalData({posts});
    },
  };
}
