import api from './config';
import type { ApiResponse, DashboardStats, RevenueChartData } from './types';

export interface RevenueChartFilters {
  period?: 'daily' | 'weekly' | 'monthly';
  year?: number;
}

export const dashboardService = {
  // Get dashboard statistics
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  // Get revenue chart data
  getRevenueChart: async (filters?: RevenueChartFilters): Promise<ApiResponse<RevenueChartData[]>> => {
    const params = new URLSearchParams();
    if (filters?.period) params.append('period', filters.period);
    if (filters?.year) params.append('year', filters.year.toString());
    
    const response = await api.get(`/dashboard/revenue-chart?${params.toString()}`);
    return response.data;
  },
};

export default dashboardService;
