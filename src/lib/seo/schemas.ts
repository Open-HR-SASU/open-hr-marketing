/**
 * JSON-LD Structured Data Schemas for Open HR Marketing Site
 *
 * Implements schema.org structured data for SEO:
 * - Organization: Company information (all pages)
 * - WebSite: Site-wide search and navigation (homepage)
 * - Product: SaaS product offerings (pricing page)
 * - FAQPage: Frequently asked questions (if FAQ section exists)
 *
 * @see https://schema.org/
 * @see https://developers.google.com/search/docs/appearance/structured-data
 * @see OPE-421
 */

import type { Locale } from '@/lib/i18n';

// Base URL for Open HR
const BASE_URL = 'https://open-hr.work';

/**
 * Organization Schema
 *
 * Provides information about Open HR as a company.
 * Should be included on every page for brand recognition.
 */
export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint?: {
    '@type': 'ContactPoint';
    contactType: string;
    availableLanguage: string[];
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Open HR',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: ['https://linkedin.com/company/open-hr-sasu'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bordeaux',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'German', 'Spanish', 'Italian'],
    },
  };
}

/**
 * WebSite Schema
 *
 * Provides information about the website itself.
 * Should only be included on the homepage.
 */
export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  inLanguage?: string;
}

export function generateWebSiteSchema(locale: Locale): WebSiteSchema {
  const languageMap: Record<Locale, string> = {
    fr: 'fr-FR',
    'en-GB': 'en-GB',
    'en-US': 'en-US',
    de: 'de-DE',
    es: 'es-ES',
    it: 'it-IT',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Open HR',
    url: `${BASE_URL}/${locale}/`,
    inLanguage: languageMap[locale],
  };
}

/**
 * Product Schema for SaaS Offerings
 */
export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  category: string;
  offers: {
    '@type': 'AggregateOffer';
    priceCurrency: string;
    lowPrice: number;
    highPrice: number;
    offerCount: number;
    offers: Array<{
      '@type': 'Offer';
      name: string;
      description: string;
      price: number;
      priceCurrency: string;
      priceValidUntil: string;
      availability: string;
      url: string;
    }>;
  };
}

const PRICING = {
  refscore: { monthly: 9, annualMonthly: 7 },
  refscoreVerified: { monthly: 15, annualMonthly: 12 },
};

const productDescriptions: Record<
  Locale,
  {
    productName: string;
    productDescription: string;
    refscoreName: string;
    refscoreDescription: string;
    refscoreVerifiedName: string;
    refscoreVerifiedDescription: string;
  }
> = {
  fr: {
    productName: 'Open HR - Vérification de Références Professionnelles',
    productDescription:
      'Plateforme SaaS de vérification de références professionnelles et de parcours de carrière.',
    refscoreName: 'RefScore',
    refscoreDescription:
      'Plan de base pour la vérification de références professionnelles.',
    refscoreVerifiedName: 'RefScore Vérifié',
    refscoreVerifiedDescription:
      'Plan premium avec vérification prioritaire et rapports avancés.',
  },
  'en-GB': {
    productName: 'Open HR - Professional Reference Verification',
    productDescription:
      'SaaS platform for professional reference verification and career history validation.',
    refscoreName: 'RefScore',
    refscoreDescription: 'Basic plan for professional reference verification.',
    refscoreVerifiedName: 'RefScore Verified',
    refscoreVerifiedDescription:
      'Premium plan with priority verification and advanced reporting.',
  },
  'en-US': {
    productName: 'Open HR - Professional Reference Verification',
    productDescription:
      'SaaS platform for professional reference verification and career history validation.',
    refscoreName: 'RefScore',
    refscoreDescription: 'Basic plan for professional reference verification.',
    refscoreVerifiedName: 'RefScore Verified',
    refscoreVerifiedDescription:
      'Premium plan with priority verification and advanced reporting.',
  },
  de: {
    productName: 'Open HR - Professionelle Referenzprüfung',
    productDescription:
      'SaaS-Plattform für professionelle Referenzprüfung und Karriereverlaufsvalidierung.',
    refscoreName: 'RefScore',
    refscoreDescription: 'Basisplan für professionelle Referenzprüfung.',
    refscoreVerifiedName: 'RefScore Verifiziert',
    refscoreVerifiedDescription:
      'Premium-Plan mit prioritärer Verifizierung und erweiterten Berichten.',
  },
  es: {
    productName: 'Open HR - Verificación de Referencias Profesionales',
    productDescription:
      'Plataforma SaaS para verificación de referencias profesionales y validación de historial laboral.',
    refscoreName: 'RefScore',
    refscoreDescription:
      'Plan básico para verificación de referencias profesionales.',
    refscoreVerifiedName: 'RefScore Verificado',
    refscoreVerifiedDescription:
      'Plan premium con verificación prioritaria e informes avanzados.',
  },
  it: {
    productName: 'Open HR - Verifica Referenze Professionali',
    productDescription:
      'Piattaforma SaaS per la verifica delle referenze professionali e la validazione della storia lavorativa.',
    refscoreName: 'RefScore',
    refscoreDescription:
      'Piano base per la verifica delle referenze professionali.',
    refscoreVerifiedName: 'RefScore Verificato',
    refscoreVerifiedDescription:
      'Piano premium con verifica prioritaria e report avanzati.',
  },
};

export function generateProductSchema(locale: Locale): ProductSchema {
  const currencyMap: Record<Locale, string> = {
    fr: 'EUR',
    'en-GB': 'GBP',
    'en-US': 'USD',
    de: 'EUR',
    es: 'EUR',
    it: 'EUR',
  };

  const currency = currencyMap[locale];
  const content = productDescriptions[locale];
  const priceValidUntil = `${new Date().getFullYear()}-12-31`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: content.productName,
    description: content.productDescription,
    brand: { '@type': 'Brand', name: 'Open HR' },
    category: 'Software > Business Software > Human Resources Software',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currency,
      lowPrice: PRICING.refscore.annualMonthly,
      highPrice: PRICING.refscoreVerified.monthly,
      offerCount: 2,
      offers: [
        {
          '@type': 'Offer',
          name: content.refscoreName,
          description: content.refscoreDescription,
          price: PRICING.refscore.monthly,
          priceCurrency: currency,
          priceValidUntil,
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/${locale}/pricing/`,
        },
        {
          '@type': 'Offer',
          name: content.refscoreVerifiedName,
          description: content.refscoreVerifiedDescription,
          price: PRICING.refscoreVerified.monthly,
          priceCurrency: currency,
          priceValidUntil,
          availability: 'https://schema.org/InStock',
          url: `${BASE_URL}/${locale}/pricing/`,
        },
      ],
    },
  };
}

/**
 * FAQPage Schema
 */
export interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export function generateFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * BreadcrumbList Schema
 */
export interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
    })),
  };
}

export type Schema =
  | OrganizationSchema
  | WebSiteSchema
  | ProductSchema
  | FAQPageSchema
  | BreadcrumbListSchema;

export function combineSchemas(schemas: Schema[]): string {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      const { '@context': _, ...rest } = schema as {
        '@context': string;
        [key: string]: unknown;
      };
      return rest;
    }),
  });
}
