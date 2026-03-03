import { Suspense } from "react";
import ProjectDetail from "@/components/projects/ProjectDetail";
import ProjectDetailLoading from "@/components/projects/ProjectDetailLoading";
import CTA from "@/components/services/ServicesCTA";
import { apiConfig, getApiUrl } from "@/config/api";
import { siteConfig } from "@/config/site";

export async function generateMetadata({ params }) {
  const { id } = await params;
  let title = "Project Details";
  let description =
    "View detailed information about our security and technology installation project.";

  try {
    const res = await fetch(getApiUrl(`${apiConfig.endpoints.portfolioProjects}/${id}`), {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data?.success && data?.data) {
      title = data.data.title || title;
      const desc = data.data.description || "";
      description =
        desc.length > 160 ? `${desc.slice(0, 157)}...` : desc || description;
    }
  } catch {
  }

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Project`,
      description,
      url: `${siteConfig.baseUrl}/projects/${id}`,
    },
    alternates: {
      canonical: `${siteConfig.baseUrl}/projects/${id}`,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  return (
    <main>
      <Suspense fallback={<ProjectDetailLoading />}>
        <ProjectDetail projectId={id} />
      </Suspense>
      <CTA className="lg:!mx-[6rem] lg:!w-[50%] !mt-0 !mb-[7rem]" />
    </main>
  );
}

