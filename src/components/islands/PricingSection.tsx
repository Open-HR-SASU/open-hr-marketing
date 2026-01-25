/**
 * Pricing Section (React Island)
 *
 * Interactive pricing display with monthly/annual toggle.
 * Uses client:load for immediate hydration.
 *
 * Note: This is a simplified version. Full Stripe integration
 * should be added when connecting to payment flows.
 */

import { useState } from 'react';

type Locale = 'fr' | 'en-GB' | 'en-US' | 'de' | 'es' | 'it';

interface PricingSectionProps {
  locale: Locale;
}

// Pricing data
const PRICING = {
  refscore: {
    monthly: 9.99,
    annualMonthly: 7.99, // Monthly equivalent when paying annually
    annualTotal: 95.88,
  },
  refscoreVerified: {
    monthly: 19.99,
    annualMonthly: 15.99,
    annualTotal: 191.88,
  },
};

// Localized content
const content: Record<Locale, {
  toggle: { monthly: string; annual: string; discount: string };
  tiers: {
    refscore: { name: string; description: string; features: string[]; cta: string };
    refscoreVerified: { name: string; description: string; features: string[]; cta: string };
  };
  perMonth: string;
  billedAnnually: string;
}> = {
  fr: {
    toggle: { monthly: 'Mensuel', annual: 'Annuel', discount: '-20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'Pour les individus qui construisent leur carriere.',
        features: [
          'Jusqu\'a 5 references verifiees',
          'Verification du parcours professionnel',
          'Lien de profil partageable',
          'Support par email',
        ],
        cta: 'Commencer gratuitement',
      },
      refscoreVerified: {
        name: 'RefScore Verifie',
        description: 'Pour les professionnels qui veulent se demarquer.',
        features: [
          'References verifiees illimitees',
          'Profil detaille de vos competences',
          'Verification prioritaire (24h)',
          'Support prioritaire',
          'Rapports avances',
        ],
        cta: 'Obtenir RefScore Verifie',
      },
    },
    perMonth: '/mois',
    billedAnnually: 'Facture annuellement',
  },
  'en-GB': {
    toggle: { monthly: 'Monthly', annual: 'Annual', discount: 'Save 20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'For individuals building their career.',
        features: [
          'Up to 5 verified references',
          'Work history verification',
          'Shareable profile link',
          'Email support',
        ],
        cta: 'Start Free',
      },
      refscoreVerified: {
        name: 'RefScore Verified',
        description: 'For professionals who want the complete picture.',
        features: [
          'Unlimited verified references',
          'Detailed skills profile',
          'Priority verification (24h)',
          'Priority support',
          'Advanced reporting',
        ],
        cta: 'Get RefScore Verified',
      },
    },
    perMonth: '/month',
    billedAnnually: 'Billed annually',
  },
  'en-US': {
    toggle: { monthly: 'Monthly', annual: 'Annual', discount: 'Save 20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'For individuals building their career.',
        features: [
          'Up to 5 verified references',
          'Work history verification',
          'Shareable profile link',
          'Email support',
        ],
        cta: 'Start Free',
      },
      refscoreVerified: {
        name: 'RefScore Verified',
        description: 'For professionals who want the full picture.',
        features: [
          'Unlimited verified references',
          'Detailed skills profile',
          'Priority verification (24h)',
          'Priority support',
          'Advanced reporting',
        ],
        cta: 'Get RefScore Verified',
      },
    },
    perMonth: '/month',
    billedAnnually: 'Billed annually',
  },
  de: {
    toggle: { monthly: 'Monatlich', annual: 'Jahrlich', discount: '-20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'Fur Einzelpersonen, die ihre Karriere aufbauen.',
        features: [
          'Bis zu 5 verifizierte Referenzen',
          'Uberprufung des Berufswegs',
          'Teilbarer Profillink',
          'E-Mail-Support',
        ],
        cta: 'Kostenlos starten',
      },
      refscoreVerified: {
        name: 'RefScore Verifiziert',
        description: 'Fur Fachleute, die das vollstandige Bild wollen.',
        features: [
          'Unbegrenzte verifizierte Referenzen',
          'Detailliertes Kompetenzprofil',
          'Prioritats-Verifizierung (24h)',
          'Prioritats-Support',
          'Erweiterte Berichte',
        ],
        cta: 'RefScore Verifiziert erhalten',
      },
    },
    perMonth: '/Monat',
    billedAnnually: 'Jahrlich abgerechnet',
  },
  es: {
    toggle: { monthly: 'Mensual', annual: 'Anual', discount: '-20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'Para quienes construyen su carrera.',
        features: [
          'Hasta 5 referencias verificadas',
          'Verificacion del historial laboral',
          'Enlace de perfil compartible',
          'Soporte por email',
        ],
        cta: 'Empezar gratis',
      },
      refscoreVerified: {
        name: 'RefScore Verificado',
        description: 'Para profesionales que quieren el panorama completo.',
        features: [
          'Referencias verificadas ilimitadas',
          'Perfil detallado de habilidades',
          'Verificacion prioritaria (24h)',
          'Soporte prioritario',
          'Informes avanzados',
        ],
        cta: 'Obtener RefScore Verificado',
      },
    },
    perMonth: '/mes',
    billedAnnually: 'Facturado anualmente',
  },
  it: {
    toggle: { monthly: 'Mensile', annual: 'Annuale', discount: '-20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'Per chi costruisce la propria carriera.',
        features: [
          'Fino a 5 referenze verificate',
          'Verifica della storia lavorativa',
          'Link profilo condivisibile',
          'Supporto via email',
        ],
        cta: 'Inizia gratis',
      },
      refscoreVerified: {
        name: 'RefScore Verificato',
        description: 'Per professionisti che vogliono il quadro completo.',
        features: [
          'Referenze verificate illimitate',
          'Profilo dettagliato delle competenze',
          'Verifica prioritaria (24h)',
          'Supporto prioritario',
          'Report avanzati',
        ],
        cta: 'Ottieni RefScore Verificato',
      },
    },
    perMonth: '/mese',
    billedAnnually: 'Fatturato annualmente',
  },
};

