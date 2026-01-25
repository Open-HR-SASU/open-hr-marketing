/**
 * i18n Configuration for Open HR Marketing Site
 *
 * Matches the platform's locale configuration for consistency.
 */

export const locales = ['fr', 'en-GB', 'en-US', 'de', 'es', 'it'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  htmlLang: string;
  flag: string;
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Francais',
    htmlLang: 'fr',
    flag: 'fr',
  },
  'en-GB': {
    code: 'en-GB',
    name: 'English (UK)',
    nativeName: 'English (UK)',
    htmlLang: 'en-GB',
    flag: 'gb',
  },
  'en-US': {
    code: 'en-US',
    name: 'English (US)',
    nativeName: 'English (US)',
    htmlLang: 'en',
    flag: 'us',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    htmlLang: 'de',
    flag: 'de',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Espanol',
    htmlLang: 'es',
    flag: 'es',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    htmlLang: 'it',
    flag: 'it',
  },
};

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale config by code
 */
export function getLocaleConfig(locale: Locale): LocaleConfig {
  return localeConfigs[locale];
}

/**
 * Generate static paths for all locales
 * Used in Astro getStaticPaths()
 */
export function getLocaleStaticPaths() {
  return locales.map((locale) => ({
    params: { locale },
  }));
}
