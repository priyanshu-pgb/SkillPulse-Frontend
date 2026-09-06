/**
 * FIELD ATLAS / SKILLPULSE — CLIENT CONFIGURATION
 * Configures the backend REST API base URL and client environment.
 */
window.FIELD_ATLAS_CONFIG = (function() {
  'use strict';

  // Determine API base URL
  // 1. Check localStorage for user-configured custom endpoint
  // 2. Fallback to localhost:8000 if opened on localhost / 127.0.0.1 or file:
  // 3. Fallback to production backend URL if deployed to Vercel/Netlify
  const storedUrl = window.localStorage.getItem('FIELD_ATLAS_API_BASE_URL');
  
  // Always use the stable backend alias URL in production
  // This URL is a Vercel alias that always points to the latest backend deployment
  const PRODUCTION_BACKEND_URL = 'https://skillpulse-backend.vercel.app';

  let defaultBaseUrl = 'http://127.0.0.1:8000';
  if (window.location.protocol === 'https:' && window.location.hostname !== 'localhost') {
    defaultBaseUrl = PRODUCTION_BACKEND_URL;
  }

  // Always clear any stale custom URLs on production to avoid hitting dead endpoints
  // In production, always use the hardcoded stable alias — never stale localStorage values
  if (window.location.protocol === 'https:') {
    window.localStorage.removeItem('FIELD_ATLAS_API_BASE_URL');
    window.localStorage.removeItem('FIELD_ATLAS_PROD_API_URL');
  }
  // On production, ignore storedUrl (it's stale or cleared above). Use defaultBaseUrl.
  const API_BASE_URL = (window.location.protocol === 'https:' && window.location.hostname !== 'localhost')
    ? defaultBaseUrl
    : (storedUrl || defaultBaseUrl);

  return {
    API_BASE_URL: API_BASE_URL,
    
    // Set a custom backend URL dynamically
    setApiBaseUrl: function(url) {
      if (url) {
        window.localStorage.setItem('FIELD_ATLAS_API_BASE_URL', url.replace(/\/+$/, ''));
      } else {
        window.localStorage.removeItem('FIELD_ATLAS_API_BASE_URL');
      }
      window.location.reload();
    },

    // Reset to default
    resetApiBaseUrl: function() {
      window.localStorage.removeItem('FIELD_ATLAS_API_BASE_URL');
      window.location.reload();
    }
  };
})();
