import { getApiUrl } from '@/config/api';
import CustomQuoteClient from './CustomQuoteClient';

const CustomQuote = async () => {
  let formOptions = {
    services: [],
    propertyType: [],
    preferredContactMethod: [],
    budgetRange: [],
  };
  let error = null;

  try {
    const url = getApiUrl('/api/request-for-a-quote-form-data');
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
      preferredContactMethod: data.data?.preferredContactMethod || [],
      budgetRange: data.data?.budgetRange || [],
    };
  } catch (err) {
    error = err.message || 'Failed to load quote form. Please try again later.';
  }

  return <CustomQuoteClient formOptions={formOptions} error={error} />;
};

export default CustomQuote;
