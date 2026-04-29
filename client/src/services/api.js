import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Configure interceptor to inject Firebase Token
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  // Check if Authorization is already set (case-insensitive for typical usage)
  const hasAuthHeader = config.headers?.Authorization || config.headers?.authorization;
  if (token && token !== 'undefined' && token !== 'null' && !hasAuthHeader) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Configure robust response interceptor targeting state wiping defaults
api.interceptors.response.use(
  (response) => response,
  (error) => {
      // 401 Unauthorized or 403 Forbidden catches API boundary faults inherently
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.warn('Authentication fault logged from server. Resetting generic states...');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Navigate absolutely overriding dynamic react-router states completely
          window.location.href = '/login';
      }
      return Promise.reject(error);
  }
);

export default api;
