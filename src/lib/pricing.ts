/**
 * Shared Pricing Constants & Utilities
 *
 * Single source of truth for pricing data used by:
 * - PricingSection.tsx (workers — free)
 * - EmployerPricingSection.tsx (B2B per-assessment)
 * - InlinePricingCTA.astro (lightweight inline display)
 *
 * WORKERS ARE FREE. ALWAYS. (CEO decision, 2026-03-15)
 * Employer B2B pricing: DL-35 (Psychological rounding multi-currency)
 * COMPLIANCE: Code-driven, not CMS-driven, per Global B2C Compliance requirements.
 */

export type Locale = 'fr' | 'en-GB' | 'en-US' | 'de' | 'es' | 'it';
export type Currency = 'eur' | 'gbp' | 'usd';
export type EmployerTier = 'essential' | 'professional' | 'executive';

interface EmployerTierCurrencyConfig {
  /** Per-assessment price in whole currency units */
  amount: number;
  currency: '€' | '£' | '$';
}

interface EmployerTierConfig {
  name: Record<Locale, string>;
  eur: EmployerTierCurrencyConfig;
  gbp: EmployerTierCurrencyConfig;
  usd: EmployerTierCurrencyConfig;
  references: number | string;
  confidence: string;
  isPopular: boolean;
}

/**
 * Derive the checkout currency from locale.
 * en-US → usd, en-GB → gbp, all others → eur.
 */
export function getCurrencyForLocale(locale: Locale): Currency {
  if (locale === 'en-US') return 'usd';
  if (locale === 'en-GB') return 'gbp';
  return 'eur';
}

/**
 * Format a price with VAT labeling per Global B2C Compliance requirements.
 *
 * Locale-specific VAT terminology (OPE-439):
 * - FR: "TTC" (Toutes Taxes Comprises)
 * - DE: "inkl. MwSt." (inklusive Mehrwertsteuer)
 * - ES: "IVA incl." (IVA incluido)
 * - IT: "IVA incl." (IVA inclusa)
 * - UK: "inc. VAT"
 * - US: Tax-exclusive (no suffix, disclaimer shown separately)
 */
export function formatPrice(
  amount: number,
  locale: Locale,
  showVatLabel: boolean = true,
): string {
  const currency =
    locale === 'en-US' ? 'USD' : locale === 'en-GB' ? 'GBP' : 'EUR';
  const localeCode =
    locale === 'en-US'
      ? 'en-US'
      : locale === 'en-GB'
        ? 'en-GB'
        : locale === 'de'
          ? 'de-DE'
          : locale === 'es'
            ? 'es-ES'
            : locale === 'it'
              ? 'it-IT'
              : 'fr-FR';

  const formatted = new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  if (!showVatLabel) return formatted;

  switch (locale) {
    case 'fr':
      return `${formatted} TTC`;
    case 'de':
      return `${formatted} inkl. MwSt.`;
    case 'es':
      return `${formatted} IVA incl.`;
    case 'it':
      return `${formatted} IVA incl.`;
    case 'en-GB':
      return `${formatted} inc. VAT`;
    case 'en-US':
    default:
      return formatted;
  }
}

/** Employer B2B per-assessment pricing — OPE-778 */
export const EMPLOYER_TIERS: Record<EmployerTier, EmployerTierConfig> = {
  essential: {
    name: {
      fr: 'Essentiel',
      'en-GB': 'Essential',
      'en-US': 'Essential',
      de: 'Basis',
      es: 'Esencial',
      it: 'Essenziale',
    },
    eur: { amount: 79, currency: '€' },
    gbp: { amount: 69, currency: '£' },
    usd: { amount: 79, currency: '$' },
    references: 3,
    confidence: '~56%',
    isPopular: false,
  },
  professional: {
    name: {
      fr: 'Professionnel',
      'en-GB': 'Professional',
      'en-US': 'Professional',
      de: 'Professionell',
      es: 'Profesional',
      it: 'Professionale',
    },
    eur: { amount: 149, currency: '€' },
    gbp: { amount: 129, currency: '£' },
    usd: { amount: 149, currency: '$' },
    references: '5-6',
    confidence: '~85%',
    isPopular: true,
  },
  executive: {
    name: {
      fr: 'Dirigeant',
      'en-GB': 'Executive',
      'en-US': 'Executive',
      de: 'Exekutiv',
      es: 'Ejecutivo',
      it: 'Dirigente',
    },
    eur: { amount: 299, currency: '€' },
    gbp: { amount: 259, currency: '£' },
    usd: { amount: 299, currency: '$' },
    references: '8-10',
    confidence: '~93%+',
    isPopular: false,
  },
} as const;

/**
 * Format a per-assessment price with VAT labeling.
 * Reuses the same locale→currency→VAT logic as formatPrice.
 */
export function formatPerAssessmentPrice(
  amount: number,
  locale: Locale,
  showVatLabel: boolean = true,
): string {
  return formatPrice(amount, locale, showVatLabel);
}

// Legacy alias kept for backward compatibility
export const formatAnnualPrice = formatPrice;
