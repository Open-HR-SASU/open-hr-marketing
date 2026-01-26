/**
 * Legal Page i18n Labels
 *
 * UI text for legal document rendering.
 * All content comes from Sanity CMS; these are UI chrome labels only.
 *
 * @i18n-tagged
 */
import type { Locale } from './config';

export interface LegalLabels {
  // Version badge
  version: string;
  effectiveDate: string;
  lastUpdated: string;

  // Quick summary
  quickSummaryDefault: string;

  // Table of Contents
  tableOfContents: string;

  // Section states
  expandSection: string;
  collapseSection: string;

  // Contact card
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;

  // Footer
  documentReference: string;

  // Fallback content
  contentUnavailable: string;
  backToHome: string;

  // Status badges
  statusDraft: string;
  statusReview: string;
  statusActive: string;
  statusArchived: string;
}

/**
 * Legal page labels by locale
 * @i18n-tagged - All string values require translation
 */
export const legalLabels: Record<Locale, LegalLabels> = {
  fr: {
    version: 'Version',
    effectiveDate: 'En vigueur depuis',
    lastUpdated: 'Derniere mise a jour',
    quickSummaryDefault: 'En bref',
    tableOfContents: 'Sommaire',
    expandSection: 'Developper la section',
    collapseSection: 'Reduire la section',
    contactEmail: 'Email',
    contactPhone: 'Telephone',
    contactWebsite: 'Site web',
    documentReference: 'Reference legale',
    contentUnavailable: 'Le contenu de cette page sera bientot disponible.',
    backToHome: "Retour a l'accueil",
    statusDraft: 'Brouillon',
    statusReview: 'En revision',
    statusActive: 'En vigueur',
    statusArchived: 'Archive',
  },
  'en-GB': {
    version: 'Version',
    effectiveDate: 'Effective from',
    lastUpdated: 'Last updated',
    quickSummaryDefault: 'In brief',
    tableOfContents: 'Contents',
    expandSection: 'Expand section',
    collapseSection: 'Collapse section',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactWebsite: 'Website',
    documentReference: 'Legal reference',
    contentUnavailable: 'The content of this page will be available soon.',
    backToHome: 'Back to Home',
    statusDraft: 'Draft',
    statusReview: 'In review',
    statusActive: 'Active',
    statusArchived: 'Archived',
  },
  'en-US': {
    version: 'Version',
    effectiveDate: 'Effective from',
    lastUpdated: 'Last updated',
    quickSummaryDefault: 'In brief',
    tableOfContents: 'Contents',
    expandSection: 'Expand section',
    collapseSection: 'Collapse section',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactWebsite: 'Website',
    documentReference: 'Legal reference',
    contentUnavailable: 'The content of this page will be available soon.',
    backToHome: 'Back to Home',
    statusDraft: 'Draft',
    statusReview: 'In review',
    statusActive: 'Active',
    statusArchived: 'Archived',
  },
  de: {
    version: 'Version',
    effectiveDate: 'Gultig ab',
    lastUpdated: 'Zuletzt aktualisiert',
    quickSummaryDefault: 'Auf einen Blick',
    tableOfContents: 'Inhalt',
    expandSection: 'Abschnitt erweitern',
    collapseSection: 'Abschnitt reduzieren',
    contactEmail: 'E-Mail',
    contactPhone: 'Telefon',
    contactWebsite: 'Webseite',
    documentReference: 'Rechtsgrundlage',
    contentUnavailable: 'Der Inhalt dieser Seite wird in Kurze verfugbar sein.',
    backToHome: 'Zuruck zur Startseite',
    statusDraft: 'Entwurf',
    statusReview: 'In Prufung',
    statusActive: 'Aktiv',
    statusArchived: 'Archiviert',
  },
  es: {
    version: 'Version',
    effectiveDate: 'Vigente desde',
    lastUpdated: 'Ultima actualizacion',
    quickSummaryDefault: 'En resumen',
    tableOfContents: 'Indice',
    expandSection: 'Expandir seccion',
    collapseSection: 'Contraer seccion',
    contactEmail: 'Correo electronico',
    contactPhone: 'Telefono',
    contactWebsite: 'Sitio web',
    documentReference: 'Referencia legal',
    contentUnavailable: 'El contenido de esta pagina estara disponible pronto.',
    backToHome: 'Volver al inicio',
    statusDraft: 'Borrador',
    statusReview: 'En revision',
    statusActive: 'Vigente',
    statusArchived: 'Archivado',
  },
  it: {
    version: 'Versione',
    effectiveDate: 'In vigore dal',
    lastUpdated: 'Ultimo aggiornamento',
    quickSummaryDefault: 'In breve',
    tableOfContents: 'Indice',
    expandSection: 'Espandi sezione',
    collapseSection: 'Riduci sezione',
    contactEmail: 'Email',
    contactPhone: 'Telefono',
    contactWebsite: 'Sito web',
    documentReference: 'Riferimento legale',
    contentUnavailable: 'Il contenuto di questa pagina sara disponibile a breve.',
    backToHome: 'Torna alla home',
    statusDraft: 'Bozza',
    statusReview: 'In revisione',
    statusActive: 'Attivo',
    statusArchived: 'Archiviato',
  },
};

/**
 * Get legal labels for a locale
 */
export function getLegalLabels(locale: Locale): LegalLabels {
  return legalLabels[locale];
}
