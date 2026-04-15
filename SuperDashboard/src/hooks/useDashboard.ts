import { useState, useEffect } from 'react';
import { dashboardService, type DashboardStats, type RevenueChartData } from '../api';
import type { RevenueChartFilters } from '../api/dashboardService';

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getStats();
      setStats(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}

export function useRevenueChart(filters?: RevenueChartFilters) {
  const [data, setData] = useState<RevenueChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await dashboardService.getRevenueChart(filters);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch revenue chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters?.period, filters?.year]);

  return { data, loading, error };
}
