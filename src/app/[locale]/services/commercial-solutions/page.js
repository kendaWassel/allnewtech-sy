import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import AvailableServices from "@/components/services/AvailableServices";
import AvailableServicesLoading from "@/components/services/AvailableServicesLoading";
import DiscoverSection from "@/components/services/DiscoverSection";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

export const metadata = {
  title: "Commercial Solutions",
  description:
    "Professional commercial security systems for offices, retail, warehouses, and industrial sites. CCTV, alarms, access control, and AV solutions for businesses.",
  keywords: [
    "commercial security",
    "business CCTV systems",
    "commercial alarm systems",
    "office access control",
    "commercial AV solutions",
    "warehouse security",
    "retail security systems",
    "industrial security",
  ],
  openGraph: {
    title: "Commercial Solutions",
    description:
      "Professional systems built to protect your business and enhance operations. Robust, scalable security and AV solutions for offices, retail, warehouses, and commercial premises.",
    url: `${siteConfig.baseUrl}/services/commercial-solutions`,
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/services/commercial-solutions`,
  },
};

export default async function CommercialSolutionsPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "commercial-solutions");

  return (
    <main>
      <Hero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
      <Intro description={content?.intro?.description} />
      <Suspense fallback={<AvailableServicesLoading />}>
        <AvailableServices propertyType="commercial" ctaContent={content?.cta} locale={locale} />
      </Suspense>
      <DiscoverSection propertyType="commercial" content={content?.discover} locale={locale} />
    </main>
  );
}

