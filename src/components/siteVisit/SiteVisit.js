import { apiConfig, fetchFromAPI } from '@/config/api';
import SiteVisitClient from './SiteVisitClient';

const SiteVisit = async ({ content, locale = "en" }) => {
  let formOptions = {
    services: [],
    propertyType: [],
    preferredTime: [],
  };
  let error = null;

  try {
  const data = await fetchFromAPI(apiConfig.endpoints.siteVisitForm, {
    cache: 'no-store',
    headers: { 'Accept-Language': locale },
  });
  formOptions = {
    services: data.data?.services || [],
    propertyType: data.data?.propertyType || [],
    preferredTime: data.data?.preferredTime || [],
  };
} catch (err) {
  error = err.message || 'Failed to load site visit form. Please try again later.';
}

  return <SiteVisitClient formOptions={formOptions} error={error} content={content} locale={locale} />;
};

export default SiteVisit;
