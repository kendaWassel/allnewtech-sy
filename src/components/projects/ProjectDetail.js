import { apiConfig, getImageUrl, fetchFromAPI } from '@/config/api';
import ProjectDetailClient from './ProjectDetailClient';
import { getContent } from '@/lib/get-content';

const ProjectDetail = async ({ projectId, locale = "en" }) => {
  let project = null;
  const content = await getContent(locale, "portfolio");
  const labels = content?.projectDetailLabels || null;

  try {
  const data = await fetchFromAPI(`${apiConfig.endpoints.portfolioProjects}/${projectId}`, {
    next: { revalidate: 60 },
    headers: { 'Accept-Language': locale },
  });
  const main = data.data.images?.main?.[0] || '';
  const secondary = data.data.images?.secondary || [];
  const other = data.data.images?.other || [];
  project = {
    id: data.data.id,
    title: data.data.title || '',
    description: data.data.description || '',
    service: data.data.service || '',
    propertyType: data.data.property_type || '',
    challenges: data.data.challenges || [],
    solutions: data.data.solutions || [],
    mainImage: getImageUrl(main),
    secondaryImages: secondary.map(getImageUrl).filter(Boolean),
    otherImages: other.map(getImageUrl).filter(Boolean),
  };
} catch {
  project = null;
}

  if (!project) {
    return (
      <section className="py-[3rem] lg:py-[4rem]">
        <div className="px-[var(--small-padding)] lg:px-[var(--inline-padding)]">
          <div className="flex items-center justify-center py-12">
            <p className="text-center text-gray-600 text-base md:text-lg">
              Project not found or unavailable at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <ProjectDetailClient project={project} labels={labels} />;
};

export default ProjectDetail;

