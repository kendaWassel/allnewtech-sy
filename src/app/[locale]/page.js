import { Suspense } from "react";
import dynamic from "next/dynamic";
import About from "@/components/home/About";
import AboutLoading from "@/components/home/AboutLoading";
import Brands from "@/components/home/Brands";
import BrandsLoading from "@/components/home/BrandsLoading";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import HowItWorksLoading from "@/components/home/HowItWorksLoading";
import LatestNewsLoading from "@/components/home/LatestNewsLoading";
import ProjectsLoading from "@/components/home/ProjectsLoading";
import TestimonialsLoading from "@/components/home/TestimonialsLoading";
import { getContent } from "@/lib/get-content";
import { siteConfig } from "@/config/site";
import { locales, localeHreflang } from "@/config/i18n";
import LazySection from "@/components/home/LazySections";

const Projects = dynamic(() => import("@/components/home/Projects"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const LatestNews = dynamic(() => import("@/components/home/LatestNews"));

const homepageMetadata = {
  en: {
    title: "All New Tech | CCTV, Alarm & Smart Security Systems UK",
    description: "All New Tech is a UK-based security and technology solutions provider specialising in CCTV systems, alarm systems, access control, and smart automation.",
    keywords: [
      "CCTV installation UK",
      "alarm systems",
      "smart home automation",
      "access control",
      "security systems UK",
      "home security",
      "commercial security",
    ],
    openGraphTitle: "All New Tech | CCTV, Alarm & Smart Security Systems UK",
    openGraphDescription: "UK-based security and technology solutions provider specialising in CCTV, alarm systems, access control, and smart automation for homes and businesses.",
  },
  ar: {
    title: "All New Tech | أنظمة مراقبة وإنذار وأمن ذكية",
    description: "شركة All New Tech متخصصة في أنظمة المراقبة والإنذار والتحكم في الدخول والأتمتة الذكية للمنازل والشركات في المملكة المتحدة.",
    keywords: [
      "تركيب كاميرات مراقبة",
      "أنظمة إنذار",
      "أتمتة منزلية ذكية",
      "التحكم في الدخول",
      "أنظمة أمن",
      "أمن منزلي",
      "أمن تجاري",
    ],
    openGraphTitle: "All New Tech | أنظمة مراقبة وإنذار وأمن ذكي",
    openGraphDescription: "شركة متخصصة في أنظمة المراقبة والإنذار والتحكم في الدخول والأتمتة الذكية للمنازل والشركات في المملكة المتحدة.",
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const metadata = homepageMetadata[activeLocale];
  const base = siteConfig.baseUrl;

  return {
    title: { absolute: metadata.title },
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      url: `${base}/${activeLocale}`,
    },
    twitter: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
    },
    alternates: {
      canonical: `${base}/${activeLocale}`,
      languages: Object.fromEntries(
        locales.map((loc) => [localeHreflang[loc], `${base}/${loc}`])
      ),
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "homepage");

  return (
    <main className="relative lg:top-[calc(-65px_-_2rem)] md:top-[calc(-42px_-_2rem)]">
      <Hero content={content?.hero} locale={locale} />
      <Suspense fallback={<AboutLoading />}>
        <About content={content} locale={locale} />
      </Suspense>
      <LazySection height="500px" fallback={<HowItWorksLoading />}>
        <HowItWorks content={content?.howItWorks} locale={locale} />
      </LazySection>
      <CTA content={content?.cta} locale={locale} className="py-[3rem]" />
      <LazySection height="400px" fallback={<ProjectsLoading />}>
        <Projects content={content?.projects} locale={locale} />
      </LazySection>
      <Suspense fallback={<BrandsLoading />}>
        <Brands locale={locale} />
      </Suspense>
      <LazySection height="400px" fallback={<TestimonialsLoading />}>
        <Testimonials locale={locale} />
      </LazySection>
      <LazySection height="400px" fallback={<LatestNewsLoading />}>
        <LatestNews content={content?.latestNews} locale={locale} />
      </LazySection>
    </main>
  );
}