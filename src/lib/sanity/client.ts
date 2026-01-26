/**
 * Sanity Client Configuration for Marketing Site
 *
 * Static site generation — uses CDN for fast builds.
 * No live preview needed (use Sanity Studio native preview instead).
 */
import { createClient, type ClientConfig } from '@sanity/client';

const config: ClientConfig = {
  projectId: 'tbkdha33',
  dataset: 'production',
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
