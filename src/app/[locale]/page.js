import { Suspense } from "react";
import About from "@/components/home/About";
import AboutLoading from "@/components/home/AboutLoading";
import Brands from "@/components/home/Brands";
import BrandsLoading from "@/components/home/BrandsLoading";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import LatestNews from "@/components/home/LatestNews";
import LatestNewsLoading from "@/components/home/LatestNewsLoading";
import Projects from "@/components/home/Projects";
import ProjectsLoading from "@/components/home/ProjectsLoading";
import Testimonials from "@/components/home/Testimonials";
import TestimonialsLoading from "@/components/home/TestimonialsLoading";
import { getContent } from "@/lib/get-content";
import { siteConfig } from "@/config/site";
import { locales, localeHreflang } from "@/config/i18n";
import '@/app/globals.css';
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const content = await getContent(locale, "homepage");
  const base = siteConfig.baseUrl;
  const title = content?.hero?.title || "All New Tech | CCTV, Alarm & Smart Security Systems";
  const description =
    content?.hero?.subtitle ||
    "All New Tech is a UK-based security and technology solutions provider specialising in CCTV systems, alarm systems, access control, and smart automation.";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${base}/${locale}`,
      languages: Object.fromEntries(
        locales.map((loc) => [localeHreflang[loc], `${base}/${loc}`])
      ),
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}`,
    },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "homepage");

  return (
    <main>
      <Hero content={content?.hero} locale={locale} />
      <Suspense fallback={<AboutLoading />}>
        <About content={content} locale={locale} />
      </Suspense>
      <HowItWorks content={content?.howItWorks} locale={locale} />
      <CTA content={content?.cta} locale={locale} className="py-[3rem]" />
      <Suspense fallback={<ProjectsLoading />}>
        <Projects content={content?.projects} locale={locale} />
      </Suspense>
      <Suspense fallback={<BrandsLoading />}>
        <Brands locale={locale} />
      </Suspense>
      <Suspense fallback={<TestimonialsLoading />}>
        <Testimonials locale={locale} />
      </Suspense>
      <Suspense fallback={<LatestNewsLoading />}>
        <LatestNews content={content?.latestNews} locale={locale} />
      </Suspense>
    </main>
  );
}
