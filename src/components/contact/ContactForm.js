import { getApiUrl, apiConfig } from '@/config/api';
import ContactFormClient from './ContactFormClient';

const ContactForm = async () => {
  let services = [];
  let propertyTypes = [];
  let locations = [];
  let error = null;

  try {
    const [formRes, locationsRes] = await Promise.all([
      fetch(getApiUrl(apiConfig.endpoints.contactForm), { cache: 'no-store' }),
      fetch(getApiUrl(apiConfig.endpoints.locations), { cache: 'no-store' }),
    ]);

    const formData = await formRes.json();
    if (formData.success) {
      services = formData.data.services;
      propertyTypes = formData.data.propertyType;
    }

    const locationsData = await locationsRes.json();
    if (locationsData.success && Array.isArray(locationsData.data)) {
      locations = locationsData.data;
    }
    
  } catch (err) {
    error = err.message || 'Failed to load contact form data. Please try again later.';
    services = [];
    propertyTypes = [];
    locations = [];
  }

  return (
    <ContactFormClient
      services={services}
      propertyTypes={propertyTypes}
      locations={locations}
      error={error}
    />
  );
};

export default ContactForm;
