import CTA from "@/components/home/CTA";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import Categories from "@/components/services/Categories";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

export const metadata = {
  title: "Services",
  description:
    "Advanced security and technology solutions for homes and businesses. CCTV systems, alarm systems, access control, and smart automation. Professional installation across the UK.",
  keywords: [
    "security services",
    "CCTV installation",
    "alarm systems",
    "access control",
    "smart automation",
    "home security",
    "commercial security",
    "security solutions",
  ],
  openGraph: {
    title: "Our Services | Security & Technology Solutions UK",
    description:
      "Advanced Security & Technology Solutions for Homes and Businesses. Integrated security and smart technology systems designed to protect, control, and enhance properties.",
    url: `${siteConfig.baseUrl}/services`,
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/services`,
  },
};

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "services");
  const CTAcontent = await getContent(locale, "homepage");

  return (
    <main>
      <Hero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
      <Intro description={content?.intro?.description} />
      <Categories content={content?.categories} locale={locale} />
      <CTA content={CTAcontent?.cta} locale={locale} className="py-[6rem]" />
    </main>
  );
}

