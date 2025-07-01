import axios from 'axios';
import { API_BASE_URL } from '../config/app.constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors (e.g., for auth token)
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    if (config.data) {
      console.log('[API Request Data]', config.data);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url} Status: ${response.status}`);
    if (response.data) {
      console.log('[API Response Data]', response.data);
    }
    return response;
  },
  async (error) => {
    console.error('[API Response Error]', error.response || error.message || error);
    if (error.response) {
      // If the error has a response, it means the server responded with an error status (e.g., 401, 400)
      // We resolve the promise with the response data so that the calling service can handle the ApiResponse structure.
      return Promise.resolve(error.response);
    }
    // For network errors or other errors without a response, reject the promise with the original error
    return Promise.reject(error);
  }
);

export default api;
