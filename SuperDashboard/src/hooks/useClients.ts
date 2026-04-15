import { useState, useEffect, useCallback } from 'react';
import { clientService, type Client, type ClientStats } from '../api';
import type { ClientFilters } from '../api/clientService';

export function useClients(initialFilters?: ClientFilters) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const fetchClients = useCallback(async (filters?: ClientFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await clientService.getClients(filters || initialFilters);
      setClients(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  }, [initialFilters]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return { clients, loading, error, pagination, refetch: fetchClients };
}

export function useClient(id: string) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await clientService.getClient(id);
        setClient(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch client');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  return { client, loading, error };
}

export function useClientStats() {
  const [stats, setStats] = useState<ClientStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await clientService.getStats();
        setStats(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch client stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useClientMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createClient = async (data: Partial<Client>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await clientService.createClient(data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create client';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id: string, data: Partial<Client>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await clientService.updateClient(id, data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update client';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await clientService.deleteClient(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete client';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createClient, updateClient, deleteClient, loading, error };
}
