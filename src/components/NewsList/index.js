import React from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {formatDate} from '@site/src/utils/formatDate';

// One box per news post, newest first: the date above the title, and the whole box links to the post.
// The posts come from src/plugins/news-posts.mjs.
export default function NewsList() {
  const {posts} = usePluginData('news-posts');
  return (
    <div className="news-list">
      {posts.map((post) => {
        const date = formatDate(post.date);
        return (
          <Link key={post.permalink} to={post.permalink} className="news-card">
            {date && (
              <time className="doc-date" dateTime={date.iso}>
                {date.text}
              </time>
            )}
            <span className="news-card__title">{post.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
