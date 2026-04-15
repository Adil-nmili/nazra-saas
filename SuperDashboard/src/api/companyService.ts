import api from './config';
import type { ApiResponse, Company } from './types';

export const companyService = {
  // Get company info
  getCompany: async (): Promise<ApiResponse<Company>> => {
    const response = await api.get('/company');
    return response.data;
  },

  // Create or update company info
  upsertCompany: async (data: Partial<Company>): Promise<ApiResponse<Company>> => {
    const response = await api.post('/company', data);
    return response.data;
  },

  // Update company info
  updateCompany: async (data: Partial<Company>): Promise<ApiResponse<Company>> => {
    const response = await api.put('/company', data);
    return response.data;
  },
};

export default companyService;
