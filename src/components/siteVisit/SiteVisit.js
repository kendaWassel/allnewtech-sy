import { apiConfig, getApiUrl } from '@/config/api';
import SiteVisitClient from './SiteVisitClient';

const SiteVisit = async () => {
  let formOptions = {
    services: [],
    propertyType: [],
    preferredTime: [],
  };
  let error = null;

  try {
    const url = getApiUrl(apiConfig.endpoints.siteVisitForm);
    const response = await fetch(url, {
      cache: 'no-store',
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

    formOptions = {
      services: data.data?.services || [],
      propertyType: data.data?.propertyType || [],
      preferredTime:
        data.data?.PreferredTime ||
        [],
    };
  } catch (err) {
    error = err.message || 'Failed to load site visit form. Please try again later.';
  }

  return <SiteVisitClient formOptions={formOptions} error={error} />;
};

export default SiteVisit;
