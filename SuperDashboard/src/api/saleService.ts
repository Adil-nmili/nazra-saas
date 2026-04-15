import api from './config';
import type { ApiResponse, PaginatedResponse, Sale, SalesStats } from './types';

export interface SaleFilters {
  page?: number;
  limit?: number;
  client?: string;
  status?: string;
  paymentMethod?: string;
  startDate?: string;
  endDate?: string;
}

export const saleService = {
  // Get all sales
  getSales: async (filters?: SaleFilters): Promise<PaginatedResponse<Sale>> => {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.client) params.append('client', filters.client);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    
    const response = await api.get(`/sales?${params.toString()}`);
    return response.data;
  },

  // Get sales statistics
  getStats: async (): Promise<ApiResponse<SalesStats>> => {
    const response = await api.get('/sales/stats');
    return response.data;
  },

  // Get single sale
  getSale: async (id: string): Promise<ApiResponse<Sale>> => {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  },

  // Create sale
  createSale: async (data: Partial<Sale>): Promise<ApiResponse<Sale>> => {
    const response = await api.post('/sales', data);
    return response.data;
  },

  // Update sale
  updateSale: async (id: string, data: Partial<Sale>): Promise<ApiResponse<Sale>> => {
    const response = await api.put(`/sales/${id}`, data);
    return response.data;
  },

  // Delete sale
  deleteSale: async (id: string): Promise<ApiResponse<object>> => {
    const response = await api.delete(`/sales/${id}`);
    return response.data;
  },
};

export default saleService;
