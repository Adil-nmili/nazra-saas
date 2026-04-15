import api from './config';
import type { ApiResponse, AuthResponse, LoginCredentials, RegisterData, User } from './types';

export const authService = {
  // Register a new user
  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.get('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.put('/auth/updatepassword', { currentPassword, newPassword });
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get stored user
  getStoredUser: (): AuthResponse | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get stored token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
};

export default authService;
