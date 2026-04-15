import api from './config';
import type { ApiResponse, PaginatedResponse, Subscription, SubscriptionStats } from './types';

export interface SubscriptionFilters {
  page?: number;
  limit?: number;
  status?: string;
}

export const subscriptionService = {
  // Get all subscriptions (admin)
  getSubscriptions: async (filters?: SubscriptionFilters): Promise<PaginatedResponse<Subscription>> => {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);
    
    const response = await api.get(`/subscriptions?${params.toString()}`);
    return response.data;
  },

  // Get my subscription
  getMySubscription: async (): Promise<ApiResponse<Subscription>> => {
    const response = await api.get('/subscriptions/me');
    return response.data;
  },

  // Get subscription statistics (admin)
  getStats: async (): Promise<ApiResponse<SubscriptionStats>> => {
    const response = await api.get('/subscriptions/stats');
    return response.data;
  },

  // Create subscription
  createSubscription: async (data: { plan: string }): Promise<ApiResponse<Subscription>> => {
    const response = await api.post('/subscriptions', data);
    return response.data;
  },

  // Update subscription (admin)
  updateSubscription: async (id: string, data: Partial<Subscription>): Promise<ApiResponse<Subscription>> => {
    const response = await api.put(`/subscriptions/${id}`, data);
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async (id: string): Promise<ApiResponse<Subscription>> => {
    const response = await api.put(`/subscriptions/${id}/cancel`);
    return response.data;
  },
};

export default subscriptionService;
