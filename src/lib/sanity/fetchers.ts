/**
 * Typed Fetcher Functions for Sanity CMS
 *
 * These functions wrap GROQ queries with proper TypeScript types.
 */
import { sanityFetch } from './client';
import {
  PAGE_BY_SLUG_QUERY,
  PAGE_SLUGS_QUERY,
  NAVIGATION_QUERY,
  SITE_SETTINGS_QUERY,
  FOOTER_QUERY,
  SECTION_BY_ID_QUERY,
  PRICING_SECTION_QUERY,
} from './queries';
import type { Locale } from '@/lib/i18n';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  ogImageAlt?: string;
}

export interface Feature {
  _key: string;
  icon?: string;
  heading?: string;
  description?: string;
  link?: string;
  linkLabel?: string;
}

export interface PricingFeature {
  _key: string;
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingTier {
  _key: string;
  tierKey: string;
  name: string;
  description?: string;
  features: PricingFeature[];
  highlighted?: boolean;
  badge?: string;
  stripeProductId?: string;
  stripePriceIdMonthly?: string;
  stripePriceIdAnnual?: string;
  checkoutMode?: 'payment' | 'subscription';
}

export interface Section {
  _id: string;
  _type: string;
  language: Locale;
  sectionType: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  body?: unknown[]; // Portable Text
  features?: Feature[];
  pricingTiers?: PricingTier[];
  emptyState?: {
    heading?: string;
    body?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  ctaText?: string;
  ctaLink?: string;
  ctaStyle?: string;
  ctaText2?: string;
  ctaLink2?: string;
  backgroundStyle?: string;
  anchor?: string;
  ariaLabel?: string;
  hideMobile?: boolean;
  helpText?: string;
  showPilotSignup?: boolean;
  showAppStoreBadges?: boolean;
  pilotSignupUrl?: string;
}

export interface Page {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  language: Locale;
  title: string;
  slug: {
    current: string;
  };
  sections: Section[];
  seo?: SEO;
}

export interface NavigationItem {
  _id: string;
  _type: string;
  language: Locale;
  label: string;
  href?: string;
  navType?: 'link' | 'dropdown' | 'button' | 'signup';
  signupCtaText?: string;
  order: number;
  openInNewTab?: boolean;
  ariaLabel?: string;
  hideOnMobile?: boolean;
  mobileOrder?: number;
  children?: NavigationItem[];
}

export interface SiteSettings {
  _id: string;
  _type: string;
  siteName?: string;
  tagline?: string;
  defaultMetaDescription?: string;
  logo?: SanityImage;
  logoAlt?: string;
  favicon?: SanityImage;
  announcementBar?: {
    enabled: boolean;
    message?: string;
    link?: string;
    linkLabel?: string;
    style?: string;
  };
  socialLinks?: Array<{
    _key: string;
    platform: string;
    url: string;
  }>;
  availableLocales?: Array<{
    _key: string;
    code: string;
    label: string;
    flag?: string;
    enabled: boolean;
  }>;
}

export interface FooterColumn {
  _key: string;
  title: string;
  links: Array<{
    _key: string;
    label: string;
    href: string;
  }>;
}

export interface Footer {
  _id: string;
  _type: string;
  language: Locale;
  copyrightText?: string;
  columns: FooterColumn[];
}

export interface PricingSection {
  _id: string;
  heading?: string;
  subheading?: string;
  tiers: PricingTier[];
}

// =============================================================================
// FETCHER FUNCTIONS
// =============================================================================

/**
 * Get a page by slug and locale
 */
export async function getPage(
  slug: string,
  locale: Locale
): Promise<Page | null> {
  return sanityFetch<Page | null>(PAGE_BY_SLUG_QUERY, { slug, locale });
}

/**
 * Get page metadata for SEO
 */
export async function getPageMetadata(
  slug: string,
  locale: Locale
): Promise<{ title: string; seo?: SEO } | null> {
  const page = await getPage(slug, locale);
  if (!page) return null;
  return { title: page.title, seo: page.seo };
}

/**
 * Get all page slugs for a locale (for static generation)
 */
export async function getPageSlugs(
  locale: Locale
): Promise<Array<{ slug: string }>> {
  return sanityFetch<Array<{ slug: string }>>(PAGE_SLUGS_QUERY, { locale });
}

/**
 * Get navigation for a locale
 */
export async function getNavigation(
  locale: Locale
): Promise<NavigationItem[]> {
  return sanityFetch<NavigationItem[]>(NAVIGATION_QUERY, { locale });
}

/**
 * Get site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
}

/**
 * Get footer for a locale
 */
export async function getFooter(locale: Locale): Promise<Footer | null> {
  return sanityFetch<Footer | null>(FOOTER_QUERY, { locale });
}

/**
 * Get a section by ID
 */
export async function getSection(id: string): Promise<Section | null> {
  return sanityFetch<Section | null>(SECTION_BY_ID_QUERY, { id });
}

/**
 * Get pricing section for a locale
 */
export async function getPricingSection(
  locale: Locale
): Promise<PricingSection | null> {
  return sanityFetch<PricingSection | null>(PRICING_SECTION_QUERY, { locale });
}
