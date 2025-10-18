import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy,
  Eye,
  Users,
  DollarSign,
  TrendingUp,
  Check,
  X,
  Star,
  Crown,
  Zap,
  Target,
  BarChart3,
  Download,
  Upload,
  MoreVertical,
  Settings,
  CreditCard
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

// Mock pricing data
const pricingTiers = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfect for individuals and small teams getting started',
    price: 29,
    billingPeriod: 'monthly',
    annualPrice: 290, // 2 months free
    currency: 'USD',
    isPopular: false,
    isActive: true,
    features: [
      'Up to 5 users',
      '10GB storage',
      'Basic analytics',
      'Email support',
      'API access (1000 calls/month)',
      'Standard security'
    ],
    limitations: [
      'No custom domains',
      'No advanced analytics',
      'Limited integrations'
    ],
    customerCount: 156,
    conversionRate: 3.2,
    revenue: 4524,
    color: '#10b981'
  },
  {
    id: '2',
    name: 'Professional',
    description: 'Ideal for growing businesses and teams',
    price: 99,
    billingPeriod: 'monthly',
    annualPrice: 950, // ~2 months free
    currency: 'USD',
    isPopular: true,
    isActive: true,
    features: [
      'Up to 25 users',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'API access (10,000 calls/month)',
      'Advanced security',
      'Custom domains',
      'White-labeling',
      'SSO integration'
    ],
    limitations: [
      'No dedicated account manager',
      'Limited custom development'
    ],
    customerCount: 89,
    conversionRate: 4.8,
    revenue: 8811,
    color: '#3b82f6'
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'For large organizations with complex needs',
    price: 299,
    billingPeriod: 'monthly',
    annualPrice: 2868, // ~2 months free
    currency: 'USD',
    isPopular: false,
    isActive: true,
    features: [
      'Unlimited users',
      '1TB storage',
      'Advanced analytics & reporting',
      '24/7 phone support',
      'Unlimited API access',
      'Enterprise security',
      'Custom domains',
      'Full white-labeling',
      'SSO & SAML',
      'Dedicated account manager',
      'Custom development',
      'SLA guarantee'
    ],
    limitations: [],
    customerCount: 45,
    conversionRate: 2.1,
    revenue: 13455,
    color: '#8b5cf6'
  },
  {
    id: '4',
    name: 'Free',
    description: 'Basic features for testing and evaluation',
    price: 0,
    billingPeriod: 'monthly',
    annualPrice: 0,
    currency: 'USD',
    isPopular: false,
    isActive: true,
    features: [
      '1 user',
      '1GB storage',
      'Basic analytics (view only)',
      'Community support',
      'API access (100 calls/month)'
    ],
    limitations: [
      'No custom domains',
      'Limited features',
      'Branded interface'
    ],
    customerCount: 542,
    conversionRate: 8.5,
    revenue: 0,
    color: '#6b7280'
  }
]

const pricingAnalytics = [
  { month: 'Jan', starter: 120, professional: 65, enterprise: 32, free: 420 },
  { month: 'Feb', starter: 135, professional: 72, enterprise: 35, free: 480 },
  { month: 'Mar', starter: 156, professional: 89, enterprise: 45, free: 542 }
]

const revenueData = [
  { plan: 'Starter', revenue: 4524, customers: 156 },
  { plan: 'Professional', revenue: 8811, customers: 89 },
  { plan: 'Enterprise', revenue: 13455, customers: 45 },
  { plan: 'Free', revenue: 0, customers: 542 }
]

// Form validation schema
const pricingFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  billingPeriod: z.enum(['monthly', 'yearly']),
  annualPrice: z.number().min(0, 'Annual price must be positive').optional(),
  currency: z.string().default('USD'),
  isPopular: z.boolean().default(false),
  isActive: z.boolean().default(true),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  limitations: z.array(z.string()).optional()
})

type PricingFormValues = z.infer<typeof pricingFormSchema>

