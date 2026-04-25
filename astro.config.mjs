import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://open-hr.work',

  integrations: [
    react(),
    // Tailwind v4 uses CSS import + @tailwindcss/postcss, not @astrojs/tailwind
    sitemap({
      // SEO: Only fr + en-US in sitemap to concentrate crawl budget on primary markets.
      // Other locales still build and are accessible but are excluded from sitemap
      // until those markets open (Q2 2026 global launch).
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          'en-US': 'en-US',
        },
      },
      filter: (page) =>
        !page.includes('/mockups/') &&
        !page.includes('/login/') &&
        !page.includes('/pilot/') &&
        !page.includes('/pilot/success/') &&
        !page.endsWith('/open-hr.work/') &&
        // Exclude non-primary locales from sitemap (crawl budget optimisation)
        !page.includes('/en-GB/') &&
        !page.includes('/de/') &&
        !page.includes('/es/') &&
        !page.includes('/it/'),
      serialize(item) {
        // Exclude known duplicate slugs that have 301 redirects to canonical versions
        if (/\/it\/legal\/politica-cookie\//.test(item.url)) {
          return undefined;
        }

        // Strip locale prefix to match on page slug
        const path = new URL(item.url).pathname.replace(/^\/(fr|en-GB|en-US|de|es|it)\//, '/');

        if (path === '/' || path === '') {
          // Homepages — highest value landing pages
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/pricing/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (path.startsWith('/how-it-works/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (path.startsWith('/workers/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (path.startsWith('/about/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        } else if (path.startsWith('/insights/') && path !== '/insights/') {
          // Articles, glossary entries, research — primary backlink magnets
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (path.startsWith('/resources/') && path !== '/resources/') {
          // Whitepapers, frameworks — high-value linkable assets
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (path.startsWith('/legal/')) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }

        // lastmod = build time (Google uses this to prioritize crawling)
        item.lastmod = new Date();

        return item;
      },
    }),
  ],

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en-GB', 'en-US', 'de', 'es', 'it'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  build: {
    assets: '_assets',
  },

  // Trailing slashes for static hosting on Bunny
  trailingSlash: 'always',

  vite: {
    css: {
      transformer: 'postcss',
    },
  },

  // Redirects: removed Open HR product pages now redirect to locale homepage (ESL holding)
  // Legal slug canonicalization preserved (legal pages still required)
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',

    // Removed Open HR product pages → locale homepage
    '/fr/pilot/': '/fr/',
    '/en-GB/pilot/': '/en-GB/',
    '/en-US/pilot/': '/en-US/',
    '/de/pilot/': '/de/',
    '/es/pilot/': '/es/',
    '/it/pilot/': '/it/',
    '/fr/pilot/success/': '/fr/',
    '/en-GB/pilot/success/': '/en-GB/',
    '/en-US/pilot/success/': '/en-US/',
    '/de/pilot/success/': '/de/',
    '/es/pilot/success/': '/es/',
    '/it/pilot/success/': '/it/',
    '/fr/pricing/': '/fr/',
    '/en-GB/pricing/': '/en-GB/',
    '/en-US/pricing/': '/en-US/',
    '/de/pricing/': '/de/',
    '/es/pricing/': '/es/',
    '/it/pricing/': '/it/',
    '/fr/about/': '/fr/',
    '/en-GB/about/': '/en-GB/',
    '/en-US/about/': '/en-US/',
    '/de/about/': '/de/',
    '/es/about/': '/es/',
    '/it/about/': '/it/',
    '/fr/workers/': '/fr/',
    '/en-GB/workers/': '/en-GB/',
    '/en-US/workers/': '/en-US/',
    '/de/workers/': '/de/',
    '/es/workers/': '/es/',
    '/it/workers/': '/it/',
    '/fr/employers/': '/fr/',
    '/en-GB/employers/': '/en-GB/',
    '/en-US/employers/': '/en-US/',
    '/de/employers/': '/de/',
    '/es/employers/': '/es/',
    '/it/employers/': '/it/',
    '/fr/how-it-works/': '/fr/',
    '/en-GB/how-it-works/': '/en-GB/',
    '/en-US/how-it-works/': '/en-US/',
    '/de/how-it-works/': '/de/',
    '/es/how-it-works/': '/es/',
    '/it/how-it-works/': '/it/',
    '/fr/login/': '/fr/',
    '/en-GB/login/': '/en-GB/',
    '/en-US/login/': '/en-US/',
    '/de/login/': '/de/',
    '/es/login/': '/es/',
    '/it/login/': '/it/',
    '/fr/insights/': '/fr/',
    '/en-GB/insights/': '/en-GB/',
    '/en-US/insights/': '/en-US/',
    '/de/insights/': '/de/',
    '/es/insights/': '/es/',
    '/it/insights/': '/it/',
    '/fr/resources/': '/fr/',
    '/en-GB/resources/': '/en-GB/',
    '/en-US/resources/': '/en-US/',
    '/de/resources/': '/de/',
    '/es/resources/': '/es/',
    '/it/resources/': '/it/',

    // Bare /pilot/ without locale prefix (fixes GSC 404)
    '/pilot/': '/en-US/',

    // Legal slug canonicalization — generic English slugs → localized canonical versions
    // Privacy: /legal/privacy/ → locale-specific privacy page
    '/fr/legal/privacy/': '/fr/legal/confidentialite/',
    '/en-GB/legal/privacy/': '/en-GB/legal/privacy-policy/',
    '/en-US/legal/privacy/': '/en-US/legal/privacy-policy/',
    '/de/legal/privacy/': '/de/legal/datenschutz/',
    '/es/legal/privacy/': '/es/legal/politica-privacidad/',
    '/it/legal/privacy/': '/it/legal/informativa-privacy/',

    // Terms: /legal/terms/ → locale-specific terms page
    '/fr/legal/terms/': '/fr/legal/conditions-generales/',
    '/en-GB/legal/terms/': '/en-GB/legal/terms-of-service/',
    '/en-US/legal/terms/': '/en-US/legal/terms-of-service/',
    '/de/legal/terms/': '/de/legal/agb/',
    '/es/legal/terms/': '/es/legal/condiciones-generales/',
    '/it/legal/terms/': '/it/legal/termini-condizioni/',

    // Cookies: /legal/cookies/ → locale-specific cookie page (fr keeps /cookies/ as canonical)
    '/en-GB/legal/cookies/': '/en-GB/legal/cookie-policy/',
    '/en-US/legal/cookies/': '/en-US/legal/cookie-policy/',
    '/de/legal/cookies/': '/de/legal/cookie-richtlinie/',
    '/es/legal/cookies/': '/es/legal/politica-cookies/',
    '/it/legal/cookies/': '/it/legal/informativa-cookie/',

    // Italian duplicate: politica-cookie → informativa-cookie
    '/it/legal/politica-cookie/': '/it/legal/informativa-cookie/',
  },
});
