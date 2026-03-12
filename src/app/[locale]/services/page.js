import CTA from "@/components/home/CTA";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import Categories from "@/components/services/Categories";
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const servicesMetadataByLocale = {
  en: {
    title: "Our Services | All New Tech",
    description: "Advanced security and technology solutions for homes and businesses. CCTV systems, alarm systems, access control, and smart automation. Professional installation across the UK.",
    keywords: ["security services", "CCTV installation", "alarm systems", "access control", "smart automation", "home security", "commercial security"],
    openGraphTitle: "Our Services | Security & Technology Solutions UK",
    openGraphDescription: "Advanced Security & Technology Solutions for Homes and Businesses. Integrated security and smart technology systems designed to protect, control, and enhance properties.",
  },
  ar: {
    title: "خدماتنا | All New Tech",
    description: "حلول أمن وتقنية متقدمة للمنازل والشركات تشمل أنظمة المراقبة والإنذار والتحكم في الدخول والأتمتة الذكية مع تنفيذ احترافي.",
    keywords: ["خدمات أمنية", "تركيب كاميرات مراقبة", "أنظمة إنذار", "التحكم في الدخول", "أتمتة ذكية", "أمن منزلي", "أمن تجاري"],
    openGraphTitle: "خدماتنا | حلول الأمن والتقنية",
    openGraphDescription: "حلول متكاملة للمنازل والشركات لحماية الممتلكات وتعزيز التحكم ورفع كفاءة الأنظمة التقنية.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const metadata = servicesMetadataByLocale[activeLocale];
  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/services`;

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
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/services`])
      ),
    },
  };
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "services");
  const CTAcontent = await getContent(locale, "homepage");

  return (
    <main className="relative lg:top-[calc(-65px_-_2rem)] md:top-[calc(-42px_-_2rem)]">
      <Hero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
      <Intro description={content?.intro?.description} />
      <Categories content={content?.categories} locale={locale} />
      <CTA content={CTAcontent?.cta} locale={locale} className="py-[6rem]" />
    </main>
  );
}