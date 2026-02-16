/**
 * Shared Pricing Constants & Utilities
 *
 * Single source of truth for pricing data used by both:
 * - PricingSection.tsx (full pricing page with monthly/annual toggle)
 * - InlinePricingCTA.astro (lightweight inline 2-card display)
 *
 * COMPLIANCE: These values are code-driven, not CMS-driven, per Global B2C Compliance requirements.
 * EU/UK require VAT-inclusive pricing display.
 */

export type Locale = 'fr' | 'en-GB' | 'en-US' | 'de' | 'es' | 'it';

export const PRICING = {
  refscore: {
    monthly: 9,
    annualMonthly: 7,
    annualTotal: 84,
  },
  verifie: {
    monthly: 15,
    annualMonthly: 12,
    annualTotal: 144,
  },
} as const;

/** US pricing uses different amounts due to currency conversion */
export const PRICING_US = {
  refscore: {
    monthly: 11,
    annualMonthly: 9,
    annualTotal: 108,
  },
  verifie: {
    monthly: 18,
    annualMonthly: 15,
    annualTotal: 180,
  },
} as const;

/**
 * Format price with VAT labeling per Global B2C Compliance requirements
 *
 * Locale-specific VAT terminology (OPE-439):
 * - FR: "TTC" (Toutes Taxes Comprises)
 * - DE: "inkl. MwSt." (inklusive Mehrwertsteuer)
 * - ES: "IVA incl." (IVA incluido)
 * - IT: "IVA incl." (IVA inclusa)
 * - UK: "inc. VAT"
 * - US: Tax-exclusive (no suffix, disclaimer shown separately)
 */
export function formatPrice(amount: number, locale: Locale, showVatLabel: boolean = true): string {
  const currency = locale === 'en-US' ? 'USD' : locale === 'en-GB' ? 'GBP' : 'EUR';
  const localeCode = locale === 'en-US' ? 'en-US' : locale === 'en-GB' ? 'en-GB' : locale === 'de' ? 'de-DE' : locale === 'es' ? 'es-ES' : locale === 'it' ? 'it-IT' : 'fr-FR';

  const formatted = new Intl.NumberFormat(localeCode, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  if (!showVatLabel) {
    return formatted;
  }

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

/**
 * Get the monthly price for a tier based on locale
 */
export function getMonthlyPrice(tier: 'refscore' | 'verifie', locale: Locale): number {
  const prices = locale === 'en-US' ? PRICING_US : PRICING;
  return prices[tier].monthly;
}
