import { useState, useEffect, useCallback } from 'react';
import { compteService, type Compte, type CompteStats } from '../api';
import type { CompteFilters } from '../api/compteService';

export function useComptes(initialFilters?: CompteFilters) {
  const [comptes, setComptes] = useState<Compte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const fetchComptes = useCallback(async (filters?: CompteFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await compteService.getComptes(filters || initialFilters);
      setComptes(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comptes');
    } finally {
      setLoading(false);
    }
  }, [initialFilters]);

  useEffect(() => {
    fetchComptes();
  }, [fetchComptes]);

  return { comptes, loading, error, pagination, refetch: fetchComptes };
}

export function useCompte(id: string) {
  const [compte, setCompte] = useState<Compte | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompte = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await compteService.getCompte(id);
        setCompte(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch compte');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompte();
    }
  }, [id]);

  return { compte, loading, error };
}

export function useCompteStats() {
  const [stats, setStats] = useState<CompteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await compteService.getStats();
        setStats(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch compte stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useCompteMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCompte = async (data: Partial<Compte>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await compteService.createCompte(data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create compte';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const updateCompte = async (id: string, data: Partial<Compte>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await compteService.updateCompte(id, data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update compte';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompte = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await compteService.deleteCompte(id);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete compte';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createCompte, updateCompte, deleteCompte, loading, error };
}
