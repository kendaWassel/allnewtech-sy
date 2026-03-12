import { Suspense } from "react";
import ProjectDetail from "@/components/projects/ProjectDetail";
import ProjectDetailLoading from "@/components/projects/ProjectDetailLoading";
import CTA from "@/components/services/ServicesCTA";
import { apiConfig, fetchFromAPI } from '@/config/api';
import { localeHreflang, locales } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { getContent } from "@/lib/get-content";

const projectMetadataFallbackByLocale = {
  en: {
    title: "Project Details | All New Tech",
    description: "View detailed information about our security and technology installation project.",
    openGraphSuffix: "All New Tech Projects",
  },
  ar: {
    title: "تفاصيل المشروع | All New Tech",
    description: "اطّلع على تفاصيل مشروعنا في تنفيذ حلول الأمن والتقنية.",
    openGraphSuffix: "مشاريع All New Tech",
  },
};

export async function generateMetadata({ params }) {
  const { locale, id } = await (params || Promise.resolve({ locale: "en", id: "" }));
  const activeLocale = locales.includes(locale) ? locale : "en";
  const fallbackMetadata = projectMetadataFallbackByLocale[activeLocale];
  let title = fallbackMetadata.title;
  let description = fallbackMetadata.description;

  try {
    const data = await fetchFromAPI(`${apiConfig.endpoints.portfolioProjects}/${id}`, {
      next: { revalidate: 60 },
      headers: { 'Accept-Language': activeLocale },
    });
    title = data.data.title || title;
    const desc = data.data.description || '';
    description = desc.length > 160 ? `${desc.slice(0, 157)}...` : desc || description;
  } catch {}

  const pageUrl = `${siteConfig.baseUrl}/${activeLocale}/projects/${id}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${fallbackMetadata.openGraphSuffix}`,
      description,
      url: pageUrl,
    },
    twitter: {
      title: `${title} | ${fallbackMetadata.openGraphSuffix}`,
      description,
    },
    alternates: {
      canonical: pageUrl,
      languages: Object.fromEntries(
        locales.map((loc) => [localeHreflang[loc], `${siteConfig.baseUrl}/${loc}/projects/${id}`])
      ),
    },
  };
}

export default async function ProjectPage({ params }) {
  const { locale, id } = await params;
  const CTAcontent = await getContent(locale, "homepage");

  return (
    <main>
      <Suspense fallback={<ProjectDetailLoading />}>
        <ProjectDetail projectId={id} locale={locale} />
      </Suspense>
      <CTA content={CTAcontent?.cta} locale={locale} className="lg:!mx-[6rem] lg:!w-[50%] !mt-0 !mb-[7rem]" />
    </main>
  );
}