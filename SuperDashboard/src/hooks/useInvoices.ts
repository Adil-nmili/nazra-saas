import { useState, useEffect, useCallback } from 'react';
import { invoiceService, type Invoice, type InvoiceStats } from '../api';
import type { InvoiceFilters } from '../api/invoiceService';

export function useInvoices(initialFilters?: InvoiceFilters) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });

  const fetchInvoices = useCallback(async (filters?: InvoiceFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await invoiceService.getInvoices(filters || initialFilters);
      setInvoices(response.data);
      setPagination({
        page: response.page,
        pages: response.pages,
        total: response.total,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  }, [initialFilters]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return { invoices, loading, error, pagination, refetch: fetchInvoices };
}

export function useInvoice(id: string) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await invoiceService.getInvoice(id);
        setInvoice(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch invoice');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInvoice();
    }
  }, [id]);

  return { invoice, loading, error };
}

export function useInvoiceStats() {
  const [stats, setStats] = useState<InvoiceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await invoiceService.getStats();
        setStats(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch invoice stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useInvoiceMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = async (data: Partial<Invoice>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await invoiceService.createInvoice(data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create invoice';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateInvoice = async (id: string, data: Partial<Invoice>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await invoiceService.updateInvoice(id, data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update invoice';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await invoiceService.deleteInvoice(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete invoice';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await invoiceService.markAsPaid(id);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to mark invoice as paid';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createInvoice, updateInvoice, deleteInvoice, markAsPaid, loading, error };
}
