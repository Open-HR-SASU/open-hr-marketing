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
});
