import { Suspense } from "react";
import CustomQuote from "@/components/customQuote/CustomQuote";
import CustomQuoteLoading from "@/components/customQuote/CustomQuoteLoading";
import FormIntroHero from "@/components/layout/FormIntroHero";
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const customQuoteMetadataByLocale = {
  en: {
    title: "Get a Custom Quote | All New Tech",
    description: "Request a tailored quote for CCTV, alarm systems, access control, or smart automation. Professional security solutions across the UK.",
    keywords: ["custom quote", "security quote", "CCTV quote", "alarm system quote", "free site survey", "security installation quote"],
    openGraphTitle: "Get a Custom Quote | All New Tech",
    openGraphDescription: "Request a tailored quote for your security and technology needs from All New Tech.",
  },
  ar: {
    title: "طلب عرض سعر مخصص | All New Tech",
    description: "تواصل مع All New Tech للحصول على عرض سعر مخصص لحلول الأمن والتقنية وفق متطلبات موقعك واحتياجاتك.",
    keywords: ["عرض سعر مخصص", "طلب عرض سعر", "حلول أمنية", "استشارة أنظمة مراقبة", "عرض سعر كاميرات مراقبة", "عرض سعر أنظمة إنذار"],
    openGraphTitle: "طلب عرض سعر مخصص | All New Tech",
    openGraphDescription: "اطلب عرض سعر مخصصًا لاحتياجاتك في أنظمة الأمن والتقنية من فريق All New Tech.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const metadata = customQuoteMetadataByLocale[activeLocale];
  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/custom-quote`;

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
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/custom-quote`])
      ),
    },
  };
}

export default async function CustomQuotePage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "contact");

  return (
    <main className="relative lg:top-[calc(-65px_-_2rem)] md:top-[calc(-42px_-_2rem)]">
      <FormIntroHero title={content?.quoteRequest?.intro} imageSrc="/quote-hero.jpg" />
      <Suspense fallback={<CustomQuoteLoading />}>
        <CustomQuote content={content} locale={locale} />
      </Suspense>
    </main>
  );
}