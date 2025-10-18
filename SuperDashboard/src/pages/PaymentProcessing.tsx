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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye,
  Download,
  Upload,
  CreditCard,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Plus,
  ArrowUpDown,
  Mail,
  Receipt,
  RotateCcw,
  Ban,
  Zap
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts'

// Mock payment data
const paymentsData = [
  {
    id: 'pay_1',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    amount: 299,
    currency: 'USD',
    status: 'succeeded',
    paymentMethod: 'credit_card',
    cardLast4: '4242',
    invoiceId: 'INV-2024-001',
    plan: 'Enterprise',
    createdAt: '2024-03-20T14:30:00',
    processedAt: '2024-03-20T14:30:05'
  },
  {
    id: 'pay_2',
    customer: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    amount: 99,
    currency: 'USD',
    status: 'succeeded',
    paymentMethod: 'paypal',
    cardLast4: null,
    invoiceId: 'INV-2024-002',
    plan: 'Professional',
    createdAt: '2024-03-20T13:15:00',
    processedAt: '2024-03-20T13:15:10'
  },
  {
    id: 'pay_3',
    customer: 'Mike Chen',
    email: 'mike.chen@example.com',
    amount: 29,
    currency: 'USD',
    status: 'failed',
    paymentMethod: 'credit_card',
    cardLast4: '1881',
    invoiceId: 'INV-2024-003',
    plan: 'Starter',
    createdAt: '2024-03-20T12:45:00',
    processedAt: '2024-03-20T12:45:15',
    failureReason: 'Insufficient funds'
  },
  {
    id: 'pay_4',
    customer: 'Emma Davis',
    email: 'emma.davis@example.com',
    amount: 99,
    currency: 'USD',
    status: 'pending',
    paymentMethod: 'bank_transfer',
    cardLast4: null,
    invoiceId: 'INV-2024-004',
    plan: 'Professional',
    createdAt: '2024-03-20T11:30:00',
    processedAt: null
  },
  {
    id: 'pay_5',
    customer: 'Alex Brown',
    email: 'alex.brown@example.com',
    amount: 299,
    currency: 'USD',
    status: 'succeeded',
    paymentMethod: 'credit_card',
    cardLast4: '5252',
    invoiceId: 'INV-2024-005',
    plan: 'Enterprise',
    createdAt: '2024-03-20T10:15:00',
    processedAt: '2024-03-20T10:15:08'
  },
  {
    id: 'pay_6',
    customer: 'Lisa Wang',
    email: 'lisa.wang@example.com',
    amount: 99,
    currency: 'USD',
    status: 'refunded',
    paymentMethod: 'paypal',
    cardLast4: null,
    invoiceId: 'INV-2024-006',
    plan: 'Professional',
    createdAt: '2024-03-19T16:20:00',
    processedAt: '2024-03-19T16:20:12',
    refundedAt: '2024-03-20T09:30:00',
    refundAmount: 99
  },
  {
    id: 'pay_7',
    customer: 'David Wilson',
    email: 'david.wilson@example.com',
    amount: 29,
    currency: 'USD',
    status: 'succeeded',
    paymentMethod: 'credit_card',
    cardLast4: '3333',
    invoiceId: 'INV-2024-007',
    plan: 'Starter',
    createdAt: '2024-03-19T15:45:00',
    processedAt: '2024-03-19T15:45:20'
  },
  {
    id: 'pay_8',
    customer: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    amount: 299,
    currency: 'USD',
    status: 'disputed',
    paymentMethod: 'credit_card',
    cardLast4: '4242',
    invoiceId: 'INV-2024-008',
    plan: 'Enterprise',
    createdAt: '2024-03-19T14:30:00',
    processedAt: '2024-03-19T14:30:05',
    disputeReason: 'Product not received'
  }
]

const paymentStats = {
  totalProcessed: 125400,
  successfulPayments: 245,
  failedPayments: 12,
  pendingPayments: 8,
  refundedAmount: 1298,
  disputeRate: 0.8,
  avgProcessingTime: 2.3
}

