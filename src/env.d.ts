/// <reference types="astro/client" />

/**
 * Environment variable type definitions for TypeScript IntelliSense.
 *
 * Required environment variables (set in Clever Cloud):
 * - PUBLIC_SANITY_PROJECT_ID: Sanity project ID (e.g., 'tbkdha33')
 * - PUBLIC_SANITY_DATASET: Sanity dataset name (e.g., 'production')
 * - PUBLIC_PLATFORM_URL: Platform app URL (e.g., 'https://app.open-hr.work')
 */
interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_PLATFORM_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
