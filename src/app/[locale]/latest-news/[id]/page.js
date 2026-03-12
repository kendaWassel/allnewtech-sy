import { Suspense } from "react";
import LatestNewsBlog from "@/components/latestNewsBlog/LatestNewsBlog";
import LatestNewsBlogLoading from "@/components/latestNewsBlog/LatestNewsBlogLoading";
import CTA from "@/components/services/ServicesCTA";
import { apiConfig, fetchFromAPI } from '@/config/api';
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const latestNewsMetadataFallbackByLocale = {
  en: {
    title: "Latest News | All New Tech",
    description: "Read the latest news and updates from All New Tech on security and technology solutions.",
    openGraphSuffix: "All New Tech News",
  },
  ar: {
    title: "آخر الأخبار | All New Tech",
    description: "اطّلع على أحدث الأخبار والتحديثات من All New Tech حول حلول الأمن والتقنية.",
    openGraphSuffix: "أخبار All New Tech",
  },
};

export async function generateMetadata({ params }) {
  const { locale, id } = await (params || Promise.resolve({ locale: "en", id: "" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const fallbackMetadata = latestNewsMetadataFallbackByLocale[activeLocale];
  let title = fallbackMetadata.title;
  let description = fallbackMetadata.description;

  try {
    const data = await fetchFromAPI(`${apiConfig.endpoints.latestNews}/${id}`, {
      next: { revalidate: 60 },
      headers: { 'Accept-Language': activeLocale },
    });
    title = data.data.title || title;
    const content = data.data.content || '';
    description = content.length > 160 ? `${content.slice(0, 157)}...` : content || description;
  } catch {}

  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/latest-news/${id}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${fallbackMetadata.openGraphSuffix}`,
      description,
      url: pageUrl,
    },
    twitter: {
      title: `${title} | ${fallbackMetadata.openGraphSuffix}`,
      description,
    },
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/latest-news/${id}`])
      ),
    },
  };
}

export default async function LatestNewsBlogPage({ params }) {
  const { locale, id } = await params;
  const content = await getContent(locale, "homepage");

  return (
    <main>
      <Suspense fallback={<LatestNewsBlogLoading />}>
        <LatestNewsBlog newsId={id} content={content?.latestNews} locale={locale} />
      </Suspense>
      <CTA content={content?.cta} locale={locale} className="lg:!mx-[6rem] lg:!w-[50%] !mt-0 !mb-[7rem]" />
    </main>
  );
}