import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog'
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users,
  Mail,
  BarChart3,
  Target,
  Download,
  Upload,
  Eye,
  Copy,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Clock,
  MapPin,
  Building,
  CreditCard,
  UserCheck,
  UserX
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

// Mock segmentation data
const segmentsData = [
  {
    id: '1',
    name: 'Enterprise Power Users',
    description: 'High-value enterprise customers with maximum feature usage',
    criteria: [
      { field: 'plan', operator: 'equals', value: 'Enterprise' },
      { field: 'status', operator: 'equals', value: 'active' },
      { field: 'monthlyRevenue', operator: 'greater_than', value: 200 }
    ],
    customerCount: 45,
    totalRevenue: 13455,
    avgRevenue: 299,
    growth: 12.5,
    lastUpdated: '2024-03-20',
    tags: ['high-value', 'enterprise', 'power-user'],
    color: '#8b5cf6'
  },
  {
    id: '2',
    name: 'Active Professional',
    description: 'Active professional plan users with good engagement',
    criteria: [
      { field: 'plan', operator: 'equals', value: 'Professional' },
      { field: 'status', operator: 'equals', value: 'active' },
      { field: 'lastLogin', operator: 'last_30_days', value: '' }
    ],
    customerCount: 89,
    totalRevenue: 8811,
    avgRevenue: 99,
    growth: 8.2,
    lastUpdated: '2024-03-19',
    tags: ['active', 'professional', 'engaged'],
    color: '#3b82f6'
  },
  {
    id: '3',
    name: 'Trial Users',
    description: 'Users currently in trial period',
    criteria: [
      { field: 'plan', operator: 'equals', value: 'Trial' },
      { field: 'status', operator: 'equals', value: 'active' }
    ],
    customerCount: 156,
    totalRevenue: 0,
    avgRevenue: 0,
    growth: -3.1,
    lastUpdated: '2024-03-20',
    tags: ['trial', 'new', 'conversion'],
    color: '#10b981'
  },
  {
    id: '4',
    name: 'At Risk Customers',
    description: 'Customers showing signs of churn',
    criteria: [
      { field: 'lastLogin', operator: 'older_than', value: 30 },
      { field: 'supportTickets', operator: 'greater_than', value: 3 },
      { field: 'plan', operator: 'not_equals', value: 'Enterprise' }
    ],
    customerCount: 23,
    totalRevenue: 2277,
    avgRevenue: 99,
    growth: -15.7,
    lastUpdated: '2024-03-18',
    tags: ['at-risk', 'churn', 'attention-needed'],
    color: '#f59e0b'
  },
  {
    id: '5',
    name: 'Inactive Legacy',
    description: 'Inactive customers from older plans',
    criteria: [
      { field: 'status', operator: 'equals', value: 'inactive' },
      { field: 'lastLogin', operator: 'older_than', value: 90 }
    ],
    customerCount: 67,
    totalRevenue: 0,
    avgRevenue: 0,
    growth: -5.2,
    lastUpdated: '2024-03-15',
    tags: ['inactive', 'legacy', 're-engagement'],
    color: '#6b7280'
  },
  {
    id: '6',
    name: 'High Growth Startups',
    description: 'Startup companies with rapid user growth',
    criteria: [
      { field: 'companySize', operator: 'equals', value: 'startup' },
      { field: 'userGrowth', operator: 'greater_than', value: 20 },
      { field: 'plan', operator: 'in', value: ['Professional', 'Enterprise'] }
    ],
    customerCount: 34,
    totalRevenue: 3366,
    avgRevenue: 99,
    growth: 25.8,
    lastUpdated: '2024-03-20',
    tags: ['startup', 'high-growth', 'scale'],
    color: '#ec4899'
  }
]

const segmentMetrics = [
  { name: 'Enterprise Power Users', customers: 45, revenue: 13455, color: '#8b5cf6' },
  { name: 'Active Professional', customers: 89, revenue: 8811, color: '#3b82f6' },
  { name: 'Trial Users', customers: 156, revenue: 0, color: '#10b981' },
  { name: 'At Risk Customers', customers: 23, revenue: 2277, color: '#f59e0b' },
  { name: 'Inactive Legacy', customers: 67, revenue: 0, color: '#6b7280' },
  { name: 'High Growth Startups', customers: 34, revenue: 3366, color: '#ec4899' }
]

const growthData = [
  { month: 'Jan', enterprise: 38, professional: 72, trial: 120, atRisk: 18 },
  { month: 'Feb', enterprise: 40, professional: 75, trial: 135, atRisk: 20 },
  { month: 'Mar', enterprise: 45, professional: 89, trial: 156, atRisk: 23 }
]

// Form validation schema
const segmentFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  criteria: z.array(z.object({
    field: z.string().min(1, 'Field is required'),
    operator: z.string().min(1, 'Operator is required'),
    value: z.string().min(1, 'Value is required')
  })),
  tags: z.array(z.string()).optional(),
  color: z.string().default('#3b82f6')
})

type SegmentFormValues = z.infer<typeof segmentFormSchema>

