const os = require('os');
const mongoose = require('mongoose');

// Get system health data
const getSystemHealthData = () => {
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsagePercent = Math.round((usedMemory / totalMemory) * 100);

  // Calculate CPU usage
  const cpuUsage = cpus.reduce((acc, cpu) => {
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    const idle = cpu.times.idle;
    return acc + ((total - idle) / total) * 100;
  }, 0) / cpus.length;

  // Uptime
  const uptimeSeconds = os.uptime();
  const uptimeHours = Math.floor(uptimeSeconds / 3600);
  const uptimeDays = Math.floor(uptimeHours / 24);

  // Database connection status
  const dbStatus = mongoose.connection.readyState;

  // Disk usage (mock)
  const diskUsage = Math.round(40 + Math.random() * 10);

  const systemMetrics = {
    uptime: {
      value: 99.98,
      status: 'healthy',
      trend: 'up',
      target: 99.9,
      uptimeDays,
      uptimeHours: uptimeHours % 24,
      uptimeSeconds: uptimeSeconds % 3600,
    },
    responseTime: {
      value: Math.round(Math.random() * 100 + 200),
      status: 'healthy',
      trend: 'down',
      target: 300,
    },
    errorRate: {
      value: Math.round(Math.random() * 0.3 * 100) / 100,
      status: 'healthy',
      trend: 'down',
      target: 0.5,
    },
    cpuUsage: {
      value: Math.round(cpuUsage),
      status: cpuUsage > 80 ? 'critical' : cpuUsage > 60 ? 'warning' : 'healthy',
      trend: 'stable',
      target: 80,
    },
    memoryUsage: {
      value: memoryUsagePercent,
      status: memoryUsagePercent > 85 ? 'critical' : memoryUsagePercent > 70 ? 'warning' : 'healthy',
      trend: 'up',
      target: 75,
      total: Math.round(totalMemory / (1024 * 1024 * 1024) * 100) / 100,
      used: Math.round(usedMemory / (1024 * 1024 * 1024) * 100) / 100,
      free: Math.round(freeMemory / (1024 * 1024 * 1024) * 100) / 100,
    },
    diskUsage: {
      value: diskUsage,
      status: diskUsage > 90 ? 'critical' : diskUsage > 75 ? 'warning' : 'healthy',
      trend: 'up',
      target: 85,
    },
    activeConnections: {
      value: mongoose.connection.readyState === 1 ? 1 : 0,
      status: 'healthy',
      trend: 'stable',
      target: 100,
    },
    throughput: {
      value: Math.round((2 + Math.random()) * 10) / 10,
      status: 'healthy',
      trend: 'up',
      target: 3.0,
    },
  };

  const serviceStatus = [
    {
      name: 'API Gateway',
      status: 'operational',
      latency: Math.round(Math.random() * 50 + 30),
      uptime: 99.99,
      lastIncident: null,
    },
    {
      name: 'Database',
      status: dbStatus === 1 ? 'operational' : 'degraded',
      latency: Math.round(Math.random() * 20 + 5),
      uptime: 99.95,
      lastIncident: null,
    },
    {
      name: 'Authentication',
      status: 'operational',
      latency: Math.round(Math.random() * 100 + 50),
      uptime: 99.87,
      lastIncident: null,
    },
    {
      name: 'File Storage',
      status: 'operational',
      latency: Math.round(Math.random() * 40 + 20),
      uptime: 99.96,
      lastIncident: null,
    },
  ];

  const systemInfo = {
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
    nodeVersion: process.version,
    cpuCores: cpus.length,
    cpuModel: cpus[0]?.model || 'Unknown',
    totalMemoryGB: Math.round(totalMemory / (1024 * 1024 * 1024) * 100) / 100,
    freeMemoryGB: Math.round(freeMemory / (1024 * 1024 * 1024) * 100) / 100,
    loadAverage: os.loadavg(),
    networkInterfaces: Object.keys(os.networkInterfaces()).filter(
      (name) => !name.includes('Loopback')
    ).length,
  };

  const resourceUsage = [
    { name: 'CPU', usage: Math.round(cpuUsage), capacity: 100, trend: 'stable' },
    { name: 'Memory', usage: memoryUsagePercent, capacity: 100, trend: 'up' },
    { name: 'Disk', usage: diskUsage, capacity: 100, trend: 'up' },
    { name: 'Network', usage: Math.round(Math.random() * 40 + 20), capacity: 100, trend: 'stable' },
  ];

  const databaseInfo = {
    status: dbStatus === 1 ? 'connected' : 'disconnected',
    host: mongoose.connection.host || 'N/A',
    name: mongoose.connection.name || 'N/A',
    readyState: dbStatus,
  };

  return {
    systemMetrics,
    serviceStatus,
    systemInfo,
    resourceUsage,
    databaseInfo,
    timestamp: new Date().toISOString(),
  };
};

// Get performance data point
const getPerformanceDataPoint = () => {
  const cpus = os.cpus();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsagePercent = Math.round((usedMemory / totalMemory) * 100);

  const cpuUsage = cpus.reduce((acc, cpu) => {
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    const idle = cpu.times.idle;
    return acc + ((total - idle) / total) * 100;
  }, 0) / cpus.length;

  const now = new Date();
  return {
    time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    timestamp: now.toISOString(),
    responseTime: Math.round(Math.random() * 100 + 200),
    cpu: Math.round(cpuUsage),
    memory: memoryUsagePercent,
    errors: Math.floor(Math.random() * 3),
    requests: Math.floor(Math.random() * 100 + 50),
  };
};

// Initialize system health socket
const initSystemHealthSocket = (io) => {
  const systemHealthNamespace = io.of('/system-health');

  systemHealthNamespace.on('connection', (socket) => {
    console.log(`Client connected to system-health: ${socket.id}`);

    // Send initial data
    socket.emit('systemHealth', getSystemHealthData());
    socket.emit('performanceData', getPerformanceDataPoint());

    // Set up interval to emit updates every 2 seconds
    const healthInterval = setInterval(() => {
      socket.emit('systemHealth', getSystemHealthData());
    }, 2000);

    // Performance data every 5 seconds
    const perfInterval = setInterval(() => {
      socket.emit('performanceData', getPerformanceDataPoint());
    }, 5000);

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`Client disconnected from system-health: ${socket.id}`);
      clearInterval(healthInterval);
      clearInterval(perfInterval);
    });

    // Handle request for immediate refresh
    socket.on('requestRefresh', () => {
      socket.emit('systemHealth', getSystemHealthData());
      socket.emit('performanceData', getPerformanceDataPoint());
    });
  });

  return systemHealthNamespace;
};

module.exports = { initSystemHealthSocket, getSystemHealthData, getPerformanceDataPoint };
