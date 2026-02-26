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
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          'en-GB': 'en-GB',
          'en-US': 'en-US',
          de: 'de-DE',
          es: 'es-ES',
          it: 'it-IT',
        },
      },
      filter: (page) => !page.includes('/mockups/'),
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

  // Permanent redirects for removed pages (pilot page removed, redirecting to pricing)
  redirects: {
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
  },
});
