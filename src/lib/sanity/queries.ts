/**
 * GROQ Query Definitions for Sanity CMS (Marketing Site)
 *
 * Ported from apps/platform/src/sanity/lib/queries.ts
 * Uses groq tagged template literals for syntax highlighting.
 */
import groq from 'groq';

// =============================================================================
// FRAGMENTS (Reusable query parts)
// =============================================================================

/**
 * Image fragment with asset metadata for optimized loading
 */
export const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  hotspot,
  crop
`;

/**
 * SEO fields fragment
 */
export const seoFragment = /* groq */ `
  metaTitle,
  metaDescription,
  ogImage {
    ${imageFragment}
  },
  ogImageAlt
`;

/**
 * Feature item fragment
 */
export const featureFragment = /* groq */ `
  _key,
  icon,
  heading,
  description,
  link,
  linkLabel
`;

/**
 * Pricing feature fragment
 */
export const pricingFeatureFragment = /* groq */ `
  _key,
  text,
  included,
  tooltip
`;

/**
 * Pricing tier fragment
 */
export const pricingTierFragment = /* groq */ `
  _key,
  tierKey,
  name,
  description,
  features[] {
    ${pricingFeatureFragment}
  },
  highlighted,
  badge,
  stripeProductId,
  stripePriceIdMonthly,
  stripePriceIdAnnual,
  checkoutMode
`;

/**
 * Mockup image fragment for device frames
 */
export const mockupImageFragment = /* groq */ `
  asset->{
    url
  },
  alt,
  caption
`;

/**
 * Flow step fragment for reference experience sections
 */
export const flowStepFragment = /* groq */ `
  _key,
  stepNumber,
  title,
  description,
  mockupImage {
    ${mockupImageFragment}
  }
`;

/**
 * Section fragment with all conditional content
 */
export const sectionFragment = /* groq */ `
  _id,
  _type,
  language,
  sectionType,
  eyebrow,
  heading,
  subheading,
  body,
  features[] {
    ${featureFragment}
  },
  pricingTiers[] {
    ${pricingTierFragment}
  },
  emptyState {
    heading,
    body,
    ctaText,
    ctaLink
  },
  ctaText,
  ctaLink,
  ctaStyle,
  ctaText2,
  ctaLink2,
  backgroundStyle,
  anchor,
  ariaLabel,
  hideMobile,
  helpText,
  showPilotSignup,
  showAppStoreBadges,
  pilotSignupUrl,
  // Mockup fields for visual section types
  mockupImage {
    ${mockupImageFragment}
  },
  mockupImages[] {
    ${mockupImageFragment}
  },
  flowSteps[] {
    ${flowStepFragment}
  }
`;

// =============================================================================
// PAGE QUERIES
// =============================================================================

/**
 * Get a page by slug and locale with all sections expanded
 */
export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug && language == $locale][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    language,
    title,
    slug,
    sections[]-> {
      ${sectionFragment}
    },
    seo {
      ${seoFragment}
    }
  }
`;

/**
 * Get all page slugs for a locale (for static generation)
 */
export const PAGE_SLUGS_QUERY = groq`
  *[_type == "page" && language == $locale && defined(slug.current)] {
    "slug": slug.current
  }
`;

// =============================================================================
// NAVIGATION QUERIES
// =============================================================================

/**
 * Get navigation tree by locale (top-level items with children)
 */
export const NAVIGATION_QUERY = groq`
  *[_type == "navigationItem" && language == $locale && !defined(parent)] | order(order asc) {
    _id,
    _type,
    language,
    label,
    href,
    navType,
    signupCtaText,
    order,
    openInNewTab,
    ariaLabel,
    hideOnMobile,
    mobileOrder,
    "children": *[_type == "navigationItem" && language == $locale && parent._ref == ^._id] | order(order asc) {
      _id,
      _type,
      language,
      label,
      href,
      navType,
      order,
      openInNewTab,
      ariaLabel,
      hideOnMobile,
      mobileOrder
    }
  }
`;

// =============================================================================
// SITE SETTINGS QUERIES
// =============================================================================

/**
 * Get site settings (singleton)
 */
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    siteName,
    tagline,
    defaultMetaDescription,
    logo {
      ${imageFragment}
    },
    logoAlt,
    favicon {
      ${imageFragment}
    },
    announcementBar {
      enabled,
      message,
      link,
      linkLabel,
      style
    },
    socialLinks[] {
      _key,
      platform,
      url
    },
    availableLocales[] {
      _key,
      code,
      label,
      flag,
      enabled
    }
  }
`;

// =============================================================================
// FOOTER QUERIES
// =============================================================================

/**
 * Get footer by locale
 */
export const FOOTER_QUERY = groq`
  *[_type == "footer" && language == $locale][0] {
    _id,
    _type,
    language,
    copyrightText,
    columns[] {
      _key,
      title,
      links[] {
        _key,
        label,
        href
      }
    }
  }
`;

// =============================================================================
// SECTION QUERIES
// =============================================================================

/**
 * Get a single section by ID
 */
export const SECTION_BY_ID_QUERY = groq`
  *[_type == "section" && _id == $id][0] {
    ${sectionFragment}
  }
`;

/**
 * Get all sections of a specific type for a locale
 */
export const SECTIONS_BY_TYPE_QUERY = groq`
  *[_type == "section" && sectionType == $sectionType && language == $locale] {
    ${sectionFragment}
  }
`;

/**
 * Get pricing section with Stripe IDs (for price fetching)
 */
export const PRICING_SECTION_QUERY = groq`
  *[_type == "section" && sectionType == "pricing" && language == $locale][0] {
    _id,
    heading,
    subheading,
    "tiers": pricingTiers[] {
      tierKey,
      name,
      description,
      features[] {
        ${pricingFeatureFragment}
      },
      highlighted,
      badge,
      stripeProductId,
      stripePriceIdMonthly,
      stripePriceIdAnnual,
      checkoutMode
    }
  }
`;

// =============================================================================
// LEGAL DOCUMENT QUERIES
// =============================================================================

/**
 * Legal section fragment for progressive disclosure
 */
export const legalSectionFragment = /* groq */ `
  _key,
  _type,
  sectionNumber,
  title,
  anchor,
  displayType,
  defaultExpanded,
  content[] {
    ...,
    _type == "inlineTable" => {
      _key,
      _type,
      caption,
      headers,
      rows[] {
        _key,
        cells
      }
    }
  },
  contactInfo {
    companyName,
    legalForm,
    capital,
    address,
    rcs,
    euid,
    vat,
    email,
    phone,
    website
  },
  rights[] {
    _key,
    icon,
    name,
    description
  },
  subsections[] {
    _key,
    subNumber,
    subTitle,
    subContent
  }
`;

/**
 * Get a legal document by slug and locale
 */
export const LEGAL_DOCUMENT_QUERY = groq`
  *[_type == "legalDocument" && slug.current == $slug && language == $locale][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    documentType,
    language,
    version,
    status,
    effectiveDate,
    lastUpdated,
    quickSummary {
      heading,
      points[] {
        _key,
        icon,
        text
      }
    },
    sections[] {
      ${legalSectionFragment}
    },
    footerNote,
    seo {
      metaTitle,
      metaDescription,
      noIndex
    },
    showToc,
    showVersionBadge,
    expandFirstSection
  }
`;

/**
 * Get all legal document slugs for a locale (for static generation)
 */
export const LEGAL_DOCUMENT_SLUGS_QUERY = groq`
  *[_type == "legalDocument" && language == $locale && defined(slug.current)] {
    "slug": slug.current,
    documentType
  }
`;
