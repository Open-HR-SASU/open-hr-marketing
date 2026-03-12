/**
 * Employer Pricing Section (React Island) — Per-Assessment Model
 *
 * Three-tier pricing: Essential / Professional / Executive.
 * Per-assessment pricing, not subscription.
 *
 * @see OPE-778 - Employer B2B Portal
 * @see 00-MASTER-SCOPE.md - Pricing architecture
 */

import {
  EMPLOYER_TIERS,
  formatPerAssessmentPrice,
  getCurrencyForLocale,
  type Locale,
  type EmployerTier,
} from '@/lib/pricing';

interface EmployerPricingSectionProps {
  locale: Locale;
}

const content: Record<Locale, {
  perAssessment: string;
  references: string;
  confidence: string;
  cta: string;
  popular: string;
  volumeNote: string;
  tiers: Record<EmployerTier, {
    description: string;
    features: string[];
  }>;
}> = {
  fr: {
    perAssessment: '/evaluation',
    references: 'references',
    confidence: 'Confiance',
    cta: 'Commencer',
    popular: 'Le plus populaire',
    volumeNote: 'Remises volume disponibles pour 10+ evaluations.',
    tiers: {
      essential: {
        description: 'RefScore et grade global. Ideal pour le recrutement standard.',
        features: [
          'RefScore et grade global',
          '4 notes par categorie',
          'Certificat RefScore',
          'Verification d\'identite Yoti',
        ],
      },
      professional: {
        description: 'Analyse approfondie pour des decisions d\'embauche eclairees.',
        features: [
          'Tout dans Essentiel',
          'Top 5 des points forts',
          'Triangulation des sources',
          'Tendances dimensionnelles',
          'Rapport employeur',
        ],
      },
      executive: {
        description: 'Evaluation complete pour les postes strategiques.',
        features: [
          'Tout dans Professionnel',
          '18 dimensions detaillees',
          'Concordance des references',
          'Questions d\'entretien suggerees',
          'Support dedie',
        ],
      },
    },
  },
  'en-GB': {
    perAssessment: '/assessment',
    references: 'references',
    confidence: 'Confidence',
    cta: 'Get Started',
    popular: 'Most Popular',
    volumeNote: 'Volume discounts available for 10+ assessments.',
    tiers: {
      essential: {
        description: 'RefScore grade and category overview. Ideal for standard hiring.',
        features: [
          'RefScore grade',
          '4 category stanines',
          'RefScore Certificate',
          'Yoti identity verification',
        ],
      },
      professional: {
        description: 'Deep analysis for confident hiring decisions.',
        features: [
          'Everything in Essential',
          'Top 5 Strengths',
          'Source triangulation',
          'Dimensional patterns',
          'Employer report',
        ],
      },
      executive: {
        description: 'Comprehensive evaluation for strategic roles.',
        features: [
          'Everything in Professional',
          'Full 18-dimension breakdown',
          'Reference concordance',
          'Suggested interview probes',
          'Dedicated support',
        ],
      },
    },
  },
  'en-US': {
    perAssessment: '/assessment',
    references: 'references',
    confidence: 'Confidence',
    cta: 'Get Started',
    popular: 'Most Popular',
    volumeNote: 'Volume discounts available for 10+ assessments.',
    tiers: {
      essential: {
        description: 'RefScore grade and category overview. Ideal for standard hiring.',
        features: [
          'RefScore grade',
          '4 category stanines',
          'RefScore Certificate',
          'Yoti identity verification',
        ],
      },
      professional: {
        description: 'Deep analysis for confident hiring decisions.',
        features: [
          'Everything in Essential',
          'Top 5 Strengths',
          'Source triangulation',
          'Dimensional patterns',
          'Employer report',
        ],
      },
      executive: {
        description: 'Comprehensive evaluation for strategic roles.',
        features: [
          'Everything in Professional',
          'Full 18-dimension breakdown',
          'Reference concordance',
          'Suggested interview probes',
          'Dedicated support',
        ],
      },
    },
  },
  de: {
    perAssessment: '/Bewertung',
    references: 'Referenzen',
    confidence: 'Konfidenz',
    cta: 'Loslegen',
    popular: 'Am beliebtesten',
    volumeNote: 'Mengenrabatte ab 10 Bewertungen verfugbar.',
    tiers: {
      essential: {
        description: 'RefScore-Note und Kategorieubersicht. Ideal fur Standardeinstellungen.',
        features: [
          'RefScore-Note',
          '4 Kategorie-Stanine',
          'RefScore-Zertifikat',
          'Yoti-Identitatsverifizierung',
        ],
      },
      professional: {
        description: 'Tiefgehende Analyse fur fundierte Einstellungsentscheidungen.',
        features: [
          'Alles in Basis',
          'Top 5 Starken',
          'Quellentriangulation',
          'Dimensionsmuster',
          'Arbeitgeberbericht',
        ],
      },
      executive: {
        description: 'Umfassende Bewertung fur strategische Positionen.',
        features: [
          'Alles in Professionell',
          'Komplette 18-Dimensionen-Aufschlusselung',
          'Referenzubereinstimmung',
          'Vorgeschlagene Interviewfragen',
          'Dedizierter Support',
        ],
      },
    },
  },
  es: {
    perAssessment: '/evaluacion',
    references: 'referencias',
    confidence: 'Confianza',
    cta: 'Empezar',
    popular: 'Mas popular',
    volumeNote: 'Descuentos por volumen disponibles para 10+ evaluaciones.',
    tiers: {
      essential: {
        description: 'Grado RefScore y resumen por categorias. Ideal para contratacion estandar.',
        features: [
          'Grado RefScore',
          '4 stanines por categoria',
          'Certificado RefScore',
          'Verificacion de identidad Yoti',
        ],
      },
      professional: {
        description: 'Analisis profundo para decisiones de contratacion informadas.',
        features: [
          'Todo en Esencial',
          'Top 5 fortalezas',
          'Triangulacion de fuentes',
          'Patrones dimensionales',
          'Informe para empleador',
        ],
      },
      executive: {
        description: 'Evaluacion completa para roles estrategicos.',
        features: [
          'Todo en Profesional',
          'Desglose completo de 18 dimensiones',
          'Concordancia de referencias',
          'Preguntas de entrevista sugeridas',
          'Soporte dedicado',
        ],
      },
    },
  },
  it: {
    perAssessment: '/valutazione',
    references: 'referenze',
    confidence: 'Confidenza',
    cta: 'Inizia',
    popular: 'Piu popolare',
    volumeNote: 'Sconti volume disponibili per 10+ valutazioni.',
    tiers: {
      essential: {
        description: 'Grado RefScore e panoramica per categorie. Ideale per assunzioni standard.',
        features: [
          'Grado RefScore',
          '4 stanine per categoria',
          'Certificato RefScore',
          'Verifica identita Yoti',
        ],
      },
      professional: {
        description: 'Analisi approfondita per decisioni di assunzione consapevoli.',
        features: [
          'Tutto in Essenziale',
          'Top 5 punti di forza',
          'Triangolazione fonti',
          'Pattern dimensionali',
          'Report datore di lavoro',
        ],
      },
      executive: {
        description: 'Valutazione completa per ruoli strategici.',
        features: [
          'Tutto in Professionale',
          'Analisi completa 18 dimensioni',
          'Concordanza referenze',
          'Domande colloquio suggerite',
          'Supporto dedicato',
        ],
      },
    },
  },
};

