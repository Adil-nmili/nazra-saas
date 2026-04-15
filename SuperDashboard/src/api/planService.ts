import api from './config';
import type { ApiResponse, Plan } from './types';

export const planService = {
  // Get all plans (public)
  getPlans: async (): Promise<ApiResponse<Plan[]>> => {
    const response = await api.get('/plans');
    return response.data;
  },

  // Get single plan (public)
  getPlan: async (id: string): Promise<ApiResponse<Plan>> => {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  },

  // Create plan (admin)
  createPlan: async (data: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    const response = await api.post('/plans', data);
    return response.data;
  },

  // Update plan (admin)
  updatePlan: async (id: string, data: Partial<Plan>): Promise<ApiResponse<Plan>> => {
    const response = await api.put(`/plans/${id}`, data);
    return response.data;
  },

  // Delete plan (admin)
  deletePlan: async (id: string): Promise<ApiResponse<object>> => {
    const response = await api.delete(`/plans/${id}`);
    return response.data;
  },
};

export default planService;
