/**
 * API Configuration
 * Centralized configuration for backend API endpoints
 */

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
  },
  timeout: 10000,
};

/**
 * Get full API URL for an endpoint
 * @param {string} endpoint - API endpoint path
 * @returns {string} Full API URL
 */
export const getApiUrl = (endpoint) => {
  return `${apiConfig.baseURL}${endpoint}`;
};

/**
 * Build full image URL from API response (handles relative paths)
 * @param {string} path - Image path from API (relative or absolute)
 * @returns {string} Full URL for Next.js Image
 */
export const getImageUrl = (path) => {
  if (!path || typeof path !== 'string') return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = apiConfig.baseURL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
};

/**
 * Fetch data from API with error handling
 * @param {string} endpoint - API endpoint path
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>} API response data
 */
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

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.msg || 'API request was not successful');
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout: The server took too long to respond');
    }
    
    throw error;
  }
};
