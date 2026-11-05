import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {formatDate} from '@site/src/utils/formatDate';

// The pages of a docs folder as boxes: the title, with the date above it if the page has a `date`; the
// whole box links to the page. `folder` is relative to docs/ and has to be listed in the `folders` option
// of the plugin in src/plugins/folder-pages.mjs. `columns` sets the boxes in two columns on wide screens.
// The styles are the `box-list` ones in custom.css.
export default function PageList({folder, columns = false}) {
  const {lists} = usePluginData('folder-pages');
  const pages = lists[folder];
  if (!pages) {
    throw new Error(`<PageList folder="${folder}">: add "${folder}" to the folders of the folder-pages plugin in docusaurus.config.js`);
  }
  return (
    <div className={clsx('box-list', columns && 'box-list--columns')}>
      <ul>
        {pages.map((page) => {
          const date = formatDate(page.date);
          return (
            <li key={page.permalink}>
              <Link to={page.permalink}>
                {date && (
                  <time className="doc-date" dateTime={date.iso}>
                    {date.text}
                  </time>
                )}
                {page.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
