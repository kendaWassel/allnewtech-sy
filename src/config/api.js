export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000',
  endpoints: {
    reviews: '/api/reviews',
    latestNews: '/api/latest-news',
    companies: '/api/companies',
    projects: '/api/projects/simple',
    portfolioProjects: '/api/projects',
    services: '/api/services',
    contactForm: '/api/contact-us-form-data',
    contactSubmit: '/api/contact-us',
    locations: '/api/locations',
    siteVisitForm: '/api/book-a-site-visit-form-data',
    siteVisitSubmit: '/api/book-a-site-visit',
    customQuoteForm: '/api/request-for-a-quote-form-data',
    customQuoteSubmit: '/api/request-for-a-quote',
  },
  timeout: 10000,
};

export const getApiUrl = (endpoint) => `${apiConfig.baseURL}${endpoint}`;

export const getImageUrl = (path) => {
  if (!path || typeof path !== 'string') return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = apiConfig.baseURL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
};

// For server components (GET requests)
export const fetchFromAPI = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.msg || 'API request was not successful');
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') throw new Error('Request timeout: The server took too long to respond');
    throw error;
  }
};

// For client components (POST requests)
export const postToAPI = async (endpoint, payload, isFormData = false) => {
  const url = getApiUrl(endpoint);
  const options = {
    method: 'POST',
    body: isFormData ? payload : JSON.stringify(payload),
  };
  if (!isFormData) {
    options.headers = { 'Content-Type': 'application/json' };
  }
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Failed to submit: ${response.status} ${response.statusText}`);
  const data = await response.json();
  if (!data.success) throw new Error(data.msg || 'Failed to submit');
  return data;
};