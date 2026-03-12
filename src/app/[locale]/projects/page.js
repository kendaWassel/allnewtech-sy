import { Suspense } from "react";
import Hero from "@/components/layout/Hero";
import PortfolioProjects from "@/components/projects/Projects";
import ProjectsLoading from "@/components/projects/ProjectsLoading";
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const projectsMetadataByLocale = {
  en: {
    title: "Our Projects | All New Tech",
    description: "View our portfolio of security and technology installations. Real projects showcasing CCTV, alarm systems, access control, and smart automation solutions.",
    keywords: ["security installation portfolio", "CCTV projects UK", "alarm system installations", "access control projects", "smart automation examples", "security projects UK"],
    openGraphTitle: "Our Projects | All New Tech",
    openGraphDescription: "Real Projects. Proven Results. View our portfolio of security and technology installations across the UK.",
  },
  ar: {
    title: "مشاريعنا | All New Tech",
    description: "استعرض معرض مشاريعنا في حلول الأمن والتقنية، بما يشمل أنظمة المراقبة والإنذار والتحكم في الدخول والأتمتة الذكية.",
    keywords: ["معرض مشاريع أمنية", "مشاريع كاميرات مراقبة", "تركيب أنظمة إنذار", "مشاريع التحكم في الدخول", "مشاريع أمن وتقنية"],
    openGraphTitle: "مشاريعنا | All New Tech",
    openGraphDescription: "مشاريع حقيقية ونتائج موثوقة. استعرض مشاريعنا في تنفيذ حلول الأمن والتقنية.",
  },
};

export async function generateMetadata({ params }) {
  const { locale } = await (params || Promise.resolve({ locale: "en" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const metadata = projectsMetadataByLocale[activeLocale];
  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/projects`;

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
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/projects`])
      ),
    },
  };
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const content = await getContent(locale, "portfolio");

  return (
    <main className="relative lg:top-[calc(-65px_-_2rem)] md:top-[calc(-42px_-_2rem)]">
      <Hero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
      <Suspense fallback={<ProjectsLoading />}>
        <PortfolioProjects content={content} locale={locale} />
      </Suspense>
    </main>
  );
}