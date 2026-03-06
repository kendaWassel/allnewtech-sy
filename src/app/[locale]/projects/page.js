import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import PortfolioProjects from "@/components/projects/Projects";
import ProjectsLoading from "@/components/projects/ProjectsLoading";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

export const metadata = {
  title: "Our Work",
  description:
    "View our portfolio of security and technology installations. Real projects showcasing CCTV, alarm systems, access control, and smart automation solutions.",
  keywords: [
    "security installation portfolio",
    "CCTV projects UK",
    "alarm system installations",
    "access control projects",
    "smart automation examples",
    "security projects UK",
    "completed installations",
  ],
  openGraph: {
    title: "Our Work | Projects",
    description:
      "Real Projects. Proven Results. View our portfolio of security and technology installations across the UK.",
    url: `${siteConfig.baseUrl}/projects`,
  },
  alternates: {
    canonical: `${siteConfig.baseUrl}/projects`,
  },
};

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "portfolio");

  return (
    <main>
      <Hero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
      <Suspense fallback={<ProjectsLoading />}>
        <PortfolioProjects content={content} locale={locale} />
      </Suspense>
    </main>
  );
}

