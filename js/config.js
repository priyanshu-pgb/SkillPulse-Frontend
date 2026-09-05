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
  
  let defaultBaseUrl = 'http://127.0.0.1:8000';
  if (window.location.protocol === 'https:' && window.location.hostname !== 'localhost') {
    // Replace with your production Django backend URL
    defaultBaseUrl = window.localStorage.getItem('FIELD_ATLAS_PROD_API_URL') || 'https://skillpulse-backend.onrender.com';
  }

  const API_BASE_URL = storedUrl || defaultBaseUrl;

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
