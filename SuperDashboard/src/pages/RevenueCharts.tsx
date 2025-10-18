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
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 12500, mrr: 11800, arr: 141600, customers: 45 },
  { month: 'Feb', revenue: 14300, mrr: 13500, arr: 162000, customers: 52 },
  { month: 'Mar', revenue: 16800, mrr: 15200, arr: 182400, customers: 61 },
  { month: 'Apr', revenue: 19200, mrr: 16800, arr: 201600, customers: 68 },
  { month: 'May', revenue: 21500, mrr: 18200, arr: 218400, customers: 74 },
  { month: 'Jun', revenue: 23800, mrr: 19500, arr: 234000, customers: 81 },
  { month: 'Jul', revenue: 26400, mrr: 21000, arr: 252000, customers: 89 },
  { month: 'Aug', revenue: 29100, mrr: 22500, arr: 270000, customers: 96 },
  { month: 'Sep', revenue: 31800, mrr: 24000, arr: 288000, customers: 104 },
  { month: 'Oct', revenue: 34500, mrr: 25500, arr: 306000, customers: 112 },
  { month: 'Nov', revenue: 37500, mrr: 27200, arr: 326400, customers: 121 },
  { month: 'Dec', revenue: 40800, mrr: 29000, arr: 348000, customers: 130 }
]

const planDistribution = [
  { name: 'Starter', value: 45, revenue: 13050, color: '#3b82f6' },
  { name: 'Professional', value: 35, revenue: 20300, color: '#8b5cf6' },
  { name: 'Enterprise', value: 20, revenue: 7450, color: '#f59e0b' }
]

const revenueSources = [
  { name: 'Subscriptions', value: 85, color: '#10b981' },
  { name: 'One-time', value: 8, color: '#f59e0b' },
  { name: 'Services', value: 5, color: '#3b82f6' },
  { name: 'Other', value: 2, color: '#6b7280' }
]

const metrics = {
  totalRevenue: 40800,
  mrr: 29000,
  arr: 348000,
  growthRate: 22.5,
  customers: 130,
  churnRate: 2.1,
  arpu: 313.85
}

const RevenueCharts = () => {
  const [timeRange, setTimeRange] = useState('12m')
  const [chartType, setChartType] = useState('revenue')

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p>Customers: {payload[0].value}%</p>
          <p>Revenue: ${payload[0].payload.revenue?.toLocaleString()}</p>
        </div>
      )
    }
    return null
  }

  const exportData = () => {
    // In real app, this would generate CSV/PDF
    console.log('Exporting revenue data...')
  }

  const getGrowthIcon = (rate: number) => {
    return rate >= 0 ? 
      <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-500" />
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Revenue Analytics</h2>
          <p className="text-muted-foreground">
            Track your revenue performance and growth metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(metrics.growthRate)}
              <span className={metrics.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(metrics.growthRate)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly MRR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.mrr)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="secondary" className="mr-1">ARR: {formatCurrency(metrics.arr)}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.customers}</div>
            <p className="text-xs text-muted-foreground">
              ARPU: {formatCurrency(metrics.arpu)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.churnRate}%</div>
            <p className="text-xs text-muted-foreground">
              -0.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Revenue Chart */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly recurring revenue and growth trends
                </CardDescription>
              </div>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Total Revenue</SelectItem>
                  <SelectItem value="mrr">MRR</SelectItem>
                  <SelectItem value="arr">ARR</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey={chartType === 'revenue' ? 'revenue' : 
                           chartType === 'mrr' ? 'mrr' :
                           chartType === 'arr' ? 'arr' : 'customers'}
                    stroke={chartType === 'revenue' ? '#3b82f6' : 
                           chartType === 'mrr' ? '#8b5cf6' :
                           chartType === 'arr' ? '#10b981' : '#f59e0b'}
                    fill={chartType === 'revenue' ? '#3b82f6' : 
                         chartType === 'mrr' ? '#8b5cf6' :
                         chartType === 'arr' ? '#10b981' : '#f59e0b'}
                    fillOpacity={0.2}
                    name={chartType === 'revenue' ? 'Total Revenue' : 
                         chartType === 'mrr' ? 'Monthly MRR' :
                         chartType === 'arr' ? 'Annual ARR' : 'Customers'}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>
              Revenue share by subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {planDistribution.map((plan, index) => (
                <div key={plan.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: plan.color }}
                    />
                    <span className="text-sm">{plan.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    ${plan.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Sources</CardTitle>
            <CardDescription>
              Breakdown of revenue by source
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
            <CardDescription>
              Month-over-month revenue growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="revenue" 
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Monthly Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RevenueCharts