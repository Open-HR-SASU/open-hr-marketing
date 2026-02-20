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
  LEGAL_DOCUMENT_QUERY,
  LEGAL_DOCUMENT_SLUGS_QUERY,
  RESOURCE_LIST_QUERY,
  RESOURCE_BY_SLUG_QUERY,
  RESOURCE_SLUGS_QUERY,
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

export interface MockupImage {
  asset?: {
    url?: string;
  };
  alt?: string;
  caption?: string;
}

export interface FlowStep {
  _key: string;
  stepNumber?: number;
  title?: string;
  description?: string;
  mockupImage?: MockupImage;
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
  // Mockup fields for visual section types
  mockupImage?: MockupImage;
  mockupImages?: MockupImage[];
  flowSteps?: FlowStep[];
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

// =============================================================================
// DOWNLOADABLE RESOURCE TYPES
// =============================================================================

export type ResourceType =
  | 'whitepaper'
  | 'case-study'
  | 'technical-guide'
  | 'industry-report'
  | 'product-sheet'
  | 'press-release';

export interface DownloadableResource {
  _id: string;
  title: string;
  slug: { current: string };
  resourceType: ResourceType;
  description: string;
  publishedAt: string;
  authors?: string[];
  pageCount?: number;
  fileSizeLabel?: string;
  tags?: string[];
  featured: boolean;
  gated: boolean;
  coverImage?: SanityImage;
  bunnyUrl?: string; // only present on detail query
  seo?: SEO;
}

// =============================================================================
// DOWNLOADABLE RESOURCE FETCHERS
// =============================================================================

/**
 * Get all downloadable resources for a locale
 */
export async function getResources(locale: Locale): Promise<DownloadableResource[]> {
  return sanityFetch<DownloadableResource[]>(RESOURCE_LIST_QUERY, { locale }) ?? [];
}

/**
 * Get a single downloadable resource by slug and locale
 */
export async function getResource(
  slug: string,
  locale: Locale
): Promise<DownloadableResource | null> {
  return sanityFetch<DownloadableResource | null>(RESOURCE_BY_SLUG_QUERY, { slug, locale });
}

/**
 * Get all resource slugs for a locale (for static generation)
 */
export async function getResourceSlugs(
  locale: Locale
): Promise<Array<{ slug: string }>> {
  return sanityFetch<Array<{ slug: string }>>(RESOURCE_SLUGS_QUERY, { locale }) ?? [];
}

// =============================================================================
// LEGAL DOCUMENT TYPES
// =============================================================================

export interface LegalContactInfo {
  companyName?: string;
  legalForm?: string;
  capital?: string;
  address?: string;
  rcs?: string;
  euid?: string;
  vat?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface LegalRight {
  _key: string;
  icon?: string;
  name?: string;
  description?: string;
}

export interface LegalSubsection {
  _key: string;
  subNumber?: string;
  subTitle?: string;
  subContent?: unknown[]; // Portable Text
}

export interface InlineTableRow {
  _key: string;
  cells: string[];
}

export interface InlineTable {
  _key: string;
  _type: 'inlineTable';
  caption?: string;
  headers?: string[];
  rows?: InlineTableRow[];
}

export interface LegalSection {
  _key: string;
  _type: string;
  sectionNumber?: string;
  title: string;
  anchor?: { current: string };
  displayType?: 'text' | 'table' | 'contact' | 'rights' | 'subsections';
  defaultExpanded?: boolean;
  content?: (unknown | InlineTable)[]; // Portable Text with inline tables
  contactInfo?: LegalContactInfo;
  rights?: LegalRight[];
  subsections?: LegalSubsection[];
}

export interface LegalQuickSummaryPoint {
  _key: string;
  icon?: string;
  text?: string;
}

export interface LegalQuickSummary {
  heading?: string;
  points?: LegalQuickSummaryPoint[];
}

export interface LegalDocumentSEO {
  metaTitle?: string;
  metaDescription?: string;
  noIndex?: boolean;
}

export type LegalDocumentType =
  | 'legal-notice'
  | 'privacy'
  | 'cookies'
  | 'terms'
  | 'terms-of-use'
  | 'acceptable-use';

export interface LegalDocument {
  _id: string;
  _type: 'legalDocument';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  documentType: LegalDocumentType;
  language: Locale;
  version: string;
  status: 'draft' | 'review' | 'active' | 'archived';
  effectiveDate: string;
  lastUpdated: string;
  quickSummary?: LegalQuickSummary;
  sections?: LegalSection[];
  footerNote?: string;
  seo?: LegalDocumentSEO;
  showToc?: boolean;
  showVersionBadge?: boolean;
  expandFirstSection?: boolean;
}

// =============================================================================
// LEGAL DOCUMENT FETCHERS
// =============================================================================

/**
 * Get a legal document by slug and locale
 */
export async function getLegalDocument(
  slug: string,
  locale: Locale
): Promise<LegalDocument | null> {
  return sanityFetch<LegalDocument | null>(LEGAL_DOCUMENT_QUERY, { slug, locale });
}

/**
 * Get all legal document slugs for a locale (for static generation)
 */
export async function getLegalDocumentSlugs(
  locale: Locale
): Promise<Array<{ slug: string; documentType: LegalDocumentType }>> {
  return sanityFetch<Array<{ slug: string; documentType: LegalDocumentType }>>(
    LEGAL_DOCUMENT_SLUGS_QUERY,
    { locale }
  );
}
