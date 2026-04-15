import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  systemHealthService, 
  type SystemHealthData, 
  type PerformanceDataPoint, 
  type Incident 
} from '../api/systemHealthService';
import { socketService } from '../services/socketService';

// Real-time system health hook using Socket.io
export function useSystemHealth() {
  const [health, setHealth] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = socketService.connectSystemHealth();

    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', (err) => {
      setError(`Connection error: ${err.message}`);
      setIsConnected(false);
    });

    socket.on('systemHealth', (data: SystemHealthData) => {
      setHealth(data);
      setLoading(false);
      setError(null);
    });

    return () => {
      socketService.disconnectSystemHealth();
    };
  }, []);

  const refetch = useCallback(() => {
    socketService.requestRefresh();
  }, []);

  return { health, loading, error, refetch, isConnected };
}

// Real-time performance data hook using Socket.io
export function usePerformanceHistory(maxDataPoints: number = 24) {
  const [data, setData] = useState<PerformanceDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dataRef = useRef<PerformanceDataPoint[]>([]);

  useEffect(() => {
    const socket = socketService.connectSystemHealth();

    socket.on('performanceData', (newPoint: PerformanceDataPoint) => {
      dataRef.current = [...dataRef.current.slice(-(maxDataPoints - 1)), newPoint];
      setData([...dataRef.current]);
      setLoading(false);
    });

    // Initial load from API to get historical data
    const loadInitialData = async () => {
      try {
        const response = await systemHealthService.getPerformanceHistory('24h');
        dataRef.current = response.data || [];
        setData(response.data || []);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch performance history');
        setLoading(false);
      }
    };

    loadInitialData();

    return () => {
      // Socket cleanup is handled by useSystemHealth
    };
  }, [maxDataPoints]);

  const refetch = useCallback(() => {
    socketService.requestRefresh();
  }, []);

  return { data, loading, error, refetch };
}

export function useRecentIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await systemHealthService.getRecentIncidents();
      setIncidents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch incidents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  return { incidents, loading, error, refetch: fetchIncidents };
}
