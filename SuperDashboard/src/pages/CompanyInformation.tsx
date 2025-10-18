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
  Building,
  MapPin,
  Phone,
  Globe,
  Mail,
  Users,
  Calendar,
  FileText,
  Edit,
  Save,
  Upload,
  Download,
  Eye,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  CreditCard,
  Settings
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Form validation schema
const companyInfoSchema = z.object({
  // Basic Information
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  legalName: z.string().min(2, 'Legal name must be at least 2 characters'),
  companyEmail: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  
  // Address
  streetAddress: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(3, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  
  // Business Details
  industry: z.string().min(2, 'Industry is required'),
  companySize: z.string().min(1, 'Company size is required'),
  foundedYear: z.number().min(1800, 'Invalid year').max(new Date().getFullYear()),
  taxId: z.string().optional(),
  businessNumber: z.string().optional(),
  
  // Branding
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description too long'),
  missionStatement: z.string().max(1000, 'Mission statement too long').optional(),
  values: z.array(z.string()).optional(),
  
  // Social Media
  twitterUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  facebookUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagramUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  
  // Legal
  termsUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  privacyUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  supportEmail: z.string().email('Invalid email address').optional().or(z.literal(''))
})

type CompanyInfoFormValues = z.infer<typeof companyInfoSchema>

const CompanyInformation = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [logo, setLogo] = useState('/api/placeholder/120/120')

  // Mock company data
  const companyData = {
    // Basic Information
    companyName: 'TechCorp Inc.',
    legalName: 'TechCorp Incorporated',
    companyEmail: 'admin@techcorp.example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://techcorp.example.com',
    
    // Address
    streetAddress: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
    
    // Business Details
    industry: 'Technology & Software',
    companySize: '51-200',
    foundedYear: 2018,
    taxId: '12-3456789',
    businessNumber: 'BC1234567',
    
    // Branding
    description: 'Leading provider of innovative SaaS solutions for modern businesses. We empower organizations to streamline operations and drive growth through cutting-edge technology.',
    missionStatement: 'To democratize access to enterprise-grade software solutions for businesses of all sizes, enabling them to compete and thrive in the digital age.',
    values: ['Innovation', 'Customer Success', 'Transparency', 'Excellence', 'Collaboration'],
    
    // Social Media
    twitterUrl: 'https://twitter.com/techcorp',
    linkedinUrl: 'https://linkedin.com/company/techcorp',
    facebookUrl: 'https://facebook.com/techcorp',
    instagramUrl: 'https://instagram.com/techcorp',
    
    // Legal
    termsUrl: 'https://techcorp.example.com/terms',
    privacyUrl: 'https://techcorp.example.com/privacy',
    supportEmail: 'support@techcorp.example.com',
    
    // Additional metadata
    status: 'active',
    plan: 'Enterprise',
    customerCount: 1250,
    employeeCount: 156,
    monthlyRevenue: 125400,
    verificationStatus: 'verified',
    lastUpdated: '2024-03-20'
  }

  const form = useForm<CompanyInfoFormValues>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: companyData
  })

  const handleSave = async (data: CompanyInfoFormValues) => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Saving company information:', data)
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const companyStats = [
    { label: 'Total Customers', value: '1,250', icon: Users, change: '+12%', trend: 'up' },
    { label: 'Monthly Revenue', value: '$125,400', icon: DollarSign, change: '+8.5%', trend: 'up' },
    { label: 'Employees', value: '156', icon: Users, change: '+5%', trend: 'up' },
    { label: 'Years Operating', value: '6', icon: Calendar, change: '', trend: 'neutral' }
  ]

  const industries = [
    'Technology & Software',
    'Healthcare',
    'Finance & Banking',
    'E-commerce',
    'Education',
    'Manufacturing',
    'Consulting',
    'Marketing & Advertising',
    'Real Estate',
    'Other'
  ]

  const companySizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '501-1000',
    '1000+'
  ]

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'Other'
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Information</h1>
          <p className="text-muted-foreground">
            Manage your company profile and business details
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={() => window.open(companyData.website, '_blank')}>
                <Eye className="h-4 w-4 mr-2" />
                View Public Profile
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Information
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button 
                onClick={form.handleSubmit(handleSave)}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Company Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {companyStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <div className={`flex items-center text-xs ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${
                    stat.trend === 'down' ? 'transform rotate-180' : ''
                  }`} />
                  {stat.change} from last month
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>
                Basic information about your company
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  {/* Logo Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={logo}
                        alt="Company Logo"
                        className="w-24 h-24 rounded-lg border object-cover"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => document.getElementById('logo-upload')?.click()}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">Company Logo</h3>
                      <p className="text-sm text-muted-foreground">
                        Recommended: 240x240px PNG or JPG
                      </p>
                      {isEditing && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => document.getElementById('logo-upload')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload New Logo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your Company Name" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="legalName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Legal Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Legal Business Name" 
                                {...field} 
                                disabled={!isEditing}
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
                        name="companyEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Email *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="admin@company.com" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+1 (555) 123-4567" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com" 
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Address Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="streetAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123 Business Street" 
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="City" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="State" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="ZIP Code" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={!isEditing}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map(country => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Business Details</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={!isEditing}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industries.map(industry => (
                                  <SelectItem key={industry} value={industry}>
                                    {industry}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companySize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Size *</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                              disabled={!isEditing}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {companySizes.map(size => (
                                  <SelectItem key={size} value={size}>
                                    {size} employees
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="foundedYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Founded Year *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                min="1800"
                                max={new Date().getFullYear()}
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="taxId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax ID / EIN</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="12-3456789" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="businessNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Registration number" 
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Branding */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Branding</h3>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Description *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your company and what you do..."
                              className="min-h-[100px]"
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description of your company (max 500 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="missionStatement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mission Statement</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your company's mission and vision..."
                              className="min-h-[80px]"
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormDescription>
                            Optional mission statement (max 1000 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Social Media */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Media</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="twitterUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://twitter.com/username" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="linkedinUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://linkedin.com/company/company" 
                                {...field} 
                                disabled={!isEditing}
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
                        name="facebookUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://facebook.com/username" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="instagramUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://instagram.com/username" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Legal */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Legal Information</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="termsUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Terms of Service URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/terms" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="privacyUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Privacy Policy URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/privacy" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="supportEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Support Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="support@example.com" 
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Status */}
          <Card>
            <CardHeader>
              <CardTitle>Company Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Verification Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Account Status</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Plan</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-800">
                  Enterprise
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {companyData.lastUpdated}
                </span>
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
                <Download className="h-4 w-4 mr-2" />
                Export Company Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Business Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                View Public Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Company Settings
              </Button>
            </CardContent>
          </Card>

          {/* Company Values */}
          <Card>
            <CardHeader>
              <CardTitle>Company Values</CardTitle>
              <CardDescription>
                Core values that define your company culture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {companyData.values.map((value, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {value}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <Button variant="outline" className="w-full mt-4">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Values
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Contact our support team for assistance with company verification or profile updates.
              </div>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CompanyInformation