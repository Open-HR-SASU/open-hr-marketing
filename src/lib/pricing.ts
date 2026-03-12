/**
 * Shared Pricing Constants & Utilities — Annual Flat-Fee Model
 *
 * Single source of truth for pricing data used by:
 * - PricingSection.tsx (full pricing page with founding member scarcity)
 * - InlinePricingCTA.astro (lightweight inline 2-card display)
 * - PilotSignupForm.tsx (checkout form)
 *
 * LOCKED: DL-34 (Annual pricing), DL-35 (Psychological rounding multi-currency)
 * COMPLIANCE: Code-driven, not CMS-driven, per Global B2C Compliance requirements.
 * EU/UK require VAT-inclusive pricing display.
 */

export type Locale = 'fr' | 'en-GB' | 'en-US' | 'de' | 'es' | 'it';
export type Currency = 'eur' | 'gbp' | 'usd';
export type Tier = 'founding' | 'standard';
export type EmployerTier = 'essential' | 'professional' | 'executive';

interface TierCurrencyConfig {
  /** Annual total in whole currency units (e.g. 12 = €12/yr) */
  amount: number;
  /** Monthly equivalent for display (e.g. 1 = ~€1/month) */
  monthlyEquiv: number;
  currency: '€' | '£' | '$';
  /** Founding member cap (only present on founding tier) */
  cap?: number;
}

interface TierConfig {
  name: Record<Locale, string>;
  eur: TierCurrencyConfig;
  gbp: TierCurrencyConfig;
  usd: TierCurrencyConfig;
  isFounding: boolean;
}

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

/** Annual pricing tiers — DL-34, DL-35 */
export const TIERS: Record<Tier, TierConfig> = {
  founding: {
    name: {
      fr: 'Membre Fondateur',
      'en-GB': 'Founding Member',
      'en-US': 'Founding Member',
      de: 'Gründungsmitglied',
      es: 'Miembro Fundador',
      it: 'Membro Fondatore',
    },
    eur: { amount: 12, monthlyEquiv: 1, currency: '€', cap: 100 },
    gbp: { amount: 10, monthlyEquiv: 0.83, currency: '£', cap: 100 },
    usd: { amount: 12, monthlyEquiv: 1, currency: '$', cap: 100 },
    isFounding: true,
  },
  standard: {
    name: {
      fr: 'Standard',
      'en-GB': 'Standard',
      'en-US': 'Standard',
      de: 'Standard',
      es: 'Estándar',
      it: 'Standard',
    },
    eur: { amount: 24, monthlyEquiv: 2, currency: '€' },
    gbp: { amount: 20, monthlyEquiv: 1.67, currency: '£' },
    usd: { amount: 24, monthlyEquiv: 2, currency: '$' },
    isFounding: false,
  },
} as const;

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
 * Format an annual price with VAT labeling per Global B2C Compliance requirements.
 *
 * Locale-specific VAT terminology (OPE-439):
 * - FR: "TTC" (Toutes Taxes Comprises)
 * - DE: "inkl. MwSt." (inklusive Mehrwertsteuer)
 * - ES: "IVA incl." (IVA incluido)
 * - IT: "IVA incl." (IVA inclusa)
 * - UK: "inc. VAT"
 * - US: Tax-exclusive (no suffix, disclaimer shown separately)
 */
export function formatAnnualPrice(
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

/** Annual period label per locale ("an" / "year" / "Jahr" etc.) */
export function getAnnualLabel(locale: Locale): string {
  switch (locale) {
    case 'fr':
      return 'an';
    case 'de':
      return 'Jahr';
    case 'es':
      return 'año';
    case 'it':
      return 'anno';
    default:
      return 'year';
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
 * Reuses the same locale→currency→VAT logic as formatAnnualPrice.
 */
export function formatPerAssessmentPrice(
  amount: number,
  locale: Locale,
  showVatLabel: boolean = true,
): string {
  return formatAnnualPrice(amount, locale, showVatLabel);
}

// ── Legacy exports kept for backward compatibility during migration ──────────
// Remove after InlinePricingCTA.astro is updated.

export function formatPrice(
  amount: number,
  locale: Locale,
  showVatLabel: boolean = true,
): string {
  return formatAnnualPrice(amount, locale, showVatLabel);
}
