import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X,
  Star,
  Crown,
  Sparkles,
  Users,
  Zap,
  Database,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { usePlans, usePlanMutations } from '@/hooks'
import type { Plan as ApiPlan } from '@/api/types'

type Plan = {
  id: string
  name: string
  description: string
  price: number
  billingPeriod: 'monthly' | 'yearly'
  currency: string
  features: string[]
  isActive: boolean
  isPopular: boolean
  maxUsers: number
  storage: string
  support: string
  createdAt: Date
  updatedAt: Date
}

// Form validation schema
const planFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  billingPeriod: z.enum(['monthly', 'yearly']),
  currency: z.string().default('USD'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  maxUsers: z.number().min(1, 'Must have at least 1 user'),
  storage: z.string().min(1, 'Storage is required'),
  support: z.string().min(1, 'Support type is required')
})

type PlanFormValues = z.infer<typeof planFormSchema>

// Helper to map API Plan to local Plan type
const mapApiPlanToLocal = (apiPlan: ApiPlan): Plan => ({
  id: apiPlan._id,
  name: apiPlan.name,
  description: apiPlan.description || '',
  price: apiPlan.price,
  billingPeriod: apiPlan.billingCycle === 'yearly' || apiPlan.billingCycle === 'monthly' 
    ? apiPlan.billingCycle 
    : 'monthly',
  currency: apiPlan.currency,
  features: apiPlan.features,
  isActive: apiPlan.isActive,
  isPopular: apiPlan.tier === 'professional',
  maxUsers: apiPlan.maxUsers,
  storage: `${apiPlan.maxStorage}GB`,
  support: apiPlan.tier === 'enterprise' ? '24/7' : apiPlan.tier === 'professional' ? 'priority' : 'email',
  createdAt: new Date(apiPlan.createdAt),
  updatedAt: new Date(apiPlan.updatedAt)
})

