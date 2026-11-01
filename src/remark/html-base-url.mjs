import {visit} from 'unist-util-visit';

/**
 * Docusaurus prefixes the site's baseUrl onto Markdown links and images, but not onto the
 * URLs inside raw HTML (`<img src="/img/x.png">`, `<a href="/downloads">`). That is
 * harmless on the production site (baseUrl is "/"), but would break images on a project
 * site such as https://objecthub.github.io/lisppad-docs/. This plugin adds the prefix to
 * root-relative `src`, `href`, `srcset` and `poster` attributes in raw HTML.
 */
export default function htmlBaseUrl({baseUrl = '/'} = {}) {
  const prefix = baseUrl.replace(/\/+$/, '');
  return (tree) => {
    if (!prefix) return;
    visit(tree, 'html', (node) => {
      node.value = node.value.replace(
        /(\s(?:src|href|srcset|poster)=)(["'])\/(?!\/)/g,
        (_, attr, quote) => `${attr}${quote}${prefix}/`
      );
    });
  };
}
