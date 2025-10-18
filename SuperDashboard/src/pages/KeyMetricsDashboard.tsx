import React, { useState } from 'react'
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
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Target,
  Zap,
  Clock,
  RefreshCw,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  CreditCard,
  Star,
  MessageCircle,
  Shield,
  Database,
  Cpu
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area,
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

// Mock data for KPIs
const kpiData = {
  revenue: {
    current: 40800,
    previous: 33200,
    growth: 22.9,
    target: 45000,
    trend: 'up'
  },
  mrr: {
    current: 29000,
    previous: 23500,
    growth: 23.4,
    target: 32000,
    trend: 'up'
  },
  customers: {
    current: 130,
    previous: 104,
    growth: 25.0,
    target: 150,
    trend: 'up'
  },
  churn: {
    current: 2.1,
    previous: 2.8,
    growth: -25.0,
    target: 1.5,
    trend: 'down'
  },
  conversion: {
    current: 3.2,
    previous: 2.8,
    growth: 14.3,
    target: 4.0,
    trend: 'up'
  },
  arpu: {
    current: 313.85,
    previous: 289.42,
    growth: 8.4,
    target: 350,
    trend: 'up'
  },
  ltv: {
    current: 4520,
    previous: 4180,
    growth: 8.1,
    target: 5000,
    trend: 'up'
  },
  cac: {
    current: 850,
    previous: 920,
    growth: -7.6,
    target: 700,
    trend: 'down'
  }
}

const performanceData = [
  { month: 'Jan', revenue: 12500, customers: 45, conversion: 2.1 },
  { month: 'Feb', revenue: 14300, customers: 52, conversion: 2.4 },
  { month: 'Mar', revenue: 16800, customers: 61, conversion: 2.7 },
  { month: 'Apr', revenue: 19200, customers: 68, conversion: 2.9 },
  { month: 'May', revenue: 21500, customers: 74, conversion: 3.0 },
  { month: 'Jun', revenue: 23800, customers: 81, conversion: 3.1 },
  { month: 'Jul', revenue: 26400, customers: 89, conversion: 3.1 },
  { month: 'Aug', revenue: 29100, customers: 96, conversion: 3.2 },
  { month: 'Sep', revenue: 31800, customers: 104, conversion: 3.2 },
  { month: 'Oct', revenue: 34500, customers: 112, conversion: 3.2 },
  { month: 'Nov', revenue: 37500, customers: 121, conversion: 3.2 },
  { month: 'Dec', revenue: 40800, customers: 130, conversion: 3.2 }
]

const metricCategories = [
  {
    name: 'Revenue Metrics',
    icon: DollarSign,
    metrics: ['revenue', 'mrr', 'arpu', 'ltv'],
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    name: 'Customer Metrics',
    icon: Users,
    metrics: ['customers', 'churn', 'conversion', 'cac'],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  }
]

const quickStats = [
  { name: 'Active Trials', value: 24, change: 3, icon: Clock, color: 'text-blue-500' },
  { name: 'Page Views', value: '12.4K', change: 8.2, icon: Eye, color: 'text-purple-500' },
  { name: 'Conversion Rate', value: '3.2%', change: 14.3, icon: MousePointer, color: 'text-green-500' },
  { name: 'Avg. Session', value: '4m 32s', change: -2.1, icon: Zap, color: 'text-orange-500' }
]

const healthIndicators = [
  { name: 'System Uptime', value: 99.98, status: 'excellent', target: 99.9 },
  { name: 'API Response', value: 245, status: 'good', target: 300 },
  { name: 'Error Rate', value: 0.12, status: 'good', target: 0.5 },
  { name: 'Customer Satisfaction', value: 4.8, status: 'excellent', target: 4.5 }
]

