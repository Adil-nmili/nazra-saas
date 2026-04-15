import { useState, useEffect, useCallback } from 'react';
import { planService, type Plan } from '../api';

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await planService.getPlans();
      setPlans(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, loading, error, refetch: fetchPlans };
}

export function usePlan(id: string) {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await planService.getPlan(id);
        setPlan(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch plan');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlan();
    }
  }, [id]);

  return { plan, loading, error };
}

export function usePlanMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPlan = async (data: Partial<Plan>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await planService.createPlan(data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create plan';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (id: string, data: Partial<Plan>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await planService.updatePlan(id, data);
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update plan';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await planService.deletePlan(id);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete plan';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createPlan, updatePlan, deletePlan, loading, error };
}
