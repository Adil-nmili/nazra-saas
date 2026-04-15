import api from './config';
import type { ApiResponse, PaginatedResponse, Client, ClientStats } from './types';

export interface ClientFilters {
  page?: number;
  limit?: number;
  search?: string;
  segment?: string;
  status?: string;
}

export const clientService = {
  // Get all clients
  getClients: async (filters?: ClientFilters): Promise<PaginatedResponse<Client>> => {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.segment) params.append('segment', filters.segment);
    if (filters?.status) params.append('status', filters.status);
    
    const response = await api.get(`/clients?${params.toString()}`);
    return response.data;
  },

  // Get client statistics
  getStats: async (): Promise<ApiResponse<ClientStats>> => {
    const response = await api.get('/clients/stats');
    return response.data;
  },

  // Get single client
  getClient: async (id: string): Promise<ApiResponse<Client>> => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  // Create client
  createClient: async (data: Partial<Client>): Promise<ApiResponse<Client>> => {
    const response = await api.post('/clients', data);
    return response.data;
  },

  // Update client
  updateClient: async (id: string, data: Partial<Client>): Promise<ApiResponse<Client>> => {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  },

  // Delete client
  deleteClient: async (id: string): Promise<ApiResponse<object>> => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
  },
};

export default clientService;
