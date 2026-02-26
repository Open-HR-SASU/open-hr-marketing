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
    sameAs: [
      // Canonical identity URLs — no UTM params (structured data must stay clean)
      'https://www.linkedin.com/company/110142540',
      'https://www.facebook.com/share/1C39EpDkkj/',
      'https://www.instagram.com/open_hr.work',
      'https://x.com/open_hr_work',
      'https://bsky.app/profile/open-hr.work',
      'https://youtube.com/@open-hr',
    ],
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

/**
 * HowTo Schema for the RefScore process
 */
export interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description: string;
  step: Array<{
    '@type': 'HowToStep';
    position: number;
    name: string;
    text: string;
  }>;
}

const howToContent: Record<
  Locale,
  { name: string; description: string; steps: Array<{ name: string; text: string }> }
> = {
  fr: {
    name: 'Comment obtenir votre RefScore',
    description: 'Trois étapes pour obtenir une accréditation vérifiée que les employeurs reconnaissent.',
    steps: [
      { name: 'Invitez vos références', text: 'Envoyez une invitation à vos anciens collègues ou managers. Ils répondent de manière anonyme.' },
      { name: 'Ils remplissent le questionnaire', text: 'Vos références répondent à un questionnaire structuré conçu par des psychologues I-O. Leurs réponses restent anonymes.' },
      { name: 'Recevez votre accréditation vérifiée', text: 'Vous obtenez un RefScore vérifié que vous pouvez joindre à vos candidatures, votre profil LinkedIn et plus encore.' },
    ],
  },
  'en-GB': {
    name: 'How to get your RefScore',
    description: 'Three steps to a credential employers trust.',
    steps: [
      { name: 'Invite your references', text: 'Send an invitation to former colleagues or managers. They respond anonymously.' },
      { name: 'They complete the questionnaire', text: 'Your references answer a structured questionnaire designed by I-O psychologists. Their responses remain anonymous.' },
      { name: 'Receive your verified credential', text: 'You get a verified RefScore you can attach to job applications, your LinkedIn profile, and more.' },
    ],
  },
  'en-US': {
    name: 'How to get your RefScore',
    description: 'Three steps to a credential employers trust.',
    steps: [
      { name: 'Invite your references', text: 'Send an invitation to former colleagues or managers. They respond anonymously.' },
      { name: 'They complete the questionnaire', text: 'Your references answer a structured questionnaire designed by I-O psychologists. Their responses remain anonymous.' },
      { name: 'Receive your verified credential', text: 'You get a verified RefScore you can attach to job applications, your LinkedIn profile, and more.' },
    ],
  },
  de: {
    name: 'So erhalten Sie Ihren RefScore',
    description: 'Drei Schritte zu einer verifizierten Akkreditierung, der Arbeitgeber vertrauen.',
    steps: [
      { name: 'Laden Sie Ihre Referenzen ein', text: 'Senden Sie eine Einladung an ehemalige Kollegen oder Vorgesetzte. Sie antworten anonym.' },
      { name: 'Sie füllen den Fragebogen aus', text: 'Ihre Referenzen beantworten einen strukturierten Fragebogen, der von I-O-Psychologen entwickelt wurde. Ihre Antworten bleiben anonym.' },
      { name: 'Erhalten Sie Ihre verifizierte Akkreditierung', text: 'Sie erhalten einen verifizierten RefScore, den Sie Ihren Bewerbungen, Ihrem LinkedIn-Profil und mehr beifügen können.' },
    ],
  },
  es: {
    name: 'Cómo obtener tu RefScore',
    description: 'Tres pasos para obtener una acreditación verificada en la que confían los empleadores.',
    steps: [
      { name: 'Invita a tus referencias', text: 'Envía una invitación a antiguos colegas o jefes. Responden de forma anónima.' },
      { name: 'Completan el cuestionario', text: 'Tus referencias responden a un cuestionario estructurado diseñado por psicólogos I-O. Sus respuestas permanecen anónimas.' },
      { name: 'Recibe tu acreditación verificada', text: 'Obtienes un RefScore verificado que puedes adjuntar a tus solicitudes de empleo, tu perfil de LinkedIn y más.' },
    ],
  },
  it: {
    name: 'Come ottenere il tuo RefScore',
    description: 'Tre passaggi per ottenere una credenziale verificata di cui i datori di lavoro si fidano.',
    steps: [
      { name: 'Invita le tue referenze', text: 'Invia un invito a ex colleghi o responsabili. Rispondono in modo anonimo.' },
      { name: 'Completano il questionario', text: 'Le tue referenze rispondono a un questionario strutturato progettato da psicologi I-O. Le loro risposte rimangono anonime.' },
      { name: 'Ricevi la tua credenziale verificata', text: 'Ottieni un RefScore verificato che puoi allegare alle candidature, al tuo profilo LinkedIn e altro.' },
    ],
  },
};

export function generateHowToSchema(locale: Locale): HowToSchema {
  const content = howToContent[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: content.name,
    description: content.description,
    step: content.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export type Schema =
  | OrganizationSchema
  | WebSiteSchema
  | ProductSchema
  | FAQPageSchema
  | BreadcrumbListSchema
  | HowToSchema;

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
