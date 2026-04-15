import api from './config';
import type { ApiResponse } from './types';

// System Health types
export interface SystemMetric {
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  target: number;
  [key: string]: any;
}

export interface SystemMetrics {
  uptime: SystemMetric & { uptimeDays: number; uptimeHours: number };
  responseTime: SystemMetric;
  errorRate: SystemMetric;
  cpuUsage: SystemMetric;
  memoryUsage: SystemMetric & { total: number; used: number; free: number };
  diskUsage: SystemMetric;
  activeConnections: SystemMetric;
  throughput: SystemMetric;
}

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  latency: number;
  uptime: number;
  lastIncident: string | null;
}

export interface SystemInfo {
  platform: string;
  arch: string;
  hostname: string;
  nodeVersion: string;
  cpuCores: number;
  cpuModel: string;
  totalMemoryGB: number;
  freeMemoryGB: number;
  loadAverage: number[];
  networkInterfaces: number;
}

export interface ResourceUsage {
  name: string;
  usage: number;
  capacity: number;
  trend: 'up' | 'down' | 'stable';
}

export interface DatabaseInfo {
  status: string;
  host: string;
  name: string;
  readyState: number;
}

export interface SystemHealthData {
  systemMetrics: SystemMetrics;
  serviceStatus: ServiceStatus[];
  systemInfo: SystemInfo;
  resourceUsage: ResourceUsage[];
  databaseInfo: DatabaseInfo;
  timestamp: string;
}

export interface PerformanceDataPoint {
  time: string;
  timestamp: string;
  responseTime: number;
  cpu: number;
  memory: number;
  errors: number;
  requests: number;
}

export interface Incident {
  id: number;
  service: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  startTime: string;
  endTime: string;
  duration: string;
  status: 'active' | 'resolved' | 'completed';
}

export const systemHealthService = {
  // Get system health status
  getSystemHealth: async (): Promise<ApiResponse<SystemHealthData>> => {
    const response = await api.get('/system-health');
    return response.data;
  },

  // Get performance history
  getPerformanceHistory: async (timeRange: string = '24h'): Promise<ApiResponse<PerformanceDataPoint[]>> => {
    const response = await api.get(`/system-health/performance?timeRange=${timeRange}`);
    return response.data;
  },

  // Get recent incidents
  getRecentIncidents: async (): Promise<ApiResponse<Incident[]>> => {
    const response = await api.get('/system-health/incidents');
    return response.data;
  },
};

export default systemHealthService;
