import { apiConfig, fetchFromAPI } from '@/config/api';
import CustomQuoteClient from './CustomQuoteClient';

const CustomQuote = async ({ content, locale = "en" }) => {
  let formOptions = {
    services: [],
    propertyType: [],
    preferredContactMethod: [],
    budgetRange: [],
  };
  let error = null;

  try {
  const data = await fetchFromAPI(apiConfig.endpoints.customQuoteForm, {
    cache: 'no-store',
    headers: { 'Accept-Language': locale },
  });
  formOptions = {
    services: data.data?.services || [],
    propertyType: data.data?.propertyType || [],
    preferredContactMethod: data.data?.preferredContactMethod || [],
    budgetRange: data.data?.budgetRange || [],
  };
} catch (err) {
  error = err.message || 'Failed to load quote form. Please try again later.';
}

  return <CustomQuoteClient formOptions={formOptions} error={error} content={content} locale={locale} />;
};

export default CustomQuote;
