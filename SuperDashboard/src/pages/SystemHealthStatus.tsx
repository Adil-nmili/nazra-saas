import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  RefreshCw,
  Download,
  Server,
  Database,
  Cpu,
  Shield,
  Network,
  HardDrive,
  MemoryStick,
  Globe,
  Zap,
  AlertTriangle,
  Info,
  Activity,
  BarChart3
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts'

// Mock data for system health
const systemMetrics = {
  uptime: {
    value: 99.98,
    status: 'healthy',
    trend: 'up',
    target: 99.9
  },
  responseTime: {
    value: 245,
    status: 'healthy',
    trend: 'down',
    target: 300
  },
  errorRate: {
    value: 0.12,
    status: 'healthy',
    trend: 'down',
    target: 0.5
  },
  cpuUsage: {
    value: 45,
    status: 'healthy',
    trend: 'stable',
    target: 80
  },
  memoryUsage: {
    value: 62,
    status: 'warning',
    trend: 'up',
    target: 75
  },
  diskUsage: {
    value: 78,
    status: 'warning',
    trend: 'up',
    target: 85
  },
  activeConnections: {
    value: 1247,
    status: 'healthy',
    trend: 'up',
    target: 2000
  },
  throughput: {
    value: 2.4,
    status: 'healthy',
    trend: 'up',
    target: 3.0
  }
}

const serviceStatus = [
  { 
    name: 'API Gateway', 
    status: 'operational', 
    latency: 45, 
    uptime: 99.99,
    lastIncident: '2024-02-15'
  },
  { 
    name: 'Database', 
    status: 'operational', 
    latency: 12, 
    uptime: 99.95,
    lastIncident: '2024-03-10'
  },
  { 
    name: 'Authentication', 
    status: 'degraded', 
    latency: 189, 
    uptime: 99.87,
    lastIncident: '2024-03-20'
  },
  { 
    name: 'Payment Processing', 
    status: 'operational', 
    latency: 78, 
    uptime: 99.98,
    lastIncident: '2024-01-05'
  },
  { 
    name: 'File Storage', 
    status: 'operational', 
    latency: 34, 
    uptime: 99.96,
    lastIncident: '2024-02-28'
  },
  { 
    name: 'Email Service', 
    status: 'maintenance', 
    latency: 0, 
    uptime: 99.92,
    lastIncident: '2024-03-18'
  }
]

const performanceData = [
  { time: '00:00', responseTime: 230, cpu: 42, memory: 58, errors: 2 },
  { time: '02:00', responseTime: 245, cpu: 38, memory: 55, errors: 1 },
  { time: '04:00', responseTime: 210, cpu: 35, memory: 52, errors: 0 },
  { time: '06:00', responseTime: 265, cpu: 48, memory: 61, errors: 3 },
  { time: '08:00', responseTime: 310, cpu: 65, memory: 68, errors: 5 },
  { time: '10:00', responseTime: 280, cpu: 58, memory: 64, errors: 2 },
  { time: '12:00', responseTime: 295, cpu: 62, memory: 66, errors: 4 },
  { time: '14:00', responseTime: 270, cpu: 55, memory: 63, errors: 1 },
  { time: '16:00', responseTime: 290, cpu: 60, memory: 65, errors: 3 },
  { time: '18:00', responseTime: 260, cpu: 52, memory: 61, errors: 2 },
  { time: '20:00', responseTime: 240, cpu: 45, memory: 59, errors: 1 },
  { time: '22:00', responseTime: 225, cpu: 40, memory: 57, errors: 0 }
]

const recentIncidents = [
  {
    id: 1,
    service: 'Authentication',
    severity: 'high',
    description: 'Increased latency in user authentication',
    startTime: '2024-03-20 14:30',
    endTime: '2024-03-20 15:45',
    duration: '1h 15m',
    status: 'resolved'
  },
  {
    id: 2,
    service: 'Email Service',
    severity: 'medium',
    description: 'Scheduled maintenance for infrastructure upgrade',
    startTime: '2024-03-18 02:00',
    endTime: '2024-03-18 04:00',
    duration: '2h 0m',
    status: 'completed'
  },
  {
    id: 3,
    service: 'API Gateway',
    severity: 'low',
    description: 'Minor routing issues affecting some endpoints',
    startTime: '2024-03-15 09:15',
    endTime: '2024-03-15 09:45',
    duration: '30m',
    status: 'resolved'
  }
]

const resourceUsage = [
  { name: 'CPU', usage: 45, capacity: 100, trend: 'stable' },
  { name: 'Memory', usage: 62, capacity: 100, trend: 'up' },
  { name: 'Disk', usage: 78, capacity: 100, trend: 'up' },
  { name: 'Network', usage: 34, capacity: 100, trend: 'stable' }
]

