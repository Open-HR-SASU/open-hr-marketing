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

  // Redirects: sitemap alias + removed pages + legal slug canonicalization
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    '/fr/pilot/': '/fr/pricing/',
    '/en-GB/pilot/': '/en-GB/pricing/',
    '/en-US/pilot/': '/en-US/pricing/',
    '/de/pilot/': '/de/pricing/',
    '/es/pilot/': '/es/pricing/',
    '/it/pilot/': '/it/pricing/',
    '/fr/pilot/success/': '/fr/pricing/',
    '/en-GB/pilot/success/': '/en-GB/pricing/',
    '/en-US/pilot/success/': '/en-US/pricing/',
    '/de/pilot/success/': '/de/pricing/',
    '/es/pilot/success/': '/es/pricing/',
    '/it/pilot/success/': '/it/pricing/',

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

    // Bare /pilot/ without locale prefix (fixes GSC 404)
    '/pilot/': '/en-US/pricing/',
  },
});
