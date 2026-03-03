
import { apiConfig, getApiUrl, getImageUrl } from '@/config/api';
import AvailableServicesClient from './AvailableServicesClient';

const AvailableServices = async ({ propertyType = 'home' }) => {
  let services = [];
  let error = null;

  try {
    const url = getApiUrl(apiConfig.endpoints.services);
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

    services = allServices.filter((service) => 
      service.property_type === propertyType
    );
  } catch (err) {
    error = err.message || 'Failed to load services. Please try again later.';
    services = [];
  }

  return <AvailableServicesClient services={services} propertyType={propertyType} error={error} />;
};

export default AvailableServices;