const tierOrder: EmployerTier[] = ['essential', 'professional', 'executive'];

export function EmployerPricingSection({ locale }: EmployerPricingSectionProps) {
  const t = content[locale] || content['en-GB'];
  const currency = getCurrencyForLocale(locale);
  const signupUrl = 'https://app.open-hr.work/employer/auth/signup';

  return (
    <div className="py-12">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
        {tierOrder.map((tierKey) => {
          const tier = EMPLOYER_TIERS[tierKey];
          const tierContent = t.tiers[tierKey];
          const priceConfig = tier[currency];
          const isPopular = tier.isPopular;

          return (
            <div
              key={tierKey}
              className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ${
                isPopular
                  ? 'border-2 border-openhr-teal-900 shadow-lg'
                  : 'border border-gray-200'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-openhr-teal-900 px-4 py-1 text-sm font-semibold text-white">
                  {t.popular}
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900">
                {tier.name[locale]}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{tierContent.description}</p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPerAssessmentPrice(priceConfig.amount, locale)}
                </span>
                <span className="text-gray-600">{t.perAssessment}</span>
              </div>

              {/* Reference count + confidence */}
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="rounded-full bg-openhr-teal-50 px-3 py-1 font-medium text-openhr-teal-800">
                  {tier.references} {t.references}
                </span>
                <span className="text-gray-500">
                  {t.confidence} {tier.confidence}
                </span>
              </div>

              {/* Features */}
              <ul className="mt-8 flex-grow space-y-3">
                {tierContent.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-openhr-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`${signupUrl}?tier=${tierKey}`}
                className={`mt-8 block w-full rounded-lg px-4 py-3 text-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-openhr-teal-500 focus:ring-offset-2 ${
                  isPopular
                    ? 'bg-openhr-teal-900 text-white hover:bg-openhr-teal-800'
                    : 'border border-openhr-teal-900 bg-white text-openhr-teal-900 hover:bg-openhr-teal-50'
                }`}
              >
                {t.cta}
              </a>
            </div>
          );
        })}
      </div>

      {/* Volume discount note */}
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500">
        {t.volumeNote}
      </p>
    </div>
  );
}

export default EmployerPricingSection;