const paymentAnalytics = [
  { day: 'Mon', successful: 45, failed: 2, refunded: 3 },
  { day: 'Tue', successful: 52, failed: 1, refunded: 1 },
  { day: 'Wed', successful: 48, failed: 3, refunded: 2 },
  { day: 'Thu', successful: 61, failed: 0, refunded: 0 },
  { day: 'Fri', successful: 55, failed: 2, refunded: 1 },
  { day: 'Sat', successful: 32, failed: 1, refunded: 1 },
  { day: 'Sun', successful: 28, failed: 3, refunded: 0 }
]

const paymentMethodsData = [
  { method: 'Credit Card', count: 189, percentage: 65, color: '#3b82f6' },
  { method: 'PayPal', count: 67, percentage: 23, color: '#0070ba' },
  { method: 'Bank Transfer', count: 25, percentage: 9, color: '#10b981' },
  { method: 'Apple Pay', count: 12, percentage: 4, color: '#000000' }
]

// Form validation schema
const refundFormSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  reason: z.string().min(5, 'Reason must be at least 5 characters'),
  notifyCustomer: z.boolean().default(true)
})

type RefundFormValues = z.infer<typeof refundFormSchema>

const PaymentProcessing = () => {
  const [payments, setPayments] = useState(paymentsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all')
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)
  const [isRetryDialogOpen, setIsRetryDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')

  const refundForm = useForm<RefundFormValues>({
    resolver: zodResolver(refundFormSchema),
    defaultValues: {
      amount: 0,
      reason: '',
      notifyCustomer: true
    }
  })

  // Filter and sort payments
  const filteredPayments = payments
    .filter(payment => {
      const matchesSearch = 
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
      const matchesMethod = paymentMethodFilter === 'all' || payment.paymentMethod === paymentMethodFilter
      
      return matchesSearch && matchesStatus && matchesMethod
    })
    .sort((a, b) => {
      let aValue = a[sortField as keyof typeof a]
      let bValue = b[sortField as keyof typeof b]
      
      if (sortField === 'createdAt' || sortField === 'processedAt') {
        aValue = new Date(aValue as string).getTime()
        bValue = new Date(bValue as string).getTime()
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const handleRefund = (payment: any) => {
    setSelectedPayment(payment)
    refundForm.reset({
      amount: payment.amount,
      reason: '',
      notifyCustomer: true
    })
    setIsRefundDialogOpen(true)
  }

  const processRefund = (data: RefundFormValues) => {
    if (!selectedPayment) return
    
    const updatedPayments = payments.map(p => 
      p.id === selectedPayment.id 
        ? { 
            ...p, 
            status: 'refunded',
            refundAmount: data.amount,
            refundedAt: new Date().toISOString()
          }
        : p
    )
    
    setPayments(updatedPayments)
    setIsRefundDialogOpen(false)
    setSelectedPayment(null)
  }

  const handleRetryPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsRetryDialogOpen(true)
  }

  const processRetry = () => {
    if (!selectedPayment) return
    
    const updatedPayments = payments.map(p => 
      p.id === selectedPayment.id 
        ? { 
            ...p, 
            status: 'succeeded',
            processedAt: new Date().toISOString(),
            failureReason: null
          }
        : p
    )
    
    setPayments(updatedPayments)
    setIsRetryDialogOpen(false)
    setSelectedPayment(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'refunded':
        return <RotateCcw className="h-4 w-4 text-blue-500" />
      case 'disputed':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'default'
      case 'failed':
        return 'destructive'
      case 'pending':
        return 'secondary'
      case 'refunded':
        return 'outline'
      case 'disputed':
        return 'default'
      default:
        return 'outline'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'refunded':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'disputed':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPaymentMethodIcon = (method: string) => {
    return <CreditCard className="h-4 w-4" />
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} payments
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
          <p>Payments: {payload[0].value}</p>
          <p>{payload[0].payload.percentage}% of total</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Processing</h1>
          <p className="text-muted-foreground">
            Manage and monitor payment transactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Payments
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(paymentStats.totalProcessed)}</div>
            <p className="text-xs text-muted-foreground">
              All-time processed amount
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paymentStats.successfulPayments}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{paymentStats.failedPayments}</div>
            <p className="text-xs text-muted-foreground">
              {paymentStats.failedPayments > 0 ? 'Needs attention' : 'All good'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Processing</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats.avgProcessingTime}s</div>
            <p className="text-xs text-muted-foreground">
              Average processing time
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
                      placeholder="Search payments by customer, email, or invoice ID..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="succeeded">Succeeded</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                      <SelectItem value="disputed">Disputed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                    <SelectTrigger className="w-[150px]">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                {filteredPayments.length} payments found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('customer')}
                    >
                      <div className="flex items-center">
                        Customer
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="h-4 w-4 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.customer}</div>
                          <div className="text-sm text-muted-foreground">
                            {payment.email}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {payment.invoiceId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formatCurrency(payment.amount, payment.currency)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {payment.plan}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <span className="capitalize">
                            {payment.paymentMethod.replace('_', ' ')}
                          </span>
                          {payment.cardLast4 && (
                            <Badge variant="outline" className="text-xs">
                              ****{payment.cardLast4}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(payment.status)}
                          <Badge variant={getStatusVariant(payment.status)} className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                        {payment.failureReason && (
                          <div className="text-xs text-red-600 mt-1">
                            {payment.failureReason}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDateTime(payment.createdAt)}
                        </div>
                        {payment.processedAt && (
                          <div className="text-xs text-muted-foreground">
                            Processed: {formatDateTime(payment.processedAt)}
                          </div>
                        )}
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Receipt className="h-4 w-4 mr-2" />
                              Download Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Receipt
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {payment.status === 'failed' && (
                              <DropdownMenuItem onClick={() => handleRetryPayment(payment)}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Retry Payment
                              </DropdownMenuItem>
                            )}
                            {(payment.status === 'succeeded' || payment.status === 'pending') && (
                              <DropdownMenuItem onClick={() => handleRefund(payment)}>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Issue Refund
                              </DropdownMenuItem>
                            )}
                            {payment.status === 'disputed' && (
                              <DropdownMenuItem>
                                <Ban className="h-4 w-4 mr-2" />
                                Resolve Dispute
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredPayments.length === 0 && (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No payments found matching your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-6">
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Distribution of payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {paymentMethodsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Payment Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Analytics</CardTitle>
              <CardDescription>
                Daily payment performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paymentAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="successful" 
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      name="Successful"
                    />
                    <Bar 
                      dataKey="failed" 
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                      name="Failed"
                    />
                    <Bar 
                      dataKey="refunded" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      name="Refunded"
                    />
                  </BarChart>
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
                <Plus className="h-4 w-4 mr-2" />
                Create Manual Payment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Payment Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View Failed Payments
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RotateCcw className="h-4 w-4 mr-2" />
                Process Refunds
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Refund Dialog */}
      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Issue Refund</DialogTitle>
            <DialogDescription>
              Process a refund for {selectedPayment?.customer}'s payment of {formatCurrency(selectedPayment?.amount, selectedPayment?.currency)}.
            </DialogDescription>
          </DialogHeader>
          <Form {...refundForm}>
            <form onSubmit={refundForm.handleSubmit(processRefund)} className="space-y-4">
              <FormField
                control={refundForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Refund Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum refundable amount: {formatCurrency(selectedPayment?.amount, selectedPayment?.currency)}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={refundForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Refund Reason</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter reason for refund..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={refundForm.control}
                name="notifyCustomer"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Notify Customer</FormLabel>
                      <FormDescription>
                        Send email notification to the customer
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsRefundDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="destructive">
                  Process Refund
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Retry Payment Dialog */}
      <AlertDialog open={isRetryDialogOpen} onOpenChange={setIsRetryDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Retry Failed Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to retry the failed payment of {formatCurrency(selectedPayment?.amount, selectedPayment?.currency)} 
              for {selectedPayment?.customer}? This will attempt to process the payment again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={processRetry}>
              Retry Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default PaymentProcessing