// @ts-check
import {existsSync, readFileSync} from 'node:fs';
import {themes as prismThemes} from 'prism-react-renderer';
import htmlBaseUrl from './src/remark/html-base-url.mjs';
import newsPosts from './src/plugins/news-posts.mjs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Where the site is served from. The defaults are the production values; the
// GitHub workflows override them (repository variables SITE_URL and BASE_URL),
// e.g. for the staging site at https://objecthub.github.io/lisppad-docs/.
const siteUrl = process.env.SITE_URL || 'https://www.lisppad.app';
const baseUrl = process.env.BASE_URL || '/';

// Renamed or removed pages whose old URLs must keep working: [{"from": "/old", "to": "/new"}].
// `npm run check:urls` reports legacy URLs that no longer exist.
function loadRedirects() {
  const file = new URL('./redirects.json', import.meta.url);
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : [];
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LispPad',
  tagline: 'Lightweight Scheme IDE for macOS and iOS',
  favicon: 'img/favicon.png',

  headTags: [
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', href: `${baseUrl}img/apple-touch-icon.png`}},
  ],

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    faster: true,
  },

  url: siteUrl,
  baseUrl,
  trailingSlash: false, // Same URL shape as GitBook: /libraries/lispkit, not /libraries/lispkit/

  organizationName: 'objecthub',
  projectName: 'lisppad-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    // *.md is plain CommonMark (no JSX, so `<`, `{` and `}` in Scheme text are harmless);
    // *.mdx is MDX and is only used for pages that need React components.
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // docs-only site: the docs are the site
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/objecthub/lisppad-docs/tree/main/',
          remarkPlugins: [[htmlBaseUrl, {baseUrl}]],
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: null,
          priority: null,
        },
      }),
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: loadRedirects(),
      },
    ],
    newsPosts, // the list of posts on the News page
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/icon.png', // preview image when a page is shared
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'LispPad',
        logo: {
          alt: 'LispPad',
          src: 'img/logo.png',
        },
        items: [
          {to: '/news', label: 'News', position: 'left'},
          {to: '/applications/lisppad', label: 'Applications', position: 'left', activeBaseRegex: '^/applications'},
          {to: '/libraries/lispkit', label: 'Libraries', position: 'left', activeBaseRegex: '^/libraries'},
          {to: '/examples/lispkit', label: 'Examples', position: 'left', activeBaseRegex: '^/examples'},
          {to: '/releases/lisppad', label: 'Releases', position: 'left', activeBaseRegex: '^/releases'},
          {to: '/downloads', label: 'Downloads', position: 'left'},
          {
            href: 'https://github.com/objecthub/swift-lispkit',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Apps',
            items: [
              {label: 'LispPad for macOS', href: 'https://apps.apple.com/de/app/lisppad/id1258939760?l=en&mt=12'},
              {label: 'LispPad Go for iOS', href: 'https://apps.apple.com/us/app/lisppad-go/id1565747728'},
            ],
          },
          {
            title: 'Docs',
            items: [
              {label: 'Downloads', to: '/downloads'},
              {label: 'Release notes', to: '/releases/lisppad'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'Privacy Policy', to: '/privacy-policy'},
              {label: 'Contact', to: '/contact'},
              {label: 'Mailing list', href: 'https://groups.google.com/a/objecthub.com/g/lisppad'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Matthias Zenger.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['scheme', 'applescript', 'ebnf'],
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
    }),
};

export default config;
