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
import { siteConfig } from "@/config/site";

export const metadata = {
  title: {
    absolute: "All New Tech | CCTV, Alarm & Smart Security Systems"
  },
  description:
    "All New Tech is a UK-based security and technology solutions provider specialising in CCTV systems, alarm systems, access control, and smart automation for residential and commercial properties.",
  keywords: [
    "CCTV installation",
    "alarm systems",
    "access control",
    "smart automation",
    "home security",
    "commercial security",
    "security systems installation",
    "smart home technology",
  ],
  openGraph: {
    title: "Trusted Security & Smart Technology Solutions for Homes and Businesses",
    description:
      "Protecting What Matters Most with Intelligent Surveillance, Smart Automation & Professional Installations",
    url: siteConfig.baseUrl,
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<AboutLoading />}>
        <About />
      </Suspense>
      <HowItWorks />
      <CTA className="py-[3rem]"/>
      <Suspense fallback={<ProjectsLoading />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<BrandsLoading />}>
        <Brands />
      </Suspense>
      <Suspense fallback={<TestimonialsLoading />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<LatestNewsLoading />}>
        <LatestNews />
      </Suspense>
    </main>
  );
}
