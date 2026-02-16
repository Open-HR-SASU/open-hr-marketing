/**
 * Pricing Section (React Island)
 *
 * Interactive pricing display with monthly/annual toggle.
 * Uses client:load for immediate hydration.
 *
 * Pricing data imported from shared src/lib/pricing.ts (single source of truth).
 */

import { useState } from 'react';
import { PRICING, PRICING_US, formatPrice, type Locale } from '@/lib/pricing';

interface PricingSectionProps {
  locale: Locale;
}

// Localized content
const content: Record<Locale, {
  toggle: { monthly: string; annual: string; discount: string };
  tiers: {
    refscore: { name: string; description: string; features: string[]; cta: string };
    verifie: { name: string; description: string; features: string[]; cta: string };
  };
  perMonth: string;
  billedAnnually: string;
  renewalDisclosure: string;
  cancelInfo: string;
}> = {
  fr: {
    toggle: { monthly: 'Mensuel', annual: 'Annuel', discount: '-20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'Pour les individus qui construisent leur carrière.',
        features: [
          'Jusqu\'à 6 références vérifiées',
          'Vérification du parcours professionnel',
          'Lien de profil partageable',
          'Support par email',
        ],
        cta: 'Commencer gratuitement',
      },
      verifie: {
        name: 'Verifie',
        description: 'Pour les professionnels qui construisent une réputation à long terme.',
        features: [
          'Références vérifiées illimitées',
          'Profil détaillé de vos compétences',
          'Vérification prioritaire (24h)',
          'Support prioritaire',
          'Rapports avancés',
        ],
        cta: 'Obtenir Verifie',
      },
    },
    perMonth: '/mois',
    billedAnnually: 'Facturé annuellement',
    renewalDisclosure: 'Les abonnements se renouvellent automatiquement à la fin de chaque période de facturation (mensuelle ou annuelle) au tarif en vigueur, sauf annulation préalable.',
    cancelInfo: 'Vous pouvez annuler à tout moment depuis votre espace personnel. L\'annulation prend effet à la fin de la période de facturation en cours.',
  },
  'en-GB': {
    toggle: { monthly: 'Monthly', annual: 'Annual', discount: 'Save 20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'For individuals building their career.',
        features: [
          'Up to 6 verified references',
          'Work history verification',
          'Shareable profile link',
          'Email support',
        ],
        cta: 'Start Free',
      },
      verifie: {
        name: 'Verifie',
        description: 'For professionals building a career-long reputation.',
        features: [
          'Unlimited verified references',
          'Detailed skills profile',
          'Priority verification (24h)',
          'Priority support',
          'Advanced reporting',
        ],
        cta: 'Get Verifie',
      },
    },
    perMonth: '/month',
    billedAnnually: 'Billed annually',
    renewalDisclosure: 'Subscriptions automatically renew at the end of each billing period (monthly or annual) at the then-current rate, unless cancelled in advance.',
    cancelInfo: 'You may cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period.',
  },
  'en-US': {
    toggle: { monthly: 'Monthly', annual: 'Annual', discount: 'Save 20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'For individuals building their career.',
        features: [
          'Up to 6 verified references',
          'Work history verification',
          'Shareable profile link',
          'Email support',
        ],
        cta: 'Start Free',
      },
      verifie: {
        name: 'Verifie',
        description: 'For professionals building a career-long reputation.',
        features: [
          'Unlimited verified references',
          'Detailed skills profile',
          'Priority verification (24h)',
          'Priority support',
          'Advanced reporting',
        ],
        cta: 'Get Verifie',
      },
    },
    perMonth: '/month',
    billedAnnually: 'Billed annually',
    renewalDisclosure: 'Subscriptions automatically renew at the end of each billing period (monthly or annual) at the then-current rate, unless cancelled in advance.',
    cancelInfo: 'You may cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period.',
  },
  de: {
    toggle: { monthly: 'Monatlich', annual: 'Jährlich', discount: '-20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'Für Einzelpersonen, die ihre Karriere aufbauen.',
        features: [
          'Bis zu 6 verifizierte Referenzen',
          'Überprüfung des Berufswegs',
          'Teilbarer Profillink',
          'E-Mail-Support',
        ],
        cta: 'Kostenlos starten',
      },
      verifie: {
        name: 'Verifie',
        description: 'Für Fachleute, die eine langfristige Reputation aufbauen.',
        features: [
          'Unbegrenzte verifizierte Referenzen',
          'Detailliertes Kompetenzprofil',
          'Prioritäts-Verifizierung (24h)',
          'Prioritäts-Support',
          'Erweiterte Berichte',
        ],
        cta: 'Verifie erhalten',
      },
    },
    perMonth: '/Monat',
    billedAnnually: 'Jährlich abgerechnet',
    renewalDisclosure: 'Abonnements verlängern sich automatisch am Ende jedes Abrechnungszeitraums (monatlich oder jährlich) zum jeweils gültigen Tarif, sofern nicht vorher gekündigt wird.',
    cancelInfo: 'Sie können jederzeit über Ihre Kontoeinstellungen kündigen. Die Kündigung wird zum Ende des laufenden Abrechnungszeitraums wirksam.',
  },
  es: {
    toggle: { monthly: 'Mensual', annual: 'Anual', discount: '-20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'Para quienes construyen su carrera.',
        features: [
          'Hasta 6 referencias verificadas',
          'Verificación del historial laboral',
          'Enlace de perfil compartible',
          'Soporte por email',
        ],
        cta: 'Empezar gratis',
      },
      verifie: {
        name: 'Verifie',
        description: 'Para profesionales que construyen una reputación a largo plazo.',
        features: [
          'Referencias verificadas ilimitadas',
          'Perfil detallado de habilidades',
          'Verificación prioritaria (24h)',
          'Soporte prioritario',
          'Informes avanzados',
        ],
        cta: 'Obtener Verifie',
      },
    },
    perMonth: '/mes',
    billedAnnually: 'Facturado anualmente',
    renewalDisclosure: 'Las suscripciones se renuevan automáticamente al final de cada período de facturación (mensual o anual) a la tarifa vigente, salvo cancelación previa.',
    cancelInfo: 'Puede cancelar en cualquier momento desde la configuración de su cuenta. La cancelación se hace efectiva al final del período de facturación en curso.',
  },
  it: {
    toggle: { monthly: 'Mensile', annual: 'Annuale', discount: '-20%' },
    tiers: {
      refscore: {
        name: 'RefScore',
        description: 'Per chi costruisce la propria carriera.',
        features: [
          'Fino a 6 referenze verificate',
          'Verifica della storia lavorativa',
          'Link profilo condivisibile',
          'Supporto via email',
        ],
        cta: 'Inizia gratis',
      },
      verifie: {
        name: 'Verifie',
        description: 'Per professionisti che costruiscono una reputazione a lungo termine.',
        features: [
          'Referenze verificate illimitate',
          'Profilo dettagliato delle competenze',
          'Verifica prioritaria (24h)',
          'Supporto prioritario',
          'Report avanzati',
        ],
        cta: 'Ottieni Verifie',
      },
    },
    perMonth: '/mese',
    billedAnnually: 'Fatturato annualmente',
    renewalDisclosure: 'Gli abbonamenti si rinnovano automaticamente alla fine di ogni periodo di fatturazione (mensile o annuale) alla tariffa in vigore, salvo disdetta preventiva.',
    cancelInfo: 'È possibile annullare in qualsiasi momento dalle impostazioni del proprio account. L\'annullamento ha effetto alla fine del periodo di fatturazione in corso.',
  },
};

