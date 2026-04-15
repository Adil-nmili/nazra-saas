import api from './config';
import type { ApiResponse, PaginatedResponse, Invoice, InvoiceStats } from './types';

export interface InvoiceFilters {
  page?: number;
  limit?: number;
  client?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export const invoiceService = {
  // Get all invoices
  getInvoices: async (filters?: InvoiceFilters): Promise<PaginatedResponse<Invoice>> => {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.client) params.append('client', filters.client);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    
    const response = await api.get(`/invoices?${params.toString()}`);
    return response.data;
  },

  // Get invoice statistics
  getStats: async (): Promise<ApiResponse<InvoiceStats>> => {
    const response = await api.get('/invoices/stats');
    return response.data;
  },

  // Get single invoice
  getInvoice: async (id: string): Promise<ApiResponse<Invoice>> => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },

  // Create invoice
  createInvoice: async (data: Partial<Invoice>): Promise<ApiResponse<Invoice>> => {
    const response = await api.post('/invoices', data);
    return response.data;
  },

  // Update invoice
  updateInvoice: async (id: string, data: Partial<Invoice>): Promise<ApiResponse<Invoice>> => {
    const response = await api.put(`/invoices/${id}`, data);
    return response.data;
  },

  // Delete invoice
  deleteInvoice: async (id: string): Promise<ApiResponse<object>> => {
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
  },

  // Mark invoice as paid
  markAsPaid: async (id: string): Promise<ApiResponse<Invoice>> => {
    const response = await api.put(`/invoices/${id}/pay`);
    return response.data;
  },
};

export default invoiceService;
