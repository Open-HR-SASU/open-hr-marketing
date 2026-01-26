/**
 * Section Component Types (Astro Marketing Site)
 *
 * TypeScript interfaces for section components.
 * Mirrors platform types but adapted for Astro static rendering.
 */

import type { Section, Locale } from '@/lib/sanity/fetchers';

// Re-export for convenience
export type { Section, Locale };

/**
 * Section type identifiers from Sanity CMS
 */
export type SectionType =
  | 'hero'
  | 'heroMockup'
  | 'features'
  | 'cta'
  | 'content'
  | 'pricing'
  | 'testimonials'
  | 'faq'
  | 'stats'
  | 'process'
  | 'howItWorks'
  | 'referenceExperience'
  | 'appPreview';

/**
 * Background style options
 */
export type BackgroundStyle = 'default' | 'light' | 'dark' | 'brand' | 'gradient';

/**
 * Props passed to all section components
 */
export interface SectionProps {
  /** The section type identifier */
  type: SectionType;
  /** Language/locale code */
  language?: Locale;
  /** Section eyebrow text (small text above heading) */
  eyebrow?: string | null;
  /** Section heading/title */
  heading?: string | null;
  /** Section subheading/subtitle */
  subheading?: string | null;
  /** Rich text body content (Portable Text) */
  body?: unknown[] | null;
  /** Features array (for features sections) */
  features?: Array<{
    _key: string;
    icon?: string;
    heading?: string;
    description?: string;
    link?: string;
    linkLabel?: string;
  }> | null;
  /** Pricing tiers (for pricing sections) */
  pricingTiers?: Array<{
    _key: string;
    tierKey: string;
    name: string;
    description?: string;
    features: Array<{
      _key: string;
      text: string;
      included: boolean;
      tooltip?: string;
    }>;
    highlighted?: boolean;
    badge?: string;
    stripeProductId?: string;
    stripePriceIdMonthly?: string;
    stripePriceIdAnnual?: string;
    checkoutMode?: 'payment' | 'subscription';
  }> | null;
  /** Primary CTA button text */
  ctaText?: string | null;
  /** Primary CTA link URL */
  ctaLink?: string | null;
  /** Primary CTA style */
  ctaStyle?: string | null;
  /** Secondary CTA button text */
  ctaSecondaryText?: string | null;
  /** Secondary CTA link URL */
  ctaSecondaryLink?: string | null;
  /** Background style */
  backgroundStyle?: BackgroundStyle | null;
  /** Anchor slug for navigation */
  anchor?: string | null;
  /** ARIA label for accessibility */
  ariaLabel?: string | null;
  /** Help text */
  helpText?: string | null;
  /** Hide on mobile */
  hideMobile?: boolean;
  /** Sanity document ID */
  documentId: string;
  /** Additional className for styling overrides */
  className?: string;
  /** Show pilot signup form (appPreview section) */
  showPilotSignup?: boolean;
  /** Show app store badges (appPreview section) */
  showAppStoreBadges?: boolean;
  /** Pilot signup URL (appPreview section) */
  pilotSignupUrl?: string;
}

/**
 * Localize internal links by adding locale prefix
 * - Internal links start with / but not // (protocol-relative)
 * - External links (http://, https://) are left unchanged
 * - Adds trailing slash for Bunny Edge Storage compatibility
 */
function localizeLink(link: string | null | undefined, locale: Locale): string | null {
  if (!link) return null;

  // External links - leave unchanged
  if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('//')) {
    return link;
  }

  // Already has locale prefix - leave unchanged
  if (link.match(/^\/(fr|en-GB|en-US|de|es|it)(\/|$)/)) {
    // Ensure trailing slash
    return link.endsWith('/') ? link : `${link}/`;
  }

  // Internal link - add locale prefix and trailing slash
  if (link.startsWith('/')) {
    const path = link.endsWith('/') ? link : `${link}/`;
    return `/${locale}${path}`;
  }

  // Relative link or anchor - leave unchanged
  return link;
}

/**
 * Transform Sanity Section to SectionProps
 */
export function sectionToProps(section: Section, locale: Locale, className?: string): SectionProps {
  return {
    type: section.sectionType as SectionType,
    language: section.language || locale,
    eyebrow: section.eyebrow ?? null,
    heading: section.heading ?? null,
    subheading: section.subheading ?? null,
    body: section.body ?? null,
    features: section.features ?? null,
    pricingTiers: section.pricingTiers ?? null,
    ctaText: section.ctaText ?? null,
    ctaLink: localizeLink(section.ctaLink, locale),
    ctaStyle: section.ctaStyle ?? null,
    ctaSecondaryText: section.ctaText2 ?? null,
    ctaSecondaryLink: localizeLink(section.ctaLink2, locale),
    backgroundStyle: (section.backgroundStyle as BackgroundStyle) ?? null,
    anchor: section.anchor ?? null,
    ariaLabel: section.ariaLabel ?? null,
    helpText: section.helpText ?? null,
    hideMobile: section.hideMobile ?? false,
    documentId: section._id,
    className,
    showPilotSignup: section.showPilotSignup,
    showAppStoreBadges: section.showAppStoreBadges,
    pilotSignupUrl: localizeLink(section.pilotSignupUrl, locale),
  };
}

/**
 * Get background CSS class from style
 */
export function getBackgroundClass(style: BackgroundStyle | null | undefined): string {
  switch (style) {
    case 'light':
      return 'bg-gray-50';
    case 'dark':
      return 'bg-gray-900 text-white';
    case 'brand':
      return 'bg-openhr-teal-900 text-white';
    case 'gradient':
      return 'bg-gradient-to-br from-openhr-teal-900/5 to-openhr-teal-900/10';
    default:
      return 'bg-white';
  }
}
