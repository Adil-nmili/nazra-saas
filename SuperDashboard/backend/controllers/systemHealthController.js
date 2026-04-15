const os = require('os');
const mongoose = require('mongoose');

// @desc    Get system health status
// @route   GET /api/system-health
// @access  Private/Admin
exports.getSystemHealth = async (req, res, next) => {
  try {
    // System metrics
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
    const dbStatusMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    // Disk usage (mock for now - would need additional library like 'diskusage')
    const diskUsage = 45; // Percentage

    // Network info
    const networkInterfaces = os.networkInterfaces();
    const activeInterfaces = Object.keys(networkInterfaces).filter(
      (name) => !name.includes('Loopback')
    ).length;

    // System metrics
    const systemMetrics = {
      uptime: {
        value: 99.98, // Could calculate from actual logs
        status: 'healthy',
        trend: 'up',
        target: 99.9,
        uptimeDays,
        uptimeHours: uptimeHours % 24,
      },
      responseTime: {
        value: Math.round(Math.random() * 100 + 200), // In production, track actual response times
        status: 'healthy',
        trend: 'down',
        target: 300,
      },
      errorRate: {
        value: 0.12,
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
        total: Math.round(totalMemory / (1024 * 1024 * 1024) * 100) / 100, // GB
        used: Math.round(usedMemory / (1024 * 1024 * 1024) * 100) / 100, // GB
        free: Math.round(freeMemory / (1024 * 1024 * 1024) * 100) / 100, // GB
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
        value: 2.4,
        status: 'healthy',
        trend: 'up',
        target: 3.0,
      },
    };

    // Service status
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

    // System info
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
      networkInterfaces: activeInterfaces,
    };

    // Resource usage
    const resourceUsage = [
      { name: 'CPU', usage: Math.round(cpuUsage), capacity: 100, trend: 'stable' },
      { name: 'Memory', usage: memoryUsagePercent, capacity: 100, trend: 'up' },
      { name: 'Disk', usage: diskUsage, capacity: 100, trend: 'up' },
      { name: 'Network', usage: 34, capacity: 100, trend: 'stable' },
    ];

    // Database info
    const databaseInfo = {
      status: dbStatusMap[dbStatus] || 'unknown',
      host: mongoose.connection.host || 'N/A',
      name: mongoose.connection.name || 'N/A',
      readyState: dbStatus,
    };

    res.status(200).json({
      success: true,
      data: {
        systemMetrics,
        serviceStatus,
        systemInfo,
        resourceUsage,
        databaseInfo,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get performance history (for charts)
// @route   GET /api/system-health/performance
// @access  Private/Admin
exports.getPerformanceHistory = async (req, res, next) => {
  try {
    const { timeRange = '24h' } = req.query;
    
    // Generate mock performance data based on time range
    // In production, this would come from a time-series database or logs
    const dataPoints = timeRange === '1h' ? 12 : timeRange === '6h' ? 24 : 24;
    const interval = timeRange === '1h' ? 5 : timeRange === '6h' ? 15 : 60;
    
    const performanceData = [];
    const now = new Date();
    
    for (let i = dataPoints - 1; i >= 0; i--) {
      const time = new Date(now.getTime() - i * interval * 60 * 1000);
      performanceData.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        timestamp: time.toISOString(),
        responseTime: Math.round(Math.random() * 100 + 200),
        cpu: Math.round(Math.random() * 40 + 30),
        memory: Math.round(Math.random() * 20 + 50),
        errors: Math.floor(Math.random() * 5),
        requests: Math.floor(Math.random() * 500 + 100),
      });
    }

    res.status(200).json({
      success: true,
      data: performanceData,
      timeRange,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent incidents
// @route   GET /api/system-health/incidents
// @access  Private/Admin
exports.getRecentIncidents = async (req, res, next) => {
  try {
    // In production, this would come from an incidents database/log
    const recentIncidents = [
      {
        id: 1,
        service: 'Authentication',
        severity: 'high',
        description: 'Increased latency in user authentication',
        startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 75 * 60 * 1000).toISOString(),
        duration: '1h 15m',
        status: 'resolved',
      },
      {
        id: 2,
        service: 'Database',
        severity: 'medium',
        description: 'Scheduled maintenance for infrastructure upgrade',
        startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 120 * 60 * 1000).toISOString(),
        duration: '2h 0m',
        status: 'completed',
      },
    ];

    res.status(200).json({
      success: true,
      data: recentIncidents,
    });
  } catch (error) {
    next(error);
  }
};
