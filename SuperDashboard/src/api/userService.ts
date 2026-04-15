import api from './config';
import type { ApiResponse, PaginatedResponse, User } from './types';

export interface UserFilters {
  page?: number;
  limit?: number;
}

export const userService = {
  // Get all users
  getUsers: async (filters?: UserFilters): Promise<PaginatedResponse<User>> => {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const response = await api.get(`/users?${params.toString()}`);
    return response.data;
  },

  // Get single user
  getUser: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create user
  createUser: async (data: Partial<User> & { password: string }): Promise<ApiResponse<User>> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  // Update user
  updateUser: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: string): Promise<ApiResponse<object>> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default userService;
