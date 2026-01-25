import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://open-hr.work',

  integrations: [
    react(),
    // Tailwind v4 uses CSS import + @tailwindcss/postcss, not @astrojs/tailwind
  ],

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en-GB', 'en-US', 'de', 'es', 'it'],
    routing: {
      prefixDefaultLocale: true,
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
