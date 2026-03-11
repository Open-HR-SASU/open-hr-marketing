/**
 * Content Series i18n Labels
 *
 * UI chrome for the 5 daily content series listing pages.
 * All article content comes from Sanity CMS.
 *
 * @see OPE-767
 * @i18n-tagged
 */
import type { Locale } from './config';
import type { SeriesType } from '@/lib/sanity';

export interface SeriesLabels {
  heading: string;
  subheading: string;
  noArticles: string;
  backToInsights: string;
  badgeLabel: string;
  tldrLabel: string;
}

export interface SeriesConfig {
  slug: string;
  labels: Record<Locale, SeriesLabels>;
}

export const seriesConfigs: Record<Exclude<SeriesType, 'pillar'>, SeriesConfig> = {
  glossary: {
    slug: 'glossary',
    labels: {
      fr: {
        heading: 'Glossaire RH & People Science',
        subheading: 'Définitions claires des termes essentiels en ressources humaines et science des personnes.',
        noArticles: 'Aucune définition disponible pour le moment.',
        backToInsights: '\u2190 Retour aux Insights',
        badgeLabel: 'Glossaire',
        tldrLabel: 'Définition',
      },
      'en-GB': {
        heading: 'HR & People Science Glossary',
        subheading: 'Clear definitions of essential terms in human resources and people science.',
        noArticles: 'No definitions available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Glossary',
        tldrLabel: 'Definition',
      },
      'en-US': {
        heading: 'HR & People Science Glossary',
        subheading: 'Clear definitions of essential terms in human resources and people science.',
        noArticles: 'No definitions available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Glossary',
        tldrLabel: 'Definition',
      },
      de: {
        heading: 'HR & People Science Glossar',
        subheading: 'Klare Definitionen wichtiger Begriffe im Personalwesen und der People Science.',
        noArticles: 'Noch keine Definitionen verfügbar.',
        backToInsights: '\u2190 Zurück zu Insights',
        badgeLabel: 'Glossar',
        tldrLabel: 'Definition',
      },
      es: {
        heading: 'Glosario de RRHH y People Science',
        subheading: 'Definiciones claras de términos esenciales en recursos humanos y ciencia del personal.',
        noArticles: 'Aún no hay definiciones disponibles.',
        backToInsights: '\u2190 Volver a Insights',
        badgeLabel: 'Glosario',
        tldrLabel: 'Definición',
      },
      it: {
        heading: 'Glossario HR & People Science',
        subheading: 'Definizioni chiare dei termini essenziali nelle risorse umane e nella scienza delle persone.',
        noArticles: 'Nessuna definizione disponibile al momento.',
        backToInsights: '\u2190 Torna agli Insights',
        badgeLabel: 'Glossario',
        tldrLabel: 'Definizione',
      },
    },
  },
  'myth-vs-fact': {
    slug: 'myth-vs-fact',
    labels: {
      fr: {
        heading: 'Mythe vs. Réalité',
        subheading: 'Démystifier les idées reçues sur les références professionnelles, avec des preuves.',
        noArticles: 'Aucun article disponible pour le moment.',
        backToInsights: '\u2190 Retour aux Insights',
        badgeLabel: 'Mythe vs. Réalité',
        tldrLabel: 'Le Mythe',
      },
      'en-GB': {
        heading: 'Myth vs. Fact',
        subheading: 'Debunking common misconceptions about professional references, with evidence.',
        noArticles: 'No articles available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Myth vs. Fact',
        tldrLabel: 'The Myth',
      },
      'en-US': {
        heading: 'Myth vs. Fact',
        subheading: 'Debunking common misconceptions about professional references, with evidence.',
        noArticles: 'No articles available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Myth vs. Fact',
        tldrLabel: 'The Myth',
      },
      de: {
        heading: 'Mythos vs. Fakt',
        subheading: 'Häufige Missverständnisse über professionelle Referenzen mit Belegen widerlegt.',
        noArticles: 'Noch keine Artikel verfügbar.',
        backToInsights: '\u2190 Zurück zu Insights',
        badgeLabel: 'Mythos vs. Fakt',
        tldrLabel: 'Der Mythos',
      },
      es: {
        heading: 'Mito vs. Realidad',
        subheading: 'Desmintiendo conceptos erróneos comunes sobre las referencias profesionales, con evidencia.',
        noArticles: 'Aún no hay artículos disponibles.',
        backToInsights: '\u2190 Volver a Insights',
        badgeLabel: 'Mito vs. Realidad',
        tldrLabel: 'El Mito',
      },
      it: {
        heading: 'Mito vs. Realtà',
        subheading: 'Sfatare i malintesi comuni sulle referenze professionali, con prove.',
        noArticles: 'Nessun articolo disponibile al momento.',
        backToInsights: '\u2190 Torna agli Insights',
        badgeLabel: 'Mito vs. Realtà',
        tldrLabel: 'Il Mito',
      },
    },
  },
  compliance: {
    slug: 'compliance',
    labels: {
      fr: {
        heading: 'Fiches Conformité',
        subheading: 'Références professionnelles et droit du travail par pays et région.',
        noArticles: 'Aucune fiche disponible pour le moment.',
        backToInsights: '\u2190 Retour aux Insights',
        badgeLabel: 'Fiche Conformité',
        tldrLabel: 'Point Clé',
      },
      'en-GB': {
        heading: 'Compliance Briefs',
        subheading: 'Employment references and labour law by country and region.',
        noArticles: 'No briefs available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Compliance Brief',
        tldrLabel: 'Key Takeaway',
      },
      'en-US': {
        heading: 'Compliance Briefs',
        subheading: 'Employment references and labor law by country and region.',
        noArticles: 'No briefs available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Compliance Brief',
        tldrLabel: 'Key Takeaway',
      },
      de: {
        heading: 'Compliance-Briefings',
        subheading: 'Arbeitszeugnisse und Arbeitsrecht nach Land und Region.',
        noArticles: 'Noch keine Briefings verfügbar.',
        backToInsights: '\u2190 Zurück zu Insights',
        badgeLabel: 'Compliance-Briefing',
        tldrLabel: 'Kernaussage',
      },
      es: {
        heading: 'Informes de Cumplimiento',
        subheading: 'Referencias laborales y legislación laboral por país y región.',
        noArticles: 'Aún no hay informes disponibles.',
        backToInsights: '\u2190 Volver a Insights',
        badgeLabel: 'Informe de Cumplimiento',
        tldrLabel: 'Punto Clave',
      },
      it: {
        heading: 'Note di Conformità',
        subheading: 'Referenze professionali e diritto del lavoro per paese e regione.',
        noArticles: 'Nessuna nota disponibile al momento.',
        backToInsights: '\u2190 Torna agli Insights',
        badgeLabel: 'Nota di Conformità',
        tldrLabel: 'Punto Chiave',
      },
    },
  },
  'research-digest': {
    slug: 'research',
    labels: {
      fr: {
        heading: 'Digest Recherche',
        subheading: 'Ce que dit la science sur les références professionnelles et l\'évaluation des talents.',
        noArticles: 'Aucun digest disponible pour le moment.',
        backToInsights: '\u2190 Retour aux Insights',
        badgeLabel: 'Digest Recherche',
        tldrLabel: 'En Bref',
      },
      'en-GB': {
        heading: 'Research Digest',
        subheading: 'What the science says about professional references and talent assessment.',
        noArticles: 'No digests available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Research Digest',
        tldrLabel: 'TL;DR',
      },
      'en-US': {
        heading: 'Research Digest',
        subheading: 'What the science says about professional references and talent assessment.',
        noArticles: 'No digests available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Research Digest',
        tldrLabel: 'TL;DR',
      },
      de: {
        heading: 'Forschungs-Digest',
        subheading: 'Was die Wissenschaft über professionelle Referenzen und Talentbewertung sagt.',
        noArticles: 'Noch keine Digests verfügbar.',
        backToInsights: '\u2190 Zurück zu Insights',
        badgeLabel: 'Forschungs-Digest',
        tldrLabel: 'Kurzfassung',
      },
      es: {
        heading: 'Resumen de Investigación',
        subheading: 'Lo que dice la ciencia sobre las referencias profesionales y la evaluación del talento.',
        noArticles: 'Aún no hay resúmenes disponibles.',
        backToInsights: '\u2190 Volver a Insights',
        badgeLabel: 'Resumen de Investigación',
        tldrLabel: 'En Resumen',
      },
      it: {
        heading: 'Digest Ricerca',
        subheading: 'Cosa dice la scienza sulle referenze professionali e la valutazione dei talenti.',
        noArticles: 'Nessun digest disponibile al momento.',
        backToInsights: '\u2190 Torna agli Insights',
        badgeLabel: 'Digest Ricerca',
        tldrLabel: 'In Breve',
      },
    },
  },
  faq: {
    slug: 'faq',
    labels: {
      fr: {
        heading: 'Demandez à Open HR',
        subheading: 'Réponses aux questions les plus fréquentes sur les références professionnelles.',
        noArticles: 'Aucune réponse disponible pour le moment.',
        backToInsights: '\u2190 Retour aux Insights',
        badgeLabel: 'Demandez à Open HR',
        tldrLabel: 'Réponse Rapide',
      },
      'en-GB': {
        heading: 'Ask Open HR',
        subheading: 'Answers to the most common questions about professional references.',
        noArticles: 'No answers available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Ask Open HR',
        tldrLabel: 'Quick Answer',
      },
      'en-US': {
        heading: 'Ask Open HR',
        subheading: 'Answers to the most common questions about professional references.',
        noArticles: 'No answers available yet.',
        backToInsights: '\u2190 Back to Insights',
        badgeLabel: 'Ask Open HR',
        tldrLabel: 'Quick Answer',
      },
      de: {
        heading: 'Fragen Sie Open HR',
        subheading: 'Antworten auf die häufigsten Fragen zu professionellen Referenzen.',
        noArticles: 'Noch keine Antworten verfügbar.',
        backToInsights: '\u2190 Zurück zu Insights',
        badgeLabel: 'Fragen Sie Open HR',
        tldrLabel: 'Schnelle Antwort',
      },
      es: {
        heading: 'Pregunte a Open HR',
        subheading: 'Respuestas a las preguntas más frecuentes sobre las referencias profesionales.',
        noArticles: 'Aún no hay respuestas disponibles.',
        backToInsights: '\u2190 Volver a Insights',
        badgeLabel: 'Pregunte a Open HR',
        tldrLabel: 'Respuesta Rápida',
      },
      it: {
        heading: 'Chiedi a Open HR',
        subheading: 'Risposte alle domande più frequenti sulle referenze professionali.',
        noArticles: 'Nessuna risposta disponibile al momento.',
        backToInsights: '\u2190 Torna agli Insights',
        badgeLabel: 'Chiedi a Open HR',
        tldrLabel: 'Risposta Rapida',
      },
    },
  },
};

export function getSeriesLabels(
  seriesType: Exclude<SeriesType, 'pillar'>,
  locale: Locale
): SeriesLabels {
  return seriesConfigs[seriesType].labels[locale] ?? seriesConfigs[seriesType].labels['en-GB'];
}

export function getSeriesSlug(seriesType: Exclude<SeriesType, 'pillar'>): string {
  return seriesConfigs[seriesType].slug;
}