const KeyMetricsDashboard = () => {
  const [timeRange, setTimeRange] = useState('12m')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? 
                (entry.name.includes('Rate') || entry.name.includes('Churn') ? 
                 `${entry.value}%` : 
                 entry.name.includes('Revenue') || entry.name.includes('MRR') ? 
                 `$${entry.value.toLocaleString()}` : 
                 entry.value) : 
                entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value}%`
  }

  const getGrowthIcon = (trend: string) => {
    return trend === 'up' ? 
      <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-500" />
  }

  const getGrowthColor = (trend: string, value: number) => {
    if (trend === 'up') return 'text-green-600'
    if (trend === 'down') return value > 0 ? 'text-red-600' : 'text-green-600'
    return 'text-gray-600'
  }

  const getHealthStatus = (value: number, target: number, higherIsBetter = true) => {
    if (higherIsBetter) {
      return value >= target ? 'excellent' : value >= target * 0.9 ? 'good' : 'poor'
    } else {
      return value <= target ? 'excellent' : value <= target * 1.1 ? 'good' : 'poor'
    }
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500'
      case 'good': return 'text-yellow-500'
      case 'poor': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getHealthVariant = (status: string) => {
    switch (status) {
      case 'excellent': return 'default'
      case 'good': return 'secondary'
      case 'poor': return 'destructive'
      default: return 'outline'
    }
  }

  const KpiCard = ({ metric, value }: { metric: string; value: any }) => {
    const icons = {
      revenue: DollarSign,
      mrr: CreditCard,
      customers: Users,
      churn: TrendingDown,
      conversion: Target,
      arpu: DollarSign,
      ltv: Star,
      cac: ShoppingCart
    }

    const titles = {
      revenue: 'Total Revenue',
      mrr: 'Monthly MRR',
      customers: 'Total Customers',
      churn: 'Churn Rate',
      conversion: 'Conversion Rate',
      arpu: 'ARPU',
      ltv: 'LTV',
      cac: 'CAC'
    }

    const formats = {
      revenue: (v: number) => formatCurrency(v),
      mrr: (v: number) => formatCurrency(v),
      customers: (v: number) => v.toLocaleString(),
      churn: (v: number) => `${v}%`,
      conversion: (v: number) => `${v}%`,
      arpu: (v: number) => formatCurrency(v),
      ltv: (v: number) => formatCurrency(v),
      cac: (v: number) => formatCurrency(v)
    }

    const IconComponent = icons[metric as keyof typeof icons]
    const title = titles[metric as keyof typeof titles]
    const format = formats[metric as keyof typeof formats]

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <IconComponent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{format(value.current)}</div>
          <div className="flex items-center space-x-2 text-xs">
            {getGrowthIcon(value.trend)}
            <span className={getGrowthColor(value.trend, value.growth)}>
              {formatPercentage(value.growth)}
            </span>
            <span className="text-muted-foreground">
              vs. previous period
            </span>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Target: {format(value.target)}</span>
              <span>
                {((value.current / value.target) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${Math.min((value.current / value.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Key Metrics & KPIs</h1>
          <p className="text-muted-foreground">
            Monitor your business performance with real-time metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center text-xs ${
                stat.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change >= 0 ? 
                  <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                }
                {Math.abs(stat.change)}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
        >
          All Metrics
        </Button>
        {metricCategories.map(category => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.name)}
            className={selectedCategory === category.name ? category.bgColor : ''}
          >
            <category.icon className={`h-4 w-4 mr-2 ${category.color}`} />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Main KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(kpiData)
          .filter(([metric]) => 
            selectedCategory === 'all' || 
            metricCategories.some(cat => cat.metrics.includes(metric))
          )
          .map(([metric, value]) => (
            <KpiCard key={metric} metric={metric} value={value} />
          ))
        }
      </div>

      {/* Performance Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue & Customers Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Customer Growth</CardTitle>
            <CardDescription>
              Monthly performance trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    name="Revenue"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="customers"
                    stroke="#10b981"
                    name="Customers"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Trend</CardTitle>
            <CardDescription>
              Monthly conversion rate performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="conversion" 
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                    name="Conversion Rate %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Targets */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Platform performance and reliability metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthIndicators.map((indicator, index) => (
                <div key={indicator.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      getHealthStatus(indicator.value, indicator.target, 
                        indicator.name !== 'API Response' && indicator.name !== 'Error Rate') === 'excellent' ? 'bg-green-50' :
                      getHealthStatus(indicator.value, indicator.target, 
                        indicator.name !== 'API Response' && indicator.name !== 'Error Rate') === 'good' ? 'bg-yellow-50' : 'bg-red-50'
                    }`}>
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{indicator.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Target: {indicator.target}
                        {indicator.name === 'System Uptime' || indicator.name === 'Customer Satisfaction' ? '' : 
                         indicator.name === 'API Response' ? 'ms' : '%'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {indicator.value}
                      {indicator.name === 'System Uptime' || indicator.name === 'Customer Satisfaction' ? '' : 
                       indicator.name === 'API Response' ? 'ms' : '%'}
                    </p>
                    <Badge 
                      variant={getHealthVariant(
                        getHealthStatus(indicator.value, indicator.target, 
                          indicator.name !== 'API Response' && indicator.name !== 'Error Rate')
                      )}
                      className="text-xs"
                    >
                      {getHealthStatus(indicator.value, indicator.target, 
                        indicator.name !== 'API Response' && indicator.name !== 'Error Rate')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPI Targets Progress */}
        <Card>
          <CardHeader>
            <CardTitle>KPI Targets Progress</CardTitle>
            <CardDescription>
              Current progress towards quarterly targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(kpiData).map(([metric, data]) => {
                const progress = (data.current / data.target) * 100
                const titles = {
                  revenue: 'Total Revenue',
                  mrr: 'Monthly MRR',
                  customers: 'Total Customers',
                  churn: 'Churn Rate',
                  conversion: 'Conversion Rate',
                  arpu: 'ARPU',
                  ltv: 'LTV',
                  cac: 'CAC'
                }
                
                return (
                  <div key={metric} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        {titles[metric as keyof typeof titles]}
                      </span>
                      <span className="text-muted-foreground">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          progress >= 100 ? 'bg-green-500' :
                          progress >= 75 ? 'bg-blue-500' :
                          progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default KeyMetricsDashboard