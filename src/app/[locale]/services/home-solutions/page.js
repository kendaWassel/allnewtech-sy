import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import AvailableServices from "@/components/services/AvailableServices";
import AvailableServicesLoading from "@/components/services/AvailableServicesLoading";
import DiscoverSection from "@/components/services/DiscoverSection";
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const homeSolutionsMetadataByLocale = {
  en: {
    title: "Home Solutions | All New Tech",
    description: "Protect your home with intelligent CCTV, alarm systems, access control, and smart automation. Professional home security installations across the UK.",
    keywords: ["home security", "residential CCTV", "home alarm systems", "smart home automation", "access control for homes", "home security installation", "residential security systems"],
    openGraphTitle: "Home Solutions | All New Tech",
    openGraphDescription: "Protect your home with intelligent systems designed for modern living. Advanced home security and audio-visual solutions that provide peace of mind, control, and convenience.",
  },
  ar: {
    title: "حلول منزلية | All New Tech",
    description: "احمِ منزلك بأنظمة مراقبة وإنذار وتحكم في الدخول وأتمتة ذكية مع تنفيذ احترافي لحلول الأمن المنزلي.",
    keywords: ["أمن منزلي", "كاميرات مراقبة منزلية", "أنظمة إنذار منزلية", "أتمتة منزلية ذكية", "التحكم في الدخول للمنازل", "تركيب أنظمة أمن منزلية"],
    openGraphTitle: "حلول منزلية | All New Tech",
    openGraphDescription: "أنظمة ذكية مصممة لحماية منزلك وتوفير راحة البال والتحكم والسهولة في الحياة اليومية.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const metadata = homeSolutionsMetadataByLocale[activeLocale];
  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/services/home-solutions`;

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
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/services/home-solutions`])
      ),
    },
  };
}

export default async function HomeSolutionsPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "home-solutions");

  return (
    <main className="relative lg:top-[calc(-65px_-_2rem)] md:top-[calc(-42px_-_2rem)]">
      <Hero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
      <Intro description={content?.intro?.description} />
      <Suspense fallback={<AvailableServicesLoading />}>
        <AvailableServices propertyType={`${locale === "en" ? "Home" : "منزل"}`} ctaContent={content?.cta} locale={locale} />
      </Suspense>
      <DiscoverSection propertyType={`${locale === "en" ? "Home" : "منزل"}`} content={content?.discover} locale={locale} />
    </main>
  );
}