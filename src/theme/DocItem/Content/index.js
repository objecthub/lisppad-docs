import React from 'react';
import OriginalContent from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {formatDate} from '@site/src/utils/formatDate';

// The front matter `date` (e.g. `date: 2025-12-22`) is shown above the page title.
export default function DocItemContent(props) {
  const {frontMatter} = useDoc();
  const date = formatDate(frontMatter.date);
  if (!date) {
    return <OriginalContent {...props} />;
  }
  return (
    <>
      {/* Outside the `.markdown` block, so the page title stays its first child (and keeps its style). */}
      <time className="doc-date" dateTime={date.iso}>
        {date.text}
      </time>
      <OriginalContent {...props} />
    </>
  );
}