const PlansSubscriptions = () => {
  // API hooks
  const { plans: apiPlans, loading, error, refetch } = usePlans()
  const { createPlan, updatePlan, deletePlan, loading: mutationLoading } = usePlanMutations()
  
  // Map API plans to local Plan type
  const plans: Plan[] = React.useMemo(() => {
    return apiPlans.map(mapApiPlanToLocal)
  }, [apiPlans])
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [newFeature, setNewFeature] = useState('')

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      billingPeriod: 'monthly',
      currency: 'USD',
      features: [],
      isActive: true,
      isPopular: false,
      maxUsers: 1,
      storage: '',
      support: ''
    }
  })

  // Helper to parse storage string to number
  const parseStorageToNumber = (storage: string): number => {
    const match = storage.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 10;
  }

  // Helper to map form data to API format
  const mapFormToApi = (data: PlanFormValues) => ({
    name: data.name,
    description: data.description,
    price: data.price,
    currency: data.currency,
    billingCycle: data.billingPeriod as 'monthly' | 'yearly' | 'one-time',
    features: data.features,
    maxUsers: data.maxUsers,
    maxStorage: parseStorageToNumber(data.storage),
    isActive: data.isActive,
    tier: data.price >= 150 ? 'enterprise' as const : 
          data.price >= 50 ? 'professional' as const : 
          data.price > 0 ? 'basic' as const : 'free' as const
  })

  const handleCreatePlan = async (data: PlanFormValues) => {
    try {
      await createPlan(mapFormToApi(data))
      refetch()
      setIsCreateDialogOpen(false)
      form.reset()
    } catch (err) {
      console.error('Failed to create plan:', err)
    }
  }

  const handleEditPlan = async (data: PlanFormValues) => {
    if (!selectedPlan) return
    
    try {
      await updatePlan(selectedPlan.id, mapFormToApi(data))
      refetch()
      setIsEditDialogOpen(false)
      setSelectedPlan(null)
    } catch (err) {
      console.error('Failed to update plan:', err)
    }
  }

  const handleDeletePlan = async () => {
    if (!selectedPlan) return
    
    try {
      await deletePlan(selectedPlan.id)
      refetch()
      setIsDeleteDialogOpen(false)
      setSelectedPlan(null)
    } catch (err) {
      console.error('Failed to delete plan:', err)
    }
  }

  const openEditDialog = (plan: Plan) => {
    setSelectedPlan(plan)
    form.reset({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      billingPeriod: plan.billingPeriod,
      currency: plan.currency,
      features: plan.features,
      isActive: plan.isActive,
      isPopular: plan.isPopular,
      maxUsers: plan.maxUsers,
      storage: plan.storage,
      support: plan.support
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsDeleteDialogOpen(true)
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

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter':
        return <Zap className="h-6 w-6" />
      case 'professional':
        return <Sparkles className="h-6 w-6" />
      case 'enterprise':
        return <Crown className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'starter':
        return 'border-blue-200 bg-blue-50'
      case 'professional':
        return 'border-purple-200 bg-purple-50'
      case 'enterprise':
        return 'border-orange-200 bg-orange-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-24" />
                <div className="space-y-2 mt-4">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">Failed to load plans</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plans & Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and pricing
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} disabled={mutationLoading}>
          {mutationLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
          Create New Plan
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative border-2 justify-between dark:text-slate-800 ${getPlanColor(plan.name)} ${
              plan.isPopular ? 'ring-2 ring-purple-500' : ''
            }`}
          >
            {plan.isPopular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getPlanIcon(plan.name)}
                  <CardTitle>{plan.name}</CardTitle>
                </div>
                <Badge variant={plan.isActive ? "default" : "secondary"}>
                  {plan.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground ml-2">
                  /{plan.billingPeriod}
                </span>
              </div>
              
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Up to {plan.maxUsers} users</span>
                </div>
                <div className="flex items-center space-x-2">
                <Database  className='text-muted-foreground h-4 w-4'/>
                  <span>{plan.storage} storage</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1 dark:bg-slate-800 dark:text-gray-50"
                onClick={() => openEditDialog(plan)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant="destructive"
                className='dark:bg-red-600' 
                size="icon"
                onClick={() => openDeleteDialog(plan)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Create Plan Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Plan</DialogTitle>
            <DialogDescription>
              Add a new subscription plan to your SaaS offering.
            </DialogDescription>
          </DialogHeader>
          <PlanForm
            form={form}
            onSubmit={handleCreatePlan}
            newFeature={newFeature}
            setNewFeature={setNewFeature}
            addFeature={addFeature}
            removeFeature={removeFeature}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
            <DialogDescription>
              Update the subscription plan details.
            </DialogDescription>
          </DialogHeader>
          <PlanForm
            form={form}
            onSubmit={handleEditPlan}
            newFeature={newFeature}
            setNewFeature={setNewFeature}
            addFeature={addFeature}
            removeFeature={removeFeature}
            isEditing={true}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              "{selectedPlan?.name}" plan and remove it from your offerings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePlan}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Plan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Reusable Plan Form Component
interface PlanFormProps {
  form: any
  onSubmit: (data: PlanFormValues) => void
  newFeature: string
  setNewFeature: (value: string) => void
  addFeature: () => void
  removeFeature: (index: number) => void
  isEditing?: boolean
}

const PlanForm: React.FC<PlanFormProps> = ({
  form,
  onSubmit,
  newFeature,
  setNewFeature,
  addFeature,
  removeFeature,
  isEditing = false
}) => {
  const features = form.watch('features') || []

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormLabel>Price</FormLabel>
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
            name="maxUsers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Users</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder="10"
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="storage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 100GB" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="support"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select support level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email">Email Support</SelectItem>
                    <SelectItem value="priority">Priority Support</SelectItem>
                    <SelectItem value="24/7">24/7 Support</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Features Management */}
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <div className="space-y-2">
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
                <div className="space-y-2">
                  {features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span>{feature}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 flex-1">
                <div className="space-y-0.5">
                  <FormLabel>Active Plan</FormLabel>
                  <FormDescription>
                    Make this plan available for purchase
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
            name="isPopular"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 flex-1">
                <div className="space-y-0.5">
                  <FormLabel>Popular Plan</FormLabel>
                  <FormDescription>
                    Highlight this plan as popular
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
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => isEditing ? setIsEditDialogOpen(false) : setIsCreateDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Plan' : 'Create Plan'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default PlansSubscriptions