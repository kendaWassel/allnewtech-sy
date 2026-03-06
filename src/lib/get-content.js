/**
 * Load locale-specific JSON content
 * Used for static content from src/content/{locale}/
 */
export async function getContent(locale, contentKey) {
  const safeLocale = ["en", "ar"].includes(locale) ? locale : "en";
  try {
    const content = await import(`@/content/${safeLocale}/${contentKey}.json`);
    return content.default;
  } catch {
    // Fallback to English if locale file missing
    const fallback = await import(`@/content/en/${contentKey}.json`);
    return fallback.default;
  }
}
