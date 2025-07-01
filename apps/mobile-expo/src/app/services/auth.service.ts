// src/app/services/auth.service.ts
import api from './api';
import { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth';
import { LoginResponse, ApiResponse } from '@glibs/types';

export const authService = {
  login: async (payload: LoginPayload): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', payload);
    console.log('response :', response);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', payload);
    return response.data;
  },

  logout: async (): Promise<void> => {
    // Jika logout di backend Anda memerlukan POST request ke API, lakukan di sini.
    // await api.post('/auth/logout');
    console.log('User logged out (client-side simulation)');
    // Di sini Anda mungkin juga ingin menghapus token dari penyimpanan lokal
  },
};