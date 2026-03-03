import { apiConfig, getApiUrl, getImageUrl } from '@/config/api';
import ProjectsClient from './ProjectsClient';

const PortfolioProjects = async () => {
  let projects = [];

  try {
    const url = getApiUrl(apiConfig.endpoints.portfolioProjects);
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

    projects = data.data.map((project) => ({
      id: project.id,
      title: project.title || '',
      description: project.description || '',
      service: project.service || '',
      propertyType: project.property_type || '',
      mainImage: getImageUrl(project.images?.main?.[0] || ''),
    }));
  } catch (err) {
    projects = [];
  }

  const services = Array.from(
    new Set(projects.map((p) => p.service).filter(Boolean))
  ).sort();

  return <ProjectsClient projects={projects} services={services} />;
};

export default PortfolioProjects;