export function PricingSection({ locale }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const t = content[locale] || content['en-US'];
  const prices = locale === 'en-US' ? PRICING_US : PRICING;

  const refscorePrice = isAnnual ? prices.refscore.annualMonthly : prices.refscore.monthly;
  const verifiePrice = isAnnual ? prices.verifie.annualMonthly : prices.verifie.monthly;

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
                : 'bg-openhr-teal-50 text-openhr-teal-900'
            }`}
          >
            {t.toggle.discount}
          </span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {/* RefScore */}
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
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
          <ul className="mt-8 flex-grow space-y-4">
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

        {/* Verifie */}
        <div className="relative flex flex-col rounded-2xl border-2 border-openhr-teal-900 bg-white p-8 shadow-lg">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-openhr-teal-900 px-4 py-1 text-sm font-medium text-white">
            {locale === 'fr' ? 'Recommandé' : locale === 'de' ? 'Empfohlen' : locale === 'es' ? 'Recomendado' : locale === 'it' ? 'Consigliato' : 'Recommended'}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{t.tiers.verifie.name}</h3>
          <p className="mt-2 text-gray-600">{t.tiers.verifie.description}</p>
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(verifiePrice, locale)}
            </span>
            <span className="text-gray-600">{t.perMonth}</span>
            {isAnnual && (
              <p className="mt-1 text-sm text-gray-500">{t.billedAnnually}</p>
            )}
          </div>
          <ul className="mt-8 flex-grow space-y-4">
            {t.tiers.verifie.features.map((feature, i) => (
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
            {t.tiers.verifie.cta}
          </a>
        </div>
      </div>

      {/* Auto-Renewal Disclosure — EU Consumer Rights Directive Art. 8(2), FR Code de la consommation Art. L215-1 */}
      <div className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-gray-500">
        <p>{t.renewalDisclosure}</p>
        <p className="mt-1">{t.cancelInfo}</p>
      </div>
    </div>
  );
}

export default PricingSection;
