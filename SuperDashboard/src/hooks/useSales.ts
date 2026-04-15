import { useState, useEffect, useCallback } from 'react';
import { saleService, type Sale, type SalesStats } from '../api';
import type { SaleFilters } from '../api/saleService';

export function useSales(initialFilters?: SaleFilters) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const fetchSales = useCallback(async (filters?: SaleFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await saleService.getSales(filters || initialFilters);
      setSales(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sales');
    } finally {
      setLoading(false);
    }
  }, [initialFilters]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return { sales, loading, error, pagination, refetch: fetchSales };
}

export function useSalesStats() {
  const [stats, setStats] = useState<SalesStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await saleService.getStats();
        setStats(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch sales stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useSaleMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSale = async (data: Partial<Sale>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await saleService.createSale(data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create sale';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSale = async (id: string, data: Partial<Sale>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await saleService.updateSale(id, data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update sale';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSale = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await saleService.deleteSale(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete sale';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSale, updateSale, deleteSale, loading, error };
}
