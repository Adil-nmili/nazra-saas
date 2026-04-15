import { useState, useEffect } from 'react'
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
import { Skeleton } from '@/components/ui/skeleton'
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
import { useSystemHealth, usePerformanceHistory, useRecentIncidents } from '@/hooks/useSystemHealth'

const SystemHealthStatus = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Fetch data from API with real-time socket updates
  const { health, loading: healthLoading, error: healthError, refetch: refetchHealth, isConnected } = useSystemHealth()
  const { data: performanceData, loading: perfLoading, refetch: refetchPerformance } = usePerformanceHistory(24)
  const { incidents: recentIncidents, loading: incidentsLoading, refetch: refetchIncidents } = useRecentIncidents()

  // Extract data from health response
  const systemMetrics = health?.systemMetrics
  const serviceStatus = health?.serviceStatus || []
  const resourceUsage = health?.resourceUsage || []
  const systemInfo = health?.systemInfo

  // Update lastUpdated when health data changes (real-time)
  useEffect(() => {
    if (health?.timestamp) {
      setLastUpdated(new Date(health.timestamp))
    }
  }, [health?.timestamp])

  const refreshData = () => {
    refetchHealth()
    refetchPerformance()
    refetchIncidents()
  }

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

  const MetricCard = ({ title, value, status, trend, target, icon: Icon, unit = '', loading = false }: any) => {
    if (loading) {
      return (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-2" />
            <div className="flex items-center justify-between mt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-2 w-full mt-2" />
          </CardContent>
        </Card>
      )
    }
    return (
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold transition-all duration-500 ease-out">
            {value}
            {unit}
          </div>
          <div className="flex items-center justify-between mt-2">
            <Badge variant={getStatusVariant(status)} className="text-xs transition-colors duration-300">
              {getStatusIcon(status)}
              <span className="ml-1 capitalize">{status}</span>
            </Badge>
            <div className="text-xs text-muted-foreground">
              Target: {target}{unit}
            </div>
          </div>
          <Progress 
            value={(value / target) * 100} 
            className="mt-2 transition-all duration-500"
            indicatorClassName={`${getProgressColor(value, target)} transition-all duration-500`}
          />
        </CardContent>
      </Card>
    )
  }

  // Show error state
  if (healthError && !isConnected) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium">Failed to load system health</h3>
          <p className="text-muted-foreground mb-4">{healthError}</p>
          <Button onClick={refreshData}>Try Again</Button>
        </div>
      </div>
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
          {/* Real-time connection indicator */}
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              isConnected 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}>
              <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
              <span>{isConnected ? 'Live' : 'Connecting...'}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {lastUpdated.toLocaleTimeString()}
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
          <Button variant="outline" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
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
          value={systemMetrics?.uptime?.value ?? 0}
          status={systemMetrics?.uptime?.status ?? 'healthy'}
          trend={systemMetrics?.uptime?.trend ?? 'stable'}
          target={systemMetrics?.uptime?.target ?? 99.9}
          icon={Server}
          unit="%"
          loading={healthLoading}
        />
        <MetricCard
          title="Response Time"
          value={systemMetrics?.responseTime?.value ?? 0}
          status={systemMetrics?.responseTime?.status ?? 'healthy'}
          trend={systemMetrics?.responseTime?.trend ?? 'stable'}
          target={systemMetrics?.responseTime?.target ?? 300}
          icon={Zap}
          unit="ms"
          loading={healthLoading}
        />
        <MetricCard
          title="CPU Usage"
          value={systemMetrics?.cpuUsage?.value ?? 0}
          status={systemMetrics?.cpuUsage?.status ?? 'healthy'}
          trend={systemMetrics?.cpuUsage?.trend ?? 'stable'}
          target={systemMetrics?.cpuUsage?.target ?? 80}
          icon={Cpu}
          unit="%"
          loading={healthLoading}
        />
        <MetricCard
          title="Memory Usage"
          value={systemMetrics?.memoryUsage?.value ?? 0}
          status={systemMetrics?.memoryUsage?.status ?? 'healthy'}
          trend={systemMetrics?.memoryUsage?.trend ?? 'stable'}
          target={systemMetrics?.memoryUsage?.target ?? 75}
          icon={MemoryStick}
          unit="%"
          loading={healthLoading}
        />
      </div>

      {/* System Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Information
          </CardTitle>
          <CardDescription>Real-time server and environment details</CardDescription>
        </CardHeader>
        <CardContent>
          {healthLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          ) : systemInfo ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Hostname</p>
                <p className="font-medium">{systemInfo.hostname}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Platform</p>
                <p className="font-medium capitalize">{systemInfo.platform}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Architecture</p>
                <p className="font-medium">{systemInfo.arch}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Node Version</p>
                <p className="font-medium">{systemInfo.nodeVersion}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CPU Model</p>
                <p className="font-medium text-sm">{systemInfo.cpuModel}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CPU Cores</p>
                <p className="font-medium">{systemInfo.cpuCores} cores</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Memory</p>
                <p className="font-medium">{systemInfo.totalMemoryGB} GB</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Free Memory</p>
                <p className="font-medium">{systemInfo.freeMemoryGB} GB</p>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">No system information available</p>
          )}
        </CardContent>
      </Card>

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
              {healthLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-5 w-20 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))
              ) : serviceStatus.length > 0 ? (
                serviceStatus.map((service) => (
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
              ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No services available</p>
              )}
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
              {incidentsLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))
              ) : recentIncidents.length > 0 ? (
                recentIncidents.map((incident) => (
                <div key={incident.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        incident.severity === 'high' || incident.severity === 'critical' ? 'destructive' :
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
              ))
              ) : (
                <div className="flex items-center justify-center p-6 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="font-medium text-green-700">No incidents reported. All systems operational.</p>
                  </div>
                </div>
              )}
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
            {healthLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="relative inline-block">
                    <Skeleton className="w-20 h-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-16 mx-auto mt-2" />
                  <Skeleton className="h-3 w-20 mx-auto mt-1" />
                </div>
              ))
            ) : resourceUsage.length > 0 ? (
              resourceUsage.map((resource) => (
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
            ))
            ) : (
              <p className="text-muted-foreground col-span-4 text-center py-4">No resource data available</p>
            )}
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
            {(() => {
              const alerts = [];
              if (systemMetrics?.memoryUsage?.status === 'warning' || systemMetrics?.memoryUsage?.status === 'critical') {
                alerts.push({ type: 'memory', value: systemMetrics.memoryUsage.value });
              }
              if (systemMetrics?.diskUsage?.status === 'warning' || systemMetrics?.diskUsage?.status === 'critical') {
                alerts.push({ type: 'disk', value: systemMetrics.diskUsage.value });
              }
              if (systemMetrics?.cpuUsage?.status === 'warning' || systemMetrics?.cpuUsage?.status === 'critical') {
                alerts.push({ type: 'cpu', value: systemMetrics.cpuUsage.value });
              }
              return (
                <Badge variant="outline" className={alerts.length > 0 ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}>
                  {alerts.length > 0 ? (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {alerts.length} Active Alert{alerts.length > 1 ? 's' : ''}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      All Systems Normal
                    </>
                  )}
                </Badge>
              );
            })()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthLoading ? (
              <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : (
              <>
                {systemMetrics?.memoryUsage && (systemMetrics.memoryUsage.status === 'warning' || systemMetrics.memoryUsage.status === 'critical') && (
                  <div className={`flex items-center justify-between p-3 border rounded-lg ${
                    systemMetrics.memoryUsage.status === 'critical' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className={`h-5 w-5 ${systemMetrics.memoryUsage.status === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                      <div>
                        <p className="font-medium text-sm">Memory Usage {systemMetrics.memoryUsage.status === 'critical' ? 'Critical' : 'High'}</p>
                        <p className={`text-sm ${systemMetrics.memoryUsage.status === 'critical' ? 'text-red-700' : 'text-yellow-700'}`}>
                          Memory usage at {systemMetrics.memoryUsage.value}% ({systemMetrics.memoryUsage.used?.toFixed(2) || 'N/A'} GB used of {systemMetrics.memoryUsage.total?.toFixed(2) || 'N/A'} GB)
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                )}
                {systemMetrics?.diskUsage && (systemMetrics.diskUsage.status === 'warning' || systemMetrics.diskUsage.status === 'critical') && (
                  <div className={`flex items-center justify-between p-3 border rounded-lg ${
                    systemMetrics.diskUsage.status === 'critical' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className={`h-5 w-5 ${systemMetrics.diskUsage.status === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                      <div>
                        <p className="font-medium text-sm">Disk Space {systemMetrics.diskUsage.status === 'critical' ? 'Critical' : 'Warning'}</p>
                        <p className={`text-sm ${systemMetrics.diskUsage.status === 'critical' ? 'text-red-700' : 'text-yellow-700'}`}>
                          Disk usage at {systemMetrics.diskUsage.value}%, consider cleanup
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                )}
                {systemMetrics?.cpuUsage && (systemMetrics.cpuUsage.status === 'warning' || systemMetrics.cpuUsage.status === 'critical') && (
                  <div className={`flex items-center justify-between p-3 border rounded-lg ${
                    systemMetrics.cpuUsage.status === 'critical' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className={`h-5 w-5 ${systemMetrics.cpuUsage.status === 'critical' ? 'text-red-600' : 'text-yellow-600'}`} />
                      <div>
                        <p className="font-medium text-sm">CPU Usage {systemMetrics.cpuUsage.status === 'critical' ? 'Critical' : 'High'}</p>
                        <p className={`text-sm ${systemMetrics.cpuUsage.status === 'critical' ? 'text-red-700' : 'text-yellow-700'}`}>
                          CPU usage at {systemMetrics.cpuUsage.value}%
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                )}
                {(!systemMetrics?.memoryUsage || systemMetrics.memoryUsage.status === 'healthy') && 
                 (!systemMetrics?.diskUsage || systemMetrics.diskUsage.status === 'healthy') && 
                 (!systemMetrics?.cpuUsage || systemMetrics.cpuUsage.status === 'healthy') && (
                  <div className="flex items-center justify-center p-6 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium text-green-700">All systems operating normally. No active alerts.</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SystemHealthStatus