const SystemHealthStatus = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const refreshData = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  useEffect(() => {
    const interval = setInterval(refreshData, 30000) // Auto-refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'critical': return 'text-red-500'
      case 'operational': return 'text-green-500'
      case 'degraded': return 'text-yellow-500'
      case 'maintenance': return 'text-blue-500'
      case 'outage': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational': return 'default'
      case 'warning':
      case 'degraded': return 'secondary'
      case 'critical':
      case 'outage': return 'destructive'
      case 'maintenance': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational': return <CheckCircle2 className="h-4 w-4" />
      case 'warning':
      case 'degraded': return <AlertTriangle className="h-4 w-4" />
      case 'critical':
      case 'outage': return <AlertCircle className="h-4 w-4" />
      case 'maintenance': return <Clock className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const formatUptime = (uptime: number) => {
    return `${uptime}%`
  }

  const formatLatency = (latency: number) => {
    return `${latency}ms`
  }

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'responseTime' ? 'ms' : 
               entry.name === 'cpu' || entry.name === 'memory' ? '%' : ''}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const MetricCard = ({ title, value, status, trend, target, icon: Icon, unit = '' }: any) => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {value}
            {unit}
          </div>
          <div className="flex items-center justify-between mt-2">
            <Badge variant={getStatusVariant(status)} className="text-xs">
              {getStatusIcon(status)}
              <span className="ml-1 capitalize">{status}</span>
            </Badge>
            <div className="text-xs text-muted-foreground">
              Target: {target}{unit}
            </div>
          </div>
          <Progress 
            value={(value / target) * 100} 
            className="mt-2"
            indicatorClassName={getProgressColor(value, target)}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Health Status</h1>
          <p className="text-muted-foreground">
            Monitor your platform performance and service availability
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Uptime"
          value={systemMetrics.uptime.value}
          status={systemMetrics.uptime.status}
          trend={systemMetrics.uptime.trend}
          target={systemMetrics.uptime.target}
          icon={Server}
          unit="%"
        />
        <MetricCard
          title="Response Time"
          value={systemMetrics.responseTime.value}
          status={systemMetrics.responseTime.status}
          trend={systemMetrics.responseTime.trend}
          target={systemMetrics.responseTime.target}
          icon={Zap}
          unit="ms"
        />
        <MetricCard
          title="Error Rate"
          value={systemMetrics.errorRate.value}
          status={systemMetrics.errorRate.status}
          trend={systemMetrics.errorRate.trend}
          target={systemMetrics.errorRate.target}
          icon={AlertCircle}
          unit="%"
        />
        <MetricCard
          title="Active Connections"
          value={systemMetrics.activeConnections.value}
          status={systemMetrics.activeConnections.status}
          trend={systemMetrics.activeConnections.trend}
          target={systemMetrics.activeConnections.target}
          icon={Network}
        />
      </div>

      {/* Performance Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Response Time & CPU Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Response time and resource usage over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Response Time (ms)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cpu"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="CPU Usage (%)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="memory"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Memory Usage (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Error Rate & Resource Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Error Rate & Resource Usage</CardTitle>
            <CardDescription>
              System errors and resource consumption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="errors" 
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    name="Errors (count)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status & Recent Incidents */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>
              Current status of all platform services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceStatus.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      service.status === 'operational' ? 'bg-green-50' :
                      service.status === 'degraded' ? 'bg-yellow-50' :
                      service.status === 'maintenance' ? 'bg-blue-50' : 'bg-red-50'
                    }`}>
                      {getStatusIcon(service.status)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Latency: {formatLatency(service.latency)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusVariant(service.status)} className="mb-1">
                      {service.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Uptime: {formatUptime(service.uptime)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>
              Past system incidents and maintenance events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        incident.severity === 'high' ? 'destructive' :
                        incident.severity === 'medium' ? 'secondary' : 'outline'
                      }>
                        {incident.severity}
                      </Badge>
                      <span className="font-medium text-sm">{incident.service}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {incident.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {incident.description}
                  </p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{incident.startTime}</span>
                    <span>{incident.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage Details */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
          <CardDescription>
            Detailed breakdown of system resource usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resourceUsage.map((resource, index) => (
              <div key={resource.name} className="text-center">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full border-4 border-gray-200 flex items-center justify-center">
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-blue-500"
                      style={{
                        clipPath: `inset(0 ${100 - resource.usage}% 0 0)`
                      }}
                    />
                    <span className="text-lg font-bold relative z-10">
                      {resource.usage}%
                    </span>
                  </div>
                </div>
                <p className="font-medium mt-2">{resource.name}</p>
                <p className="text-sm text-muted-foreground">
                  {resource.trend === 'up' ? 'Increasing' : 
                   resource.trend === 'down' ? 'Decreasing' : 'Stable'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Active warnings and critical notifications
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              <AlertTriangle className="h-3 w-3 mr-1" />
              2 Active Alerts
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-sm">Memory Usage High</p>
                  <p className="text-sm text-yellow-700">
                    Memory usage at 62% and increasing
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-sm">Disk Space Warning</p>
                  <p className="text-sm text-yellow-700">
                    Disk usage at 78%, consider cleanup
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SystemHealthStatus