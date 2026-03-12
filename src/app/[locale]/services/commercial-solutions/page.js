import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import AvailableServices from "@/components/services/AvailableServices";
import AvailableServicesLoading from "@/components/services/AvailableServicesLoading";
import DiscoverSection from "@/components/services/DiscoverSection";
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const commercialSolutionsMetadataByLocale = {
  en: {
    title: "Commercial Solutions | All New Tech",
    description: "Professional commercial security systems for offices, retail, warehouses, and industrial sites. CCTV, alarms, access control, and AV solutions for businesses.",
    keywords: ["commercial security", "business CCTV systems", "commercial alarm systems", "office access control", "commercial AV solutions", "warehouse security", "retail security systems"],
    openGraphTitle: "Commercial Solutions | All New Tech",
    openGraphDescription: "Professional systems built to protect your business and enhance operations. Robust, scalable security and AV solutions for offices, retail, warehouses, and commercial premises.",
  },
  ar: {
    title: "حلول تجارية | All New Tech",
    description: "حلول أمن وتقنية احترافية للمنشآت التجارية تشمل كاميرات المراقبة والإنذار والتحكم في الدخول وحلول AV للشركات.",
    keywords: ["حلول أمنية تجارية", "أنظمة مراقبة للشركات", "أنظمة إنذار تجارية", "التحكم في الدخول للمكاتب", "أمن المستودعات", "أمن المتاجر"],
    openGraphTitle: "حلول تجارية | All New Tech",
    openGraphDescription: "أنظمة احترافية مصممة لحماية أعمالك وتعزيز كفاءة التشغيل بحلول أمن وتقنية متقدمة للمنشآت التجارية.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const metadata = commercialSolutionsMetadataByLocale[activeLocale];
  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/services/commercial-solutions`;

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
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/services/commercial-solutions`])
      ),
    },
  };
}

export default async function CommercialSolutionsPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "commercial-solutions");

  return (
    <main className="relative lg:top-[calc(-65px_-_2rem)] md:top-[calc(-42px_-_2rem)]">
      <Hero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
      <Intro description={content?.intro?.description} />
      <Suspense fallback={<AvailableServicesLoading />}>
        <AvailableServices propertyType={`${locale === "en" ? "commercial" : "تجاري"}`} ctaContent={content?.cta} locale={locale} />
      </Suspense>
      <DiscoverSection propertyType={`${locale === "en" ? "commercial" : "تجاري"}`} content={content?.discover} locale={locale} />
    </main>
  );
}