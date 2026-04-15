import api from './config';
import type { ApiResponse, PaginatedResponse, Compte, CompteStats } from './types';

export interface CompteFilters {
  page?: number;
  limit?: number;
  client?: string;
  type?: string;
  status?: string;
}

export const compteService = {
  // Get all comptes
  getComptes: async (filters?: CompteFilters): Promise<PaginatedResponse<Compte>> => {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.client) params.append('client', filters.client);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    
    const response = await api.get(`/comptes?${params.toString()}`);
    return response.data;
  },

  // Get compte statistics
  getStats: async (): Promise<ApiResponse<CompteStats>> => {
    const response = await api.get('/comptes/stats');
    return response.data;
  },

  // Get single compte
  getCompte: async (id: string): Promise<ApiResponse<Compte>> => {
    const response = await api.get(`/comptes/${id}`);
    return response.data;
  },

  // Create compte
  createCompte: async (data: Partial<Compte>): Promise<ApiResponse<Compte>> => {
    const response = await api.post('/comptes', data);
    return response.data;
  },

  // Update compte
  updateCompte: async (id: string, data: Partial<Compte>): Promise<ApiResponse<Compte>> => {
    const response = await api.put(`/comptes/${id}`, data);
    return response.data;
  },

  // Delete compte
  deleteCompte: async (id: string): Promise<ApiResponse<object>> => {
    const response = await api.delete(`/comptes/${id}`);
    return response.data;
  },
};

export default compteService;
