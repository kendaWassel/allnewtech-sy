import { apiConfig, getImageUrl, fetchFromAPI } from '@/config/api';
import AvailableServicesClient from './AvailableServicesClient';

const AvailableServices = async ({ propertyType = 'Home', ctaContent, locale = "en" }) => {
  let services = [];
  let error = null;

try {
  const data = await fetchFromAPI(apiConfig.endpoints.services, {
    next: { revalidate: 60 },
    headers: { 'Accept-Language': locale },
  });
  const allServices = data.data.map((service) => ({
    id: service.id,
    title: service.title || '',
    description: service.description || '',
    features: service.advantages?.map((advantage) => advantage.item) || [],
    property_type: service.property_type,
    image: getImageUrl(service.image || '') || null,
    createdAt: service.created_at,
    updatedAt: service.updated_at,
  }));
  services = allServices.filter((service) => service.property_type === propertyType);
} catch (err) {
  error = err.message || 'Failed to load services. Please try again later.';
  services = [];
}

  return (
    <AvailableServicesClient
      services={services}
      error={error}
      ctaContent={ctaContent}
      locale={locale}
    />
  );
};

export default AvailableServices;
