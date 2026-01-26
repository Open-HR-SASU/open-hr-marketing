/**
 * Sanity Client Configuration for Marketing Site
 *
 * Static site generation — uses live API for fresh content at build time.
 * No live preview needed (use Sanity Studio native preview instead).
 *
 * Environment variables (set in Clever Cloud):
 * - PUBLIC_SANITY_PROJECT_ID: Sanity project ID
 * - PUBLIC_SANITY_DATASET: Sanity dataset name
 */
import { createClient, type ClientConfig } from '@sanity/client';

// Validate required env vars at build time
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Set PUBLIC_SANITY_PROJECT_ID and PUBLIC_SANITY_DATASET.'
  );
}

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  // Per Sanity docs: useCdn: false for static builds ensures fresh content
  // CDN caching can serve stale data during SSG builds
  // See: https://www.sanity.io/docs/help/js-client-cdn-configuration
  useCdn: false,
};

export const sanityClient = createClient(config);

/**
 * Typed fetch helper for GROQ queries
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return sanityClient.fetch<T>(query, params);
}
