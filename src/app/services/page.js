import CTA from "@/components/home/CTA";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import Categories from "@/components/services/Categories";
import services from "@/content/services";
import { siteConfig } from "@/config/site";

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

export default function ServicesPage() {
  return (
    <main>
      <Hero title={services.hero.title} subtitle={services.hero.subtitle}/>
      <Intro description={services.intro.description}/>
      <Categories />
      <CTA className="py-[6rem]"/>
    </main>
  );
}

