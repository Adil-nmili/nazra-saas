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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Mail,
  Download,
  Upload,
  Search,
  Filter,
  Send,
  TestTube,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  BarChart3,
  Palette,
  Code,
  Smartphone,
  Monitor,
  Save
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Mock email templates data
const emailTemplates = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to {{company_name}}!',
    category: 'onboarding',
    description: 'Sent to new users after signup',
    isActive: true,
    lastEdited: '2024-03-20',
    usageCount: 1245,
    openRate: 68.5,
    clickRate: 23.2,
    variables: ['user_name', 'company_name', 'login_url'],
    preview: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to {{company_name}}, {{user_name}}!</h1>
        <p>We're excited to have you on board. Get started by exploring your dashboard.</p>
        <a href="{{login_url}}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Get Started</a>
      </div>
    `
  },
  {
    id: '2',
    name: 'Password Reset',
    subject: 'Reset your {{company_name}} password',
    category: 'authentication',
    description: 'Sent when users request password reset',
    isActive: true,
    lastEdited: '2024-03-18',
    usageCount: 567,
    openRate: 45.2,
    clickRate: 38.7,
    variables: ['user_name', 'reset_url', 'expiry_time'],
    preview: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Password Reset Request</h1>
        <p>Hi {{user_name}}, we received a request to reset your password.</p>
        <a href="{{reset_url}}" style="background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Reset Password</a>
        <p><small>This link expires in {{expiry_time}}.</small></p>
      </div>
    `
  },
  {
    id: '3',
    name: 'Payment Receipt',
    subject: 'Payment confirmation for {{invoice_id}}',
    category: 'billing',
    description: 'Sent after successful payments',
    isActive: true,
    lastEdited: '2024-03-15',
    usageCount: 892,
    openRate: 72.1,
    clickRate: 15.4,
    variables: ['user_name', 'invoice_id', 'amount', 'plan_name', 'next_billing_date'],
    preview: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Payment Confirmed</h1>
        <p>Thank you for your payment, {{user_name}}!</p>
        <div style="background: #f8fafc; padding: 16px; border-radius: 8px;">
          <p><strong>Invoice:</strong> {{invoice_id}}</p>
          <p><strong>Amount:</strong> {{amount}}</p>
          <p><strong>Plan:</strong> {{plan_name}}</p>
        </div>
      </div>
    `
  },
  {
    id: '4',
    name: 'Trial Ending',
    subject: 'Your trial ends in {{days_remaining}} days',
    category: 'retention',
    description: 'Sent before trial period ends',
    isActive: true,
    lastEdited: '2024-03-10',
    usageCount: 234,
    openRate: 58.9,
    clickRate: 31.5,
    variables: ['user_name', 'days_remaining', 'upgrade_url', 'trial_end_date'],
    preview: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Your Trial is Ending Soon</h1>
        <p>Hi {{user_name}}, your trial ends on {{trial_end_date}}.</p>
        <a href="{{upgrade_url}}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Upgrade Now</a>
      </div>
    `
  },
  {
    id: '5',
    name: 'Account Suspended',
    subject: 'Your {{company_name}} account has been suspended',
    category: 'account',
    description: 'Sent when accounts are suspended',
    isActive: false,
    lastEdited: '2024-02-28',
    usageCount: 45,
    openRate: 89.2,
    clickRate: 42.1,
    variables: ['user_name', 'suspension_reason', 'support_url'],
    preview: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Account Suspended</h1>
        <p>Your account has been suspended due to: {{suspension_reason}}</p>
        <a href="{{support_url}}" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Contact Support</a>
      </div>
    `
  }
]

const templateCategories = [
  'all',
  'onboarding',
  'authentication',
  'billing',
  'retention',
  'account',
  'marketing',
  'notifications'
]

const availableVariables = [
  { name: 'user_name', description: 'Full name of the user' },
  { name: 'user_email', description: 'Email address of the user' },
  { name: 'company_name', description: 'Your company name' },
  { name: 'login_url', description: 'URL to login page' },
  { name: 'reset_url', description: 'Password reset URL' },
  { name: 'invoice_id', description: 'Invoice number or ID' },
  { name: 'amount', description: 'Payment amount with currency' },
  { name: 'plan_name', description: 'Subscription plan name' },
  { name: 'support_url', description: 'URL to support page' },
  { name: 'upgrade_url', description: 'URL to upgrade plan' }
]

// Form validation schema
const templateFormSchema = z.object({
  name: z.string().min(2, 'Template name must be at least 2 characters'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  htmlContent: z.string().min(10, 'HTML content is required'),
  plainTextContent: z.string().optional(),
  variables: z.array(z.string()).optional()
})

type TemplateFormValues = z.infer<typeof templateFormSchema>

const EmailTemplates = () => {
  const [templates, setTemplates] = useState(emailTemplates)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('design')
  const [previewMode, setPreviewMode] = useState('desktop')

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: '',
      subject: '',
      category: 'onboarding',
      description: '',
      isActive: true,
      htmlContent: '',
      plainTextContent: '',
      variables: []
    }
  })

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  const handleCreateTemplate = (data: TemplateFormValues) => {
    const newTemplate = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      lastEdited: new Date().toISOString().split('T')[0],
      usageCount: 0,
      openRate: 0,
      clickRate: 0,
      variables: data.variables || []
    }
    setTemplates(prev => [...prev, newTemplate])
    setIsCreateDialogOpen(false)
    form.reset()
  }

  const handleEditTemplate = (data: TemplateFormValues) => {
    if (!selectedTemplate) return
    
    const updatedTemplate = {
      ...selectedTemplate,
      ...data,
      lastEdited: new Date().toISOString().split('T')[0]
    }
    
    setTemplates(prev => prev.map(template => 
      template.id === selectedTemplate.id ? updatedTemplate : template
    ))
    setIsEditDialogOpen(false)
    setSelectedTemplate(null)
  }

  const handleDeleteTemplate = (template: any) => {
    setSelectedTemplate(template)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedTemplate) {
      setTemplates(templates.filter(t => t.id !== selectedTemplate.id))
      setIsDeleteDialogOpen(false)
      setSelectedTemplate(null)
    }
  }

  const openEditDialog = (template: any) => {
    setSelectedTemplate(template)
    form.reset({
      name: template.name,
      subject: template.subject,
      category: template.category,
      description: template.description,
      isActive: template.isActive,
      htmlContent: template.preview,
      plainTextContent: '',
      variables: template.variables
    })
    setIsEditDialogOpen(true)
  }

  const openPreview = (template: any) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  const duplicateTemplate = (template: any) => {
    const duplicatedTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      name: `${template.name} (Copy)`,
      lastEdited: new Date().toISOString().split('T')[0],
      usageCount: 0
    }
    setTemplates(prev => [...prev, duplicatedTemplate])
  }

  const toggleTemplateStatus = (template: any) => {
    setTemplates(prev => prev.map(t => 
      t.id === template.id ? { ...t, isActive: !t.isActive } : t
    ))
  }

  const sendTestEmail = (template: any) => {
    console.log('Sending test email for template:', template.name)
    // In real app, this would call an API to send test email
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      onboarding: 'bg-blue-100 text-blue-800',
      authentication: 'bg-green-100 text-green-800',
      billing: 'bg-purple-100 text-purple-800',
      retention: 'bg-orange-100 text-orange-800',
      account: 'bg-red-100 text-red-800',
      marketing: 'bg-pink-100 text-pink-800',
      notifications: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? 
      <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />
  }

  const insertVariable = (variable: string) => {
    const currentContent = form.getValues('htmlContent') || ''
    form.setValue('htmlContent', currentContent + ` {{${variable}}}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
          <p className="text-muted-foreground">
            Manage and customize your email templates
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground">
              Email templates created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {templates.filter(t => t.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently enabled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(templates.reduce((sum, t) => sum + t.openRate, 0) / templates.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average across all templates
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {templates.reduce((sum, t) => sum + t.usageCount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Emails sent this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates by name or description..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {templateCategories.filter(cat => cat !== 'all').map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className={`relative ${!template.isActive ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>{template.name}</span>
                    {getStatusIcon(template.isActive)}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {template.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Preview */}
              <div 
                className="bg-muted rounded-lg p-3 text-sm h-32 overflow-hidden cursor-pointer"
                onClick={() => openPreview(template)}
              >
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: template.preview.replace(/\{\{.*?\}\}/g, '[Variable]') }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-semibold">{template.usageCount}</div>
                  <div className="text-muted-foreground">Sent</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{template.openRate}%</div>
                  <div className="text-muted-foreground">Opened</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{template.clickRate}%</div>
                  <div className="text-muted-foreground">Clicked</div>
                </div>
              </div>

              {/* Variables */}
              <div>
                <div className="text-sm font-medium mb-1">Variables</div>
                <div className="flex flex-wrap gap-1">
                  {template.variables.slice(0, 3).map((variable, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {variable}
                    </Badge>
                  ))}
                  {template.variables.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.variables.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-4">
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" onClick={() => openPreview(template)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => sendTestEmail(template)}>
                  <TestTube className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => duplicateTemplate(template)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" onClick={() => openEditDialog(template)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteTemplate(template)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first email template'
              }
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Template Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={isCreateDialogOpen ? setIsCreateDialogOpen : setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {isCreateDialogOpen ? 'Create New Template' : 'Edit Template'}
            </DialogTitle>
            <DialogDescription>
              {isCreateDialogOpen 
                ? 'Create a new email template for your communications.' 
                : 'Update your email template content and settings.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="variables">Variables</TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form className="flex-1 overflow-auto">
                <TabsContent value="settings" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Welcome Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {templateCategories.filter(cat => cat !== 'all').map(category => (
                                <SelectItem key={category} value={category}>
                                  {category.charAt(0).toUpperCase() + category.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Welcome to {{company_name}}!" {...field} />
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
                            placeholder="Describe when this template is used..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active</FormLabel>
                          <FormDescription>
                            Enable this template for sending
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
                </TabsContent>

                <TabsContent value="design" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>HTML Content</FormLabel>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Palette className="h-4 w-4 mr-2" />
                        Design Tools
                      </Button>
                      <Button variant="outline" size="sm">
                        <Code className="h-4 w-4 mr-2" />
                        Code Editor
                      </Button>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="htmlContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your HTML email content..."
                            className="min-h-[400px] font-mono text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Use {'{{variable}}'} syntax for dynamic content
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="plainTextContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plain Text Version</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Plain text version for email clients that don't support HTML..."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional: Fallback content for non-HTML email clients
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <FormLabel>Email Preview</FormLabel>
                    <div className="flex space-x-2">
                      <Button
                        variant={previewMode === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('desktop')}
                      >
                        <Monitor className="h-4 w-4 mr-2" />
                        Desktop
                      </Button>
                      <Button
                        variant={previewMode === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewMode('mobile')}
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        Mobile
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg bg-white ${
                    previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                  }`}>
                    <div className="border-b p-4">
                      <div className="text-sm font-medium">Subject: {form.watch('subject')}</div>
                    </div>
                    <div 
                      className="p-6 min-h-[400px]"
                      dangerouslySetInnerHTML={{ 
                        __html: form.watch('htmlContent')?.replace(/\{\{.*?\}\}/g, '<span class="bg-yellow-100 px-1 rounded">[Variable]</span>') || '<p class="text-muted-foreground">No content yet</p>' 
                      }}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="variables" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Available Variables</FormLabel>
                      <FormDescription>
                        Click on a variable to insert it into your template
                      </FormDescription>
                    </div>
                    
                    <div className="grid gap-2">
                      {availableVariables.map((variable) => (
                        <div
                          key={variable.name}
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                          onClick={() => insertVariable(variable.name)}
                        >
                          <div>
                            <div className="font-mono text-sm bg-primary/10 px-2 py-1 rounded">
                              {'{{' + variable.name + '}}'}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {variable.description}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Insert
                          </Button>
                        </div>
                      ))}
                    </div>

                    <FormField
                      control={form.control}
                      name="variables"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Used Variables</FormLabel>
                          <FormControl>
                            <div className="flex flex-wrap gap-2 p-3 border rounded-lg">
                              {field.value?.map((variable, index) => (
                                <Badge key={index} variant="secondary">
                                  {variable}
                                </Badge>
                              ))}
                              {(!field.value || field.value.length === 0) && (
                                <span className="text-muted-foreground text-sm">
                                  No variables used yet
                                </span>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Variables detected in your template content
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </form>
            </Form>

            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={isCreateDialogOpen ? () => setIsCreateDialogOpen(false) : () => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={form.handleSubmit(isCreateDialogOpen ? handleCreateTemplate : handleEditTemplate)}
              >
                <Save className="h-4 w-4 mr-2" />
                {isCreateDialogOpen ? 'Create Template' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              Preview of {selectedTemplate?.name} template
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-lg bg-white">
            <div className="border-b p-4">
              <div className="text-sm font-medium">Subject: {selectedTemplate?.subject}</div>
            </div>
            <div 
              className="p-6 min-h-[400px]"
              dangerouslySetInnerHTML={{ 
                __html: selectedTemplate?.preview.replace(/\{\{.*?\}\}/g, '<span class="bg-yellow-100 px-1 rounded">[Variable]</span>') || '' 
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => selectedTemplate && sendTestEmail(selectedTemplate)}>
              <TestTube className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              "{selectedTemplate?.name}" template and remove it from your system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Template
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default EmailTemplates