/**
 * Internationalization configuration
 * Production-ready setup for en/ar with SEO support
 */
export const locales = ["en", "ar"];
export const defaultLocale = "en";

export const localeNames = {
  en: "English",
  ar: "العربية",
};

export const localeDir = {
  en: "ltr",
  ar: "rtl",
};

export const localeHreflang = {
  en: "en-GB",
  ar: "ar",
};

export function isValidLocale(locale) {
  return locales.includes(locale);
}
