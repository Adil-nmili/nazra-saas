import { useState, useEffect, useCallback } from 'react';
import { companyService, type Company } from '../api';

export function useCompany() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await companyService.getCompany();
      setCompany(response.data);
    } catch (err) {
      // If no company exists yet, that's okay
      if (err instanceof Error && err.message.includes('404')) {
        setCompany(null);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to fetch company');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return { company, loading, error, refetch: fetchCompany };
}

export function useCompanyMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upsertCompany = async (data: Partial<Company>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await companyService.upsertCompany(data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save company';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (data: Partial<Company>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await companyService.updateCompany(data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update company';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { upsertCompany, updateCompany, loading, error };
}
