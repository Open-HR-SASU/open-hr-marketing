/**
 * Insights Section i18n Labels
 *
 * UI chrome for the insight article listing and detail pages.
 * All content (titles, body, FAQ) comes from Sanity CMS.
 *
 * @i18n-tagged
 */
import type { Locale } from './config';

export interface InsightLabels {
  // Page headings
  insightsHeading: string;
  insightsSubheading: string;

  // Article detail
  tldrHeading: string;
  faqHeading: string;
  referencesHeading: string;
  reviewedBy: string;
  readMore: string;
  backToInsights: string;
  aboutTheAuthor: string;
  publishedOn: string;

  // Reading time
  readingTime: string;

  // Related terms
  relatedTermsHeading: string;

  // Empty state
  noArticles: string;
}

const labels: Record<Locale, InsightLabels> = {
  fr: {
    insightsHeading: 'Insights',
    insightsSubheading: 'Recherche et analyse fondees sur les donnees de la science des personnes.',
    tldrHeading: 'En bref',
    faqHeading: 'Questions frequentes',
    referencesHeading: 'References',
    reviewedBy: 'Relu par',
    readMore: 'Lire la suite',
    backToInsights: '\u2190 Retour aux Insights',
    aboutTheAuthor: "A propos de l'auteur",
    publishedOn: 'Publie le',
    readingTime: 'min de lecture',
    relatedTermsHeading: 'Termes associes',
    noArticles: 'Aucun article disponible pour le moment.',
  },
  'en-GB': {
    insightsHeading: 'Insights',
    insightsSubheading: 'Evidence-based research and analysis from people science.',
    tldrHeading: 'TL;DR',
    faqHeading: 'Frequently Asked Questions',
    referencesHeading: 'References',
    reviewedBy: 'Reviewed by',
    readMore: 'Read more',
    backToInsights: '\u2190 Back to Insights',
    aboutTheAuthor: 'About the Author',
    publishedOn: 'Published',
    readingTime: 'min read',
    relatedTermsHeading: 'Related Terms',
    noArticles: 'No articles available yet.',
  },
  'en-US': {
    insightsHeading: 'Insights',
    insightsSubheading: 'Evidence-based research and analysis from people science.',
    tldrHeading: 'TL;DR',
    faqHeading: 'Frequently Asked Questions',
    referencesHeading: 'References',
    reviewedBy: 'Reviewed by',
    readMore: 'Read more',
    backToInsights: '\u2190 Back to Insights',
    aboutTheAuthor: 'About the Author',
    publishedOn: 'Published',
    readingTime: 'min read',
    relatedTermsHeading: 'Related Terms',
    noArticles: 'No articles available yet.',
  },
  de: {
    insightsHeading: 'Insights',
    insightsSubheading: 'Evidenzbasierte Forschung und Analysen aus der People Science.',
    tldrHeading: 'Zusammenfassung',
    faqHeading: 'Haufig gestellte Fragen',
    referencesHeading: 'Literaturverzeichnis',
    reviewedBy: 'Gepruft von',
    readMore: 'Weiterlesen',
    backToInsights: '\u2190 Zuruck zu Insights',
    aboutTheAuthor: 'Uber den Autor',
    publishedOn: 'Veroffentlicht am',
    readingTime: 'Min. Lesezeit',
    relatedTermsHeading: 'Verwandte Begriffe',
    noArticles: 'Noch keine Artikel verfugbar.',
  },
  es: {
    insightsHeading: 'Insights',
    insightsSubheading: 'Investigacion y analisis basados en evidencia de la ciencia del personal.',
    tldrHeading: 'Resumen',
    faqHeading: 'Preguntas frecuentes',
    referencesHeading: 'Referencias',
    reviewedBy: 'Revisado por',
    readMore: 'Leer mas',
    backToInsights: '\u2190 Volver a Insights',
    aboutTheAuthor: 'Sobre el autor',
    publishedOn: 'Publicado el',
    readingTime: 'min de lectura',
    relatedTermsHeading: 'Terminos relacionados',
    noArticles: 'Aun no hay articulos disponibles.',
  },
  it: {
    insightsHeading: 'Insights',
    insightsSubheading: 'Ricerca e analisi basate su evidenze dalla scienza delle persone.',
    tldrHeading: 'In breve',
    faqHeading: 'Domande frequenti',
    referencesHeading: 'Riferimenti',
    reviewedBy: 'Revisionato da',
    readMore: 'Leggi di piu',
    backToInsights: '\u2190 Torna agli Insights',
    aboutTheAuthor: "Sull'autore",
    publishedOn: 'Pubblicato il',
    readingTime: 'min di lettura',
    relatedTermsHeading: 'Termini correlati',
    noArticles: 'Nessun articolo disponibile al momento.',
  },
};

export function getInsightLabels(locale: Locale): InsightLabels {
  return labels[locale] ?? labels['en-GB'];
}
