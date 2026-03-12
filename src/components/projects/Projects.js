import { apiConfig, getImageUrl, fetchFromAPI } from '@/config/api';
import ProjectsClient from './ProjectsClient';

const PortfolioProjects = async ({ content, locale = "en" }) => {
  let projects = [];

  try {
  const data = await fetchFromAPI(apiConfig.endpoints.portfolioProjects, {
    next: { revalidate: 60 },
    headers: { 'Accept-Language': locale },
  });
  projects = data.data.map((project) => ({
    id: project.id,
    title: project.title || '',
    description: project.description || '',
    service: project.service || '',
    propertyType: project.property_type || '',
    mainImage: getImageUrl(project.images?.main?.[0] || ''),
  }));
} catch {
  projects = [];
}

  const services = Array.from(
    new Set(projects.map((p) => p.service).filter(Boolean))
  ).sort();

  return <ProjectsClient projects={projects} services={services} content={content} locale={locale} />;
};

export default PortfolioProjects;