const CustomerSegmentation = () => {
  const [segments, setSegments] = useState(segmentsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const form = useForm<SegmentFormValues>({
    resolver: zodResolver(segmentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      criteria: [{ field: '', operator: '', value: '' }],
      tags: [],
      color: '#3b82f6'
    }
  })

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleCreateSegment = (data: SegmentFormValues) => {
    const newSegment = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      customerCount: 0,
      totalRevenue: 0,
      avgRevenue: 0,
      growth: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setSegments(prev => [...prev, newSegment])
    setIsCreateDialogOpen(false)
    form.reset()
  }

  const handleEditSegment = (data: SegmentFormValues) => {
    if (!selectedSegment) return
    
    const updatedSegment = {
      ...selectedSegment,
      ...data,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    
    setSegments(prev => prev.map(segment => 
      segment.id === selectedSegment.id ? updatedSegment : segment
    ))
    setIsEditDialogOpen(false)
    setSelectedSegment(null)
  }

  const handleDeleteSegment = (segment: any) => {
    setSelectedSegment(segment)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedSegment) {
      setSegments(segments.filter(s => s.id !== selectedSegment.id))
      setIsDeleteDialogOpen(false)
      setSelectedSegment(null)
    }
  }

  const openEditDialog = (segment: any) => {
    setSelectedSegment(segment)
    form.reset({
      name: segment.name,
      description: segment.description,
      criteria: segment.criteria,
      tags: segment.tags,
      color: segment.color
    })
    setIsEditDialogOpen(true)
  }

  const duplicateSegment = (segment: any) => {
    const duplicatedSegment = {
      ...segment,
      id: Math.random().toString(36).substr(2, 9),
      name: `${segment.name} (Copy)`,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setSegments(prev => [...prev, duplicatedSegment])
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (growth < 0) return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
    return <TrendingUp className="h-4 w-4 text-gray-500" />
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600'
    if (growth < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatNumber(entry.value)} customers
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p>Customers: {formatNumber(payload[0].value)}</p>
          <p>Revenue: {formatCurrency(payload[0].payload.revenue)}</p>
        </div>
      )
    }
    return null
  }

  const totalCustomers = segments.reduce((sum, segment) => sum + segment.customerCount, 0)
  const totalRevenue = segments.reduce((sum, segment) => sum + segment.totalRevenue, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Segmentation</h1>
          <p className="text-muted-foreground">
            Group and analyze customers based on behavior and attributes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Segment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Segments</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{segments.length}</div>
            <p className="text-xs text-muted-foreground">
              Active customer segments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalCustomers)}</div>
            <p className="text-xs text-muted-foreground">
              Across all segments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From segmented customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Segment Size</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(Math.round(totalCustomers / segments.length))}</div>
            <p className="text-xs text-muted-foreground">
              Customers per segment
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search segments by name, description, or tags..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      <SelectItem value="high-value">High Value</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="at-risk">At Risk</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>
                {filteredSegments.length} segments found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment Name</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Growth</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSegments.map((segment) => (
                    <TableRow key={segment.id} className="group">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: segment.color }}
                          />
                          <div>
                            <div className="font-medium">{segment.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {segment.description}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {segment.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{formatNumber(segment.customerCount)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{formatCurrency(segment.totalRevenue)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Avg: {formatCurrency(segment.avgRevenue)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center space-x-1 ${getGrowthColor(segment.growth)}`}>
                          {getGrowthIcon(segment.growth)}
                          <span className="font-medium">
                            {segment.growth > 0 ? '+' : ''}{segment.growth}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{segment.lastUpdated}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Customers
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Email Segment
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(segment)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Segment
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => duplicateSegment(segment)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteSegment(segment)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Segment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredSegments.length === 0 && (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No segments found matching your search</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-6">
          {/* Segment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Segment Distribution</CardTitle>
              <CardDescription>
                Customer count by segment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={segmentMetrics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="customers"
                    >
                      {segmentMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Segment Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Segment Growth</CardTitle>
              <CardDescription>
                Monthly customer growth by segment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="enterprise" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      name="Enterprise"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="professional" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Professional"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="trial" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Trial"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email All Segments
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Segment Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh All Segments
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Segment Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Segment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Customer Segment</DialogTitle>
            <DialogDescription>
              Define a new customer segment based on specific criteria.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateSegment)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segment Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Enterprise Power Users" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe this customer segment..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Segment Criteria</FormLabel>
                <div className="space-y-3 mt-2">
                  {form.watch('criteria').map((criterion, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <Select defaultValue={criterion.field}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plan">Plan</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="revenue">Revenue</SelectItem>
                          <SelectItem value="lastLogin">Last Login</SelectItem>
                          <SelectItem value="companySize">Company Size</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue={criterion.operator}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not_equals">Not Equals</SelectItem>
                          <SelectItem value="greater_than">Greater Than</SelectItem>
                          <SelectItem value="less_than">Less Than</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input 
                        placeholder="Value" 
                        defaultValue={criterion.value}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm" type="button">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" type="button" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Criterion
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Segment</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              "{selectedSegment?.name}" segment and remove it from your segmentation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Segment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CustomerSegmentation