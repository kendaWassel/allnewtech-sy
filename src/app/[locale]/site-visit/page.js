import { Suspense } from 'react';
import FormIntroHero from '@/components/layout/FormIntroHero';
import SiteVisit from '@/components/siteVisit/SiteVisit';
import SiteVisitLoading from '@/components/siteVisit/SiteVisitLoading';
import { localeHreflang, locales } from '@/config/i18n';
import { siteConfig } from '@/config/site';
import { getContent } from "@/lib/get-content";

const siteVisitMetadataByLocale = {
  en: {
    title: "Book A Site Visit | All New Tech",
    description: "Book a site visit with All New Tech for a professional assessment and tailored security recommendation.",
    keywords: ["book site visit", "site survey", "security consultation", "CCTV site visit", "access control assessment"],
    openGraphTitle: "Book A Site Visit | All New Tech",
    openGraphDescription: "Schedule a site visit for expert recommendations on your security and technology requirements.",
  },
  ar: {
    title: "احجز زيارة ميدانية | All New Tech",
    description: "احجز زيارة ميدانية مع All New Tech للحصول على تقييم احترافي وتوصيات مناسبة لأنظمة الأمن والتقنية.",
    keywords: ["حجز زيارة ميدانية", "معاينة موقع", "استشارة أمنية", "زيارة كاميرات مراقبة", "تقييم أنظمة التحكم في الدخول"],
    openGraphTitle: "احجز زيارة ميدانية | All New Tech",
    openGraphDescription: "احجز زيارة ميدانية للحصول على توصيات من خبرائنا بما يناسب احتياجاتك في أنظمة الأمن والتقنية.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: 'en' }));
  const activeLocale = locales.includes(locale) ? locale : 'en';
  const metadata = siteVisitMetadataByLocale[activeLocale];
  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/site-visit`;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      url: pageUrl,
    },
    twitter: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
    },
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/site-visit`])
      ),
    },
  };
}

export default async function BookSiteVisitPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "contact");

  return (
    <main className="relative lg:top-[calc(-65px_-_2rem)] md:top-[calc(-42px_-_2rem)]">
      <FormIntroHero title={content?.siteVisit?.intro} imageSrc="/site-visit-hero.jpg" imageAlt="Book a site visit illustration" />
      <Suspense fallback={<SiteVisitLoading />}>
        <SiteVisit content={content} locale={locale} />
      </Suspense>
    </main>
  );
}