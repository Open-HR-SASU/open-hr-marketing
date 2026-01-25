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
  // Use CDN for static builds — content is fetched at build time
  useCdn: true,
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
