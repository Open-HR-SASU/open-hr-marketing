/**
 * Resource Library i18n Labels
 *
 * UI chrome for the downloadable resource library and detail pages.
 * All content (titles, descriptions) comes from Sanity CMS.
 *
 * @i18n-tagged
 */
import type { Locale } from './config';

export interface ResourceLabels {
  // Page headings
  libraryHeading: string;
  librarySubheading: string;

  // Resource type badges
  typeWhitepaper: string;
  typeCaseStudy: string;
  typeTechnicalGuide: string;
  typeIndustryReport: string;
  typeProductSheet: string;
  typePressRelease: string;

  // Metadata labels
  pages: string;
  published: string;
  by: string;

  // CTA
  downloadFree: string;
  downloadPdf: string;
  backToResources: string;

  // Empty state
  noResources: string;

  // Accessibility
  downloadAriaLabel: string;
}

const labels: Record<Locale, ResourceLabels> = {
  fr: {
    libraryHeading: 'Ressources',
    librarySubheading: 'Recherches, guides et analyses de la science des personnes.',
    typeWhitepaper: 'Livre blanc',
    typeCaseStudy: "Étude de cas",
    typeTechnicalGuide: 'Guide technique',
    typeIndustryReport: "Rapport sectoriel",
    typeProductSheet: 'Fiche produit',
    typePressRelease: 'Communiqué de presse',
    pages: 'pages',
    published: 'Publié le',
    by: 'Par',
    downloadFree: 'Télécharger gratuitement (PDF)',
    downloadPdf: 'Télécharger le PDF',
    backToResources: '← Retour aux ressources',
    noResources: 'Aucune ressource disponible pour le moment.',
    downloadAriaLabel: 'Télécharger',
  },
  'en-GB': {
    libraryHeading: 'Resources',
    librarySubheading: 'Research, guides and people science analysis.',
    typeWhitepaper: 'White Paper',
    typeCaseStudy: 'Case Study',
    typeTechnicalGuide: 'Technical Guide',
    typeIndustryReport: 'Industry Report',
    typeProductSheet: 'Product Sheet',
    typePressRelease: 'Press Release',
    pages: 'pages',
    published: 'Published',
    by: 'By',
    downloadFree: 'Download Free (PDF)',
    downloadPdf: 'Download PDF',
    backToResources: '← Back to Resources',
    noResources: 'No resources available yet.',
    downloadAriaLabel: 'Download',
  },
  'en-US': {
    libraryHeading: 'Resources',
    librarySubheading: 'Research, guides and people science analysis.',
    typeWhitepaper: 'White Paper',
    typeCaseStudy: 'Case Study',
    typeTechnicalGuide: 'Technical Guide',
    typeIndustryReport: 'Industry Report',
    typeProductSheet: 'Product Sheet',
    typePressRelease: 'Press Release',
    pages: 'pages',
    published: 'Published',
    by: 'By',
    downloadFree: 'Download Free (PDF)',
    downloadPdf: 'Download PDF',
    backToResources: '← Back to Resources',
    noResources: 'No resources available yet.',
    downloadAriaLabel: 'Download',
  },
  de: {
    libraryHeading: 'Ressourcen',
    librarySubheading: 'Forschung, Leitfäden und People-Science-Analysen.',
    typeWhitepaper: 'Whitepaper',
    typeCaseStudy: 'Fallstudie',
    typeTechnicalGuide: 'Technischer Leitfaden',
    typeIndustryReport: 'Branchenbericht',
    typeProductSheet: 'Produktblatt',
    typePressRelease: 'Pressemitteilung',
    pages: 'Seiten',
    published: 'Veröffentlicht am',
    by: 'Von',
    downloadFree: 'Kostenlos herunterladen (PDF)',
    downloadPdf: 'PDF herunterladen',
    backToResources: '← Zurück zu Ressourcen',
    noResources: 'Noch keine Ressourcen verfügbar.',
    downloadAriaLabel: 'Herunterladen',
  },
  es: {
    libraryHeading: 'Recursos',
    librarySubheading: 'Investigación, guías y análisis de ciencias del personal.',
    typeWhitepaper: 'Libro blanco',
    typeCaseStudy: 'Caso de estudio',
    typeTechnicalGuide: 'Guía técnica',
    typeIndustryReport: 'Informe sectorial',
    typeProductSheet: 'Ficha de producto',
    typePressRelease: 'Comunicado de prensa',
    pages: 'páginas',
    published: 'Publicado el',
    by: 'Por',
    downloadFree: 'Descargar gratis (PDF)',
    downloadPdf: 'Descargar PDF',
    backToResources: '← Volver a Recursos',
    noResources: 'Aún no hay recursos disponibles.',
    downloadAriaLabel: 'Descargar',
  },
  it: {
    libraryHeading: 'Risorse',
    librarySubheading: 'Ricerca, guide e analisi della scienza delle persone.',
    typeWhitepaper: 'White Paper',
    typeCaseStudy: 'Caso di studio',
    typeTechnicalGuide: 'Guida tecnica',
    typeIndustryReport: 'Rapporto di settore',
    typeProductSheet: 'Scheda prodotto',
    typePressRelease: 'Comunicato stampa',
    pages: 'pagine',
    published: 'Pubblicato il',
    by: 'Di',
    downloadFree: 'Scarica gratis (PDF)',
    downloadPdf: 'Scarica PDF',
    backToResources: '← Torna alle risorse',
    noResources: 'Nessuna risorsa disponibile al momento.',
    downloadAriaLabel: 'Scarica',
  },
}

export function getResourceLabels(locale: Locale): ResourceLabels {
  return labels[locale] ?? labels['en-GB']
}
