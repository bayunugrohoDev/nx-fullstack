// src/app/services/auth.service.ts
import api from './api';
import { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', payload);
    return response.data; // Axios membungkus respons di .data
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', payload);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Jika logout di backend Anda memerlukan POST request ke API, lakukan di sini.
    // await api.post('/auth/logout');
    console.log('User logged out (client-side simulation)');
    // Di sini Anda mungkin juga ingin menghapus token dari penyimpanan lokal
  },
};