import { siteConfig } from '@/config/site';
import { locales, localeHreflang } from '@/config/i18n';

export default function sitemap() {
  const routes = ['', '/about', '/contact-us', '/projects', '/latest-news', '/services/home-solutions', '/services/commercial-solutions'];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    }))
  );
}