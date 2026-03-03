import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import Intro from "@/components/layout/Intro";
import AvailableServices from "@/components/services/AvailableServices";
import AvailableServicesLoading from "@/components/services/AvailableServicesLoading";
import DiscoverSection from "@/components/services/DiscoverSection";
import homeSolutions from "@/content/home-solutions";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Home Solutions",
  description:
    "Protect your home with intelligent CCTV, alarm systems, access control, and smart automation. Professional home security installations across the UK.",
  keywords: [
    "home security",
    "residential CCTV",
    "home alarm systems",
    "smart home automation",
    "access control for homes",
    "home security installation",
    "residential security systems",
    "smart home technology",
  ],
  openGraph: {
    title: "Home Solutions",
    description:
      "Protect your home with intelligent systems designed for modern living. Advanced home security and audio-visual solutions that provide peace of mind, control, and convenience.",
    url: `${siteConfig.baseUrl}/services/home-solutions`,
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/services/home-solutions`,
  },
};

export default function HomeSolutionsPage() {
  const cta = homeSolutions.cta;
  return (
    <main>
      <Hero title={homeSolutions.hero.title} subtitle={homeSolutions.hero.subtitle}/>
      <Intro description={homeSolutions.intro.description}/>
      <Suspense fallback={<AvailableServicesLoading />}>
        <AvailableServices propertyType="home" />
      </Suspense>
      <DiscoverSection propertyType="home" />
    </main>
  );
}

