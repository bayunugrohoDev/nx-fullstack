import axios from 'axios';
import { API_BASE_URL } from '../config/app.constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors (e.g., for auth token)
api.interceptors.request.use(async (config) => {
  // const token = await getAuthToken(); // If you implement token storage
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// Add response interceptors (e.g., for error handling, token refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      console.log('Unauthorized request, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default api;
