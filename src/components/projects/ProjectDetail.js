import { apiConfig, getApiUrl, getImageUrl } from '@/config/api';
import ProjectDetailClient from './ProjectDetailClient';

const ProjectDetail = async ({ projectId }) => {
  let project = null;

  try {
    const url = getApiUrl(`${apiConfig.endpoints.portfolioProjects}/${projectId}`);
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.msg || 'API request was not successful');
    }

    const main = data.data.images?.main?.[0] || '';
    const secondary = data.data.images?.secondary || [];
    const other = data.data.images?.other || [];
    project = {
      id: data.data.id,
      title: data.data.title || '',
      description: data.data.description || '',
      service: data.data.service || '',
      propertyType: data.data.property_type || '',
      challenges: data.data.challenges?.map((c) => c.item) || [],
      solutions: data.data.solutions?.map((s) => s.item) || [],
      mainImage: getImageUrl(main),
      secondaryImages: secondary.map(getImageUrl).filter(Boolean),
      otherImages: other.map(getImageUrl).filter(Boolean),
    };
  } catch (err) {
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

  return <ProjectDetailClient project={project} />;
};

export default ProjectDetail;

