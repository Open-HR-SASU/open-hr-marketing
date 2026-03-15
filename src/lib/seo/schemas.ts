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
import { EMPLOYER_TIERS, getCurrencyForLocale } from '@/lib/pricing';

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
 *
 * Workers are free. Always. (CEO decision, 2026-03-15)
 * Revenue = B2B employer per-assessment pricing (Essential/Professional/Executive)
 */
export interface ProductOffer {
  '@type': 'Offer';
  name: string;
  description: string;
  price: number;
  priceCurrency: string;
  priceValidUntil: string;
  availability: string;
  url: string;
  isAccessibleForFree?: boolean;
}

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
    offers: ProductOffer[];
  };
}

const productContent: Record<
  Locale,
  {
    productName: string;
    productDescription: string;
    workerOfferName: string;
    workerOfferDescription: string;
  }
> = {
  fr: {
    productName: 'Open HR — Vérification de Références Professionnelles',
    productDescription:
      'Plateforme gratuite pour les travailleurs permettant de collecter des références professionnelles vérifiées et anonymes. Les employeurs paient par évaluation.',
    workerOfferName: 'RefScore pour les travailleurs',
    workerOfferDescription:
      'Gratuit pour les travailleurs. Collectez des références anonymes, obtenez votre RefScore et joignez-le à vos candidatures.',
  },
  'en-GB': {
    productName: 'Open HR — Professional Reference Verification',
    productDescription:
      'Free platform for workers to collect anonymous, verified professional references. Employers pay per assessment.',
    workerOfferName: 'RefScore for Workers',
    workerOfferDescription:
      'Free for workers. Collect anonymous references, get your RefScore, and attach it to job applications.',
  },
  'en-US': {
    productName: 'Open HR — Professional Reference Verification',
    productDescription:
      'Free platform for workers to collect anonymous, verified professional references. Employers pay per assessment.',
    workerOfferName: 'RefScore for Workers',
    workerOfferDescription:
      'Free for workers. Collect anonymous references, get your RefScore, and attach it to job applications.',
  },
  de: {
    productName: 'Open HR — Professionelle Referenzprüfung',
    productDescription:
      'Kostenlose Plattform für Arbeitnehmer zur Sammlung anonymer, verifizierter professioneller Referenzen. Arbeitgeber zahlen pro Bewertung.',
    workerOfferName: 'RefScore für Arbeitnehmer',
    workerOfferDescription:
      'Kostenlos für Arbeitnehmer. Sammeln Sie anonyme Referenzen, erhalten Sie Ihren RefScore und fügen Sie ihn Ihren Bewerbungen bei.',
  },
  es: {
    productName: 'Open HR — Verificación de Referencias Profesionales',
    productDescription:
      'Plataforma gratuita para trabajadores que permite recopilar referencias profesionales anónimas y verificadas. Los empleadores pagan por evaluación.',
    workerOfferName: 'RefScore para trabajadores',
    workerOfferDescription:
      'Gratis para trabajadores. Recopila referencias anónimas, obtén tu RefScore y adjúntalo a tus solicitudes de empleo.',
  },
  it: {
    productName: 'Open HR — Verifica Referenze Professionali',
    productDescription:
      'Piattaforma gratuita per i lavoratori per raccogliere referenze professionali anonime e verificate. I datori di lavoro pagano per valutazione.',
    workerOfferName: 'RefScore per i lavoratori',
    workerOfferDescription:
      'Gratuito per i lavoratori. Raccogli referenze anonime, ottieni il tuo RefScore e allegalo alle tue candidature.',
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
  const cur = getCurrencyForLocale(locale);
  const content = productContent[locale];
  const priceValidUntil = `${new Date().getFullYear()}-12-31`;

  const essential = EMPLOYER_TIERS.essential[cur];
  const professional = EMPLOYER_TIERS.professional[cur];
  const executive = EMPLOYER_TIERS.executive[cur];

  const offers: ProductOffer[] = [
    {
      '@type': 'Offer',
      name: content.workerOfferName,
      description: content.workerOfferDescription,
      price: 0,
      priceCurrency: currency,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/${locale}/workers/`,
      isAccessibleForFree: true,
    },
    {
      '@type': 'Offer',
      name: `${EMPLOYER_TIERS.essential.name[locale]} — Employer`,
      description: `Per-assessment employer plan with ${EMPLOYER_TIERS.essential.references} references.`,
      price: essential.amount,
      priceCurrency: currency,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/${locale}/pricing/`,
    },
    {
      '@type': 'Offer',
      name: `${EMPLOYER_TIERS.professional.name[locale]} — Employer`,
      description: `Per-assessment employer plan with ${EMPLOYER_TIERS.professional.references} references.`,
      price: professional.amount,
      priceCurrency: currency,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/${locale}/pricing/`,
    },
    {
      '@type': 'Offer',
      name: `${EMPLOYER_TIERS.executive.name[locale]} — Employer`,
      description: `Per-assessment employer plan with ${EMPLOYER_TIERS.executive.references} references.`,
      price: executive.amount,
      priceCurrency: currency,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/${locale}/pricing/`,
    },
  ];

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
      lowPrice: 0,
      highPrice: executive.amount,
      offerCount: 4,
      offers,
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

/**
 * Service Schema for AEO/GEO (AI search engines)
 *
 * Helps AI search engines (Google AI Overviews, Perplexity, ChatGPT Search)
 * understand what Open HR does and generate accurate answers.
 */
export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  name: string;
  description: string;
  provider: { '@type': 'Organization'; name: string };
  serviceType: string;
  areaServed: string[];
  availableChannel: {
    '@type': 'ServiceChannel';
    serviceUrl: string;
    servicePhone?: string;
    availableLanguage: string[];
  };
}

const serviceDescriptions: Record<
  Locale,
  { name: string; description: string; serviceType: string }
> = {
  fr: {
    name: 'Open HR — Vérification de Références Professionnelles',
    description:
      "Open HR est une plateforme gratuite qui permet aux travailleurs de collecter des références professionnelles anonymes et vérifiées. Les références remplissent un questionnaire structuré conçu par des psychologues I-O, produisant un RefScore — une accréditation portable que les candidats peuvent joindre à leurs candidatures, profils LinkedIn et CV. Gratuit pour les travailleurs, toujours. Les employeurs paient par évaluation.",
    serviceType: 'Vérification et scoring de références professionnelles',
  },
  'en-GB': {
    name: 'Open HR — Professional Reference Verification',
    description:
      'Open HR is a free platform that enables workers to collect anonymous, verified professional references. References complete a structured questionnaire designed by I-O psychologists, producing a RefScore — a portable credential candidates can attach to job applications, LinkedIn profiles, and CVs. Free for workers, always. Employers pay per assessment.',
    serviceType: 'Professional reference verification and scoring',
  },
  'en-US': {
    name: 'Open HR — Professional Reference Verification',
    description:
      'Open HR is a free platform that enables workers to collect anonymous, verified professional references. References complete a structured questionnaire designed by I-O psychologists, producing a RefScore — a portable credential candidates can attach to job applications, LinkedIn profiles, and resumes. Free for workers, always. Employers pay per assessment.',
    serviceType: 'Professional reference verification and scoring',
  },
  de: {
    name: 'Open HR — Professionelle Referenzprüfung',
    description:
      'Open HR ist eine kostenlose Plattform, die es Arbeitnehmern ermöglicht, anonyme, verifizierte professionelle Referenzen zu sammeln. Referenzen füllen einen strukturierten Fragebogen aus, der von I-O-Psychologen entwickelt wurde, und erzeugen einen RefScore — eine tragbare Akkreditierung, die Kandidaten ihren Bewerbungen, LinkedIn-Profilen und Lebensläufen beifügen können. Kostenlos für Arbeitnehmer, immer. Arbeitgeber zahlen pro Bewertung.',
    serviceType: 'Professionelle Referenzprüfung und -bewertung',
  },
  es: {
    name: 'Open HR — Verificación de Referencias Profesionales',
    description:
      'Open HR es una plataforma gratuita que permite a los trabajadores recopilar referencias profesionales anónimas y verificadas. Las referencias completan un cuestionario estructurado diseñado por psicólogos I-O, produciendo un RefScore — una acreditación portátil que los candidatos pueden adjuntar a sus solicitudes de empleo, perfiles de LinkedIn y CVs. Gratis para trabajadores, siempre. Los empleadores pagan por evaluación.',
    serviceType: 'Verificación y puntuación de referencias profesionales',
  },
  it: {
    name: 'Open HR — Verifica Referenze Professionali',
    description:
      "Open HR è una piattaforma gratuita che consente ai lavoratori di raccogliere referenze professionali anonime e verificate. Le referenze completano un questionario strutturato progettato da psicologi I-O, producendo un RefScore — una credenziale portatile che i candidati possono allegare alle candidature, profili LinkedIn e CV. Gratuito per i lavoratori, sempre. I datori di lavoro pagano per valutazione.",
    serviceType: 'Verifica e valutazione di referenze professionali',
  },
};

export function generateServiceSchema(locale: Locale): ServiceSchema {
  const content = serviceDescriptions[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.name,
    description: content.description,
    provider: { '@type': 'Organization', name: 'Open HR' },
    serviceType: content.serviceType,
    areaServed: ['FR', 'GB', 'US', 'DE', 'ES', 'IT'],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE_URL}/${locale}/`,
      availableLanguage: ['French', 'English', 'German', 'Spanish', 'Italian'],
    },
  };
}

/**
 * Article Schema (for Insight articles)
 */
export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  datePublished: string;
  image?: string;
  author?: {
    '@type': 'Person';
    name: string;
    jobTitle?: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

export function generateArticleSchema(opts: {
  headline: string;
  description: string;
  datePublished: string;
  image?: string;
  authorName?: string;
  authorRole?: string;
  authorUrl?: string;
}): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    image: opts.image,
    author: opts.authorName
      ? {
          '@type': 'Person',
          name: opts.authorName,
          jobTitle: opts.authorRole,
          url: opts.authorUrl,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Open HR',
      url: BASE_URL,
    },
  };
}

/**
 * DefinedTerm Schema (for Glossary entries)
 *
 * @see https://schema.org/DefinedTerm
 * @see OPE-767
 */
export interface DefinedTermSchema {
  '@context': 'https://schema.org';
  '@type': 'DefinedTerm';
  name: string;
  description: string;
  inDefinedTermSet: {
    '@type': 'DefinedTermSet';
    name: string;
    url: string;
  };
  url: string;
}

export function generateDefinedTermSchema(opts: {
  term: string;
  definition: string;
  locale: Locale;
  slug: string;
}): DefinedTermSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: opts.term,
    description: opts.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Open HR — HR & People Science Glossary',
      url: `${BASE_URL}/${opts.locale}/insights/glossary/`,
    },
    url: `${BASE_URL}/${opts.locale}/insights/glossary/${opts.slug}/`,
  };
}

/**
 * ClaimReview Schema (for Myth vs. Fact entries)
 *
 * @see https://schema.org/ClaimReview
 * @see OPE-767
 */
export interface ClaimReviewSchema {
  '@context': 'https://schema.org';
  '@type': 'ClaimReview';
  url: string;
  claimReviewed: string;
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: number;
    worstRating: number;
    alternateName: string;
  };
  itemReviewed: {
    '@type': 'Claim';
    name: string;
    author?: {
      '@type': 'Organization';
      name: string;
    };
  };
}

export function generateClaimReviewSchema(opts: {
  claim: string;
  verdict: 'false' | 'mostly-false' | 'half-true' | 'mostly-true' | 'true';
  locale: Locale;
  slug: string;
}): ClaimReviewSchema {
  const verdictMap: Record<string, {rating: number; label: string}> = {
    false: {rating: 1, label: 'False'},
    'mostly-false': {rating: 2, label: 'Mostly False'},
    'half-true': {rating: 3, label: 'Half True'},
    'mostly-true': {rating: 4, label: 'Mostly True'},
    true: {rating: 5, label: 'True'},
  };
  const v = verdictMap[opts.verdict];
  return {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    url: `${BASE_URL}/${opts.locale}/insights/myth-vs-fact/${opts.slug}/`,
    claimReviewed: opts.claim,
    author: {
      '@type': 'Organization',
      name: 'Open HR',
      url: BASE_URL,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: v.rating,
      bestRating: 5,
      worstRating: 1,
      alternateName: v.label,
    },
    itemReviewed: {
      '@type': 'Claim',
      name: opts.claim,
    },
  };
}

/**
 * SoftwareApplication Schema
 *
 * For app store SEO — Android launching Q2 2026, iOS to follow.
 * Free for workers (price: 0).
 */
export interface SoftwareApplicationSchema {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    isAccessibleForFree: boolean;
  };
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

const softwareAppContent: Record<Locale, { description: string }> = {
  fr: {
    description:
      'Application gratuite pour collecter des références professionnelles vérifiées et obtenir votre RefScore — une accréditation portable pour vos candidatures.',
  },
  'en-GB': {
    description:
      'Free app to collect verified professional references and get your RefScore — a portable credential for job applications.',
  },
  'en-US': {
    description:
      'Free app to collect verified professional references and get your RefScore — a portable credential for job applications.',
  },
  de: {
    description:
      'Kostenlose App zum Sammeln verifizierter professioneller Referenzen und Erhalt Ihres RefScore — eine tragbare Akkreditierung für Bewerbungen.',
  },
  es: {
    description:
      'Aplicación gratuita para recopilar referencias profesionales verificadas y obtener tu RefScore — una acreditación portátil para solicitudes de empleo.',
  },
  it: {
    description:
      'App gratuita per raccogliere referenze professionali verificate e ottenere il tuo RefScore — una credenziale portatile per le candidature.',
  },
};

export function generateSoftwareApplicationSchema(locale: Locale): SoftwareApplicationSchema {
  const currencyMap: Record<Locale, string> = {
    fr: 'EUR',
    'en-GB': 'GBP',
    'en-US': 'USD',
    de: 'EUR',
    es: 'EUR',
    it: 'EUR',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Open HR',
    description: softwareAppContent[locale].description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Android, iOS, Web',
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: currencyMap[locale],
      isAccessibleForFree: true,
    },
    provider: {
      '@type': 'Organization',
      name: 'Open HR',
      url: BASE_URL,
    },
  };
}

export type Schema =
  | OrganizationSchema
  | WebSiteSchema
  | ProductSchema
  | FAQPageSchema
  | BreadcrumbListSchema
  | HowToSchema
  | ServiceSchema
  | ArticleSchema
  | DefinedTermSchema
  | ClaimReviewSchema
  | SoftwareApplicationSchema;

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