const PricingTiers = () => {
  const [tiers, setTiers] = useState(pricingTiers)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [newFeature, setNewFeature] = useState('')
  const [newLimitation, setNewLimitation] = useState('')

  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      billingPeriod: 'monthly',
      currency: 'USD',
      isPopular: false,
      isActive: true,
      features: [],
      limitations: []
    }
  })

  const handleCreateTier = (data: PricingFormValues) => {
    const newTier = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      customerCount: 0,
      conversionRate: 0,
      revenue: 0,
      color: getRandomColor(),
      annualPrice: data.billingPeriod === 'monthly' ? data.price * 10 : data.price
    }
    setTiers(prev => [...prev, newTier])
    setIsCreateDialogOpen(false)
    form.reset()
    setNewFeature('')
    setNewLimitation('')
  }

  const handleEditTier = (data: PricingFormValues) => {
    if (!selectedTier) return
    
    const updatedTier = {
      ...selectedTier,
      ...data
    }
    
    setTiers(prev => prev.map(tier => 
      tier.id === selectedTier.id ? updatedTier : tier
    ))
    setIsEditDialogOpen(false)
    setSelectedTier(null)
    setNewFeature('')
    setNewLimitation('')
  }

  const handleDeleteTier = (tier: any) => {
    setSelectedTier(tier)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedTier) {
      setTiers(tiers.filter(t => t.id !== selectedTier.id))
      setIsDeleteDialogOpen(false)
      setSelectedTier(null)
    }
  }

  const openEditDialog = (tier: any) => {
    setSelectedTier(tier)
    form.reset({
      name: tier.name,
      description: tier.description,
      price: tier.price,
      billingPeriod: tier.billingPeriod,
      annualPrice: tier.annualPrice,
      currency: tier.currency,
      isPopular: tier.isPopular,
      isActive: tier.isActive,
      features: tier.features,
      limitations: tier.limitations
    })
    setIsEditDialogOpen(true)
  }

  const duplicateTier = (tier: any) => {
    const duplicatedTier = {
      ...tier,
      id: Math.random().toString(36).substr(2, 9),
      name: `${tier.name} (Copy)`,
      isPopular: false,
      customerCount: 0,
      conversionRate: 0,
      revenue: 0
    }
    setTiers(prev => [...prev, duplicatedTier])
  }

  const toggleTierStatus = (tier: any) => {
    setTiers(prev => prev.map(t => 
      t.id === tier.id ? { ...t, isActive: !t.isActive } : t
    ))
  }

  const getRandomColor = () => {
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter':
        return <Zap className="h-6 w-6" />
      case 'professional':
        return <Star className="h-6 w-6" />
      case 'enterprise':
        return <Crown className="h-6 w-6" />
      case 'free':
        return <Target className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const calculateSavings = (monthlyPrice: number, annualPrice: number) => {
    const monthlyTotal = monthlyPrice * 12
    const savings = monthlyTotal - annualPrice
    const percentage = (savings / monthlyTotal) * 100
    return { savings, percentage }
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = form.getValues('features')
      form.setValue('features', [...currentFeatures, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues('features')
    form.setValue('features', currentFeatures.filter((_, i) => i !== index))
  }

  const addLimitation = () => {
    if (newLimitation.trim()) {
      const currentLimitations = form.getValues('limitations') || []
      form.setValue('limitations', [...currentLimitations, newLimitation.trim()])
      setNewLimitation('')
    }
  }

  const removeLimitation = (index: number) => {
    const currentLimitations = form.getValues('limitations') || []
    form.setValue('limitations', currentLimitations.filter((_, i) => i !== index))
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} customers
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const totalRevenue = tiers.reduce((sum, tier) => sum + tier.revenue, 0)
  const totalCustomers = tiers.reduce((sum, tier) => sum + tier.customerCount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Tiers</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and pricing strategy
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}>
            {viewMode === 'grid' ? 'Table View' : 'Grid View'}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Tier
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              Monthly recurring revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Across all plans
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tiers.filter(t => t.isActive).length}</div>
            <p className="text-xs text-muted-foreground">
              of {tiers.length} total plans
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((tiers.reduce((sum, tier) => sum + tier.conversionRate, 0) / tiers.length) || 0).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average conversion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Tiers Grid */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`relative border-2 transition-all hover:shadow-lg ${
                tier.isPopular 
                  ? 'border-primary ring-2 ring-primary/20 scale-105' 
                  : 'border-border'
              } ${!tier.isActive ? 'opacity-60' : ''}`}
            >
              {tier.isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              {!tier.isActive && (
                <Badge variant="secondary" className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Inactive
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
                  >
                    {getPlanIcon(tier.name)}
                  </div>
                </div>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Pricing */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold">{formatCurrency(tier.price)}</span>
                    <span className="text-muted-foreground ml-2">
                      /{tier.billingPeriod}
                    </span>
                  </div>
                  {tier.billingPeriod === 'monthly' && tier.annualPrice > 0 && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {formatCurrency(tier.annualPrice)} annually
                      <Badge variant="outline" className="ml-2 text-xs">
                        Save {calculateSavings(tier.price, tier.annualPrice).percentage.toFixed(0)}%
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {tier.limitations && tier.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                      <X className="h-4 w-4" />
                      <span className="text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm border-t pt-3">
                  <div className="text-center">
                    <div className="font-semibold">{tier.customerCount}</div>
                    <div className="text-muted-foreground text-xs">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{tier.conversionRate}%</div>
                    <div className="text-muted-foreground text-xs">Conversion</div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex space-x-2">
                <Button 
                  variant={tier.isPopular ? "default" : "outline"} 
                  className="flex-1"
                  disabled={!tier.isActive}
                >
                  Select Plan
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => openEditDialog(tier)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card>
          <CardHeader>
            <CardTitle>Pricing Plans</CardTitle>
            <CardDescription>
              Detailed view of all pricing tiers and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tiers.map((tier) => (
                <div key={tier.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tier.color }}
                    />
                    <div>
                      <div className="font-semibold flex items-center space-x-2">
                        <span>{tier.name}</span>
                        {tier.isPopular && (
                          <Badge variant="default" className="text-xs">
                            Popular
                          </Badge>
                        )}
                        {!tier.isActive && (
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tier.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(tier.price)}</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{tier.customerCount}</div>
                      <div className="text-sm text-muted-foreground">customers</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(tier.revenue)}</div>
                      <div className="text-sm text-muted-foreground">revenue</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={tier.isActive}
                        onCheckedChange={() => toggleTierStatus(tier)}
                      />
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(tier)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => duplicateTier(tier)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTier(tier)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plan Growth</CardTitle>
            <CardDescription>
              Customer growth by plan over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pricingAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="starter" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Starter"
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
                    dataKey="enterprise" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Enterprise"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>
              Revenue share by pricing plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="plan" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                  />
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

      {/* Create/Edit Tier Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={isCreateDialogOpen ? setIsCreateDialogOpen : setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreateDialogOpen ? 'Create New Pricing Tier' : 'Edit Pricing Tier'}
            </DialogTitle>
            <DialogDescription>
              {isCreateDialogOpen 
                ? 'Define a new pricing plan for your customers.' 
                : 'Update the pricing tier details and features.'
              }
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(isCreateDialogOpen ? handleCreateTier : handleEditTier)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Professional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what this plan offers..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="billingPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Period</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select billing period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Features Management */}
              <div>
                <FormLabel>Features</FormLabel>
                <div className="space-y-2 mt-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a feature..."
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addFeature()
                        }
                      }}
                    />
                    <Button type="button" onClick={addFeature}>
                      Add
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {form.watch('features').map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Limitations Management */}
              <div>
                <FormLabel>Limitations</FormLabel>
                <div className="space-y-2 mt-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a limitation..."
                      value={newLimitation}
                      onChange={(e) => setNewLimitation(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addLimitation()
                        }
                      }}
                    />
                    <Button type="button" onClick={addLimitation}>
                      Add
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {(form.watch('limitations') || []).map((limitation, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{limitation}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLimitation(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 flex-1">
                      <div className="space-y-0.5">
                        <FormLabel>Popular Plan</FormLabel>
                        <FormDescription>
                          Highlight this plan as most popular
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
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 flex-1">
                      <div className="space-y-0.5">
                        <FormLabel>Active Plan</FormLabel>
                        <FormDescription>
                          Make this plan available
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
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={isCreateDialogOpen ? () => setIsCreateDialogOpen(false) : () => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isCreateDialogOpen ? 'Create Tier' : 'Save Changes'}
                </Button>
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
              "{selectedTier?.name}" pricing tier and remove it from your offerings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Tier
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default PricingTiers