function formatPrice(amount: number, locale: Locale): string {
  const currency = locale === 'en-US' ? 'USD' : locale === 'en-GB' ? 'GBP' : 'EUR';
  const localeCode = locale === 'en-US' ? 'en-US' : locale === 'en-GB' ? 'en-GB' : locale === 'de' ? 'de-DE' : locale === 'es' ? 'es-ES' : locale === 'it' ? 'it-IT' : 'fr-FR';

  return new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function PricingSection({ locale }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const t = content[locale] || content['en-US'];

  const refscorePrice = isAnnual ? PRICING.refscore.annualMonthly : PRICING.refscore.monthly;
  const refscoreVerifiedPrice = isAnnual ? PRICING.refscoreVerified.annualMonthly : PRICING.refscoreVerified.monthly;

  return (
    <div className="py-12">
      {/* Toggle */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setIsAnnual(false)}
          className={`min-h-[44px] rounded-full px-6 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-openhr-teal-900 focus:ring-offset-2 ${
            !isAnnual
              ? 'bg-openhr-teal-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t.toggle.monthly}
        </button>
        <button
          type="button"
          onClick={() => setIsAnnual(true)}
          className={`flex min-h-[44px] items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-openhr-teal-900 focus:ring-offset-2 ${
            isAnnual
              ? 'bg-openhr-teal-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t.toggle.annual}
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              isAnnual
                ? 'bg-openhr-teal-700 text-white'
                : 'bg-openhr-teal-50 text-openhr-teal-700'
            }`}
          >
            {t.toggle.discount}
          </span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {/* RefScore */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">{t.tiers.refscore.name}</h3>
          <p className="mt-2 text-gray-600">{t.tiers.refscore.description}</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(refscorePrice, locale)}
            </span>
            <span className="text-gray-600">{t.perMonth}</span>
            {isAnnual && (
              <p className="mt-1 text-sm text-gray-500">{t.billedAnnually}</p>
            )}
          </div>
          <ul className="mt-8 space-y-4">
            {t.tiers.refscore.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-openhr-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <a
            href={`/${locale}/pilot/`}
            className="mt-8 block w-full rounded-lg border border-openhr-teal-900 bg-white px-4 py-3 text-center font-medium text-openhr-teal-900 transition-colors hover:bg-openhr-teal-50"
          >
            {t.tiers.refscore.cta}
          </a>
        </div>

        {/* RefScore Verified */}
        <div className="relative rounded-2xl border-2 border-openhr-teal-900 bg-white p-8 shadow-lg">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-openhr-teal-900 px-4 py-1 text-sm font-medium text-white">
            {locale === 'fr' ? 'Populaire' : locale === 'de' ? 'Beliebt' : locale === 'es' ? 'Popular' : locale === 'it' ? 'Popolare' : 'Popular'}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{t.tiers.refscoreVerified.name}</h3>
          <p className="mt-2 text-gray-600">{t.tiers.refscoreVerified.description}</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(refscoreVerifiedPrice, locale)}
            </span>
            <span className="text-gray-600">{t.perMonth}</span>
            {isAnnual && (
              <p className="mt-1 text-sm text-gray-500">{t.billedAnnually}</p>
            )}
          </div>
          <ul className="mt-8 space-y-4">
            {t.tiers.refscoreVerified.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-openhr-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <a
            href={`/${locale}/pilot/`}
            className="mt-8 block w-full rounded-lg bg-openhr-teal-900 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-openhr-teal-800"
          >
            {t.tiers.refscoreVerified.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
