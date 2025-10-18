import React, { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { 
  Bell,
  Mail,
  MessageCircle,
  Slack,
  Zap,
  Webhook,
  Smartphone,
  Desktop,
  Volume2,
  VolumeX,
  TestTube,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Clock,
  User,
  Shield,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Plus,
  Trash2
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Form validation schemas
const emailSettingsSchema = z.object({
  emailEnabled: z.boolean().default(true),
  sendAs: z.string().email('Invalid email address'),
  dailyDigest: z.boolean().default(true),
  weeklyReport: z.boolean().default(true),
  monthlyReport: z.boolean().default(false),
  immediateAlerts: z.boolean().default(true),
  batchNotifications: z.boolean().default(false),
  batchFrequency: z.enum(['hourly', 'every_4_hours', 'every_12_hours']).default('hourly')
})

const pushSettingsSchema = z.object({
  pushEnabled: z.boolean().default(true),
  desktopNotifications: z.boolean().default(true),
  mobileNotifications: z.boolean().default(true),
  soundEnabled: z.boolean().default(true),
  vibrationEnabled: z.boolean().default(true),
  quietHoursEnabled: z.boolean().default(false),
  quietHoursStart: z.string().default('22:00'),
  quietHoursEnd: z.string().default('07:00')
})

const slackSettingsSchema = z.object({
  slackEnabled: z.boolean().default(false),
  webhookUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  channel: z.string().optional(),
  username: z.string().optional(),
  iconUrl: z.string().url('Invalid URL').optional().or(z.literal(''))
})

const smsSettingsSchema = z.object({
  smsEnabled: z.boolean().default(false),
  phoneNumber: z.string().optional(),
  provider: z.string().optional(),
  criticalAlertsOnly: z.boolean().default(true)
})

const webhookSettingsSchema = z.object({
  webhookEnabled: z.boolean().default(false),
  webhookUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  secret: z.string().optional(),
  retryAttempts: z.number().min(0).max(5).default(3),
  timeout: z.number().min(1).max(30).default(10)
})

type EmailSettingsValues = z.infer<typeof emailSettingsSchema>
type PushSettingsValues = z.infer<typeof pushSettingsSchema>
type SlackSettingsValues = z.infer<typeof slackSettingsSchema>
type SmsSettingsValues = z.infer<typeof smsSettingsSchema>
type WebhookSettingsValues = z.infer<typeof webhookSettingsSchema>

const NotificationsSettings = () => {
  const [activeTab, setActiveTab] = useState('email')
  const [isSaving, setIsSaving] = useState(false)
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false)
  const [testChannel, setTestChannel] = useState('')

  // Mock notification preferences
  const notificationPreferences = {
    // System Events
    newUserSignup: { email: true, push: true, slack: false, sms: false },
    userDeactivated: { email: true, push: false, slack: true, sms: false },
    systemMaintenance: { email: true, push: true, slack: true, sms: true },
    
    // Billing Events
    paymentReceived: { email: true, push: false, slack: false, sms: false },
    paymentFailed: { email: true, push: true, slack: true, sms: false },
    subscriptionExpiring: { email: true, push: true, slack: false, sms: false },
    
    // Security Events
    failedLogin: { email: true, push: true, slack: true, sms: true },
    passwordChanged: { email: true, push: false, slack: false, sms: false },
    newDeviceLogin: { email: true, push: true, slack: false, sms: true },
    
    // Performance Events
    highCpuUsage: { email: true, push: true, slack: true, sms: false },
    lowDiskSpace: { email: true, push: false, slack: true, sms: false },
    apiRateLimit: { email: true, push: true, slack: true, sms: false }
  }

  const emailForm = useForm<EmailSettingsValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      emailEnabled: true,
      sendAs: 'notifications@company.com',
      dailyDigest: true,
      weeklyReport: true,
      monthlyReport: false,
      immediateAlerts: true,
      batchNotifications: false,
      batchFrequency: 'hourly'
    }
  })

  const pushForm = useForm<PushSettingsValues>({
    resolver: zodResolver(pushSettingsSchema),
    defaultValues: {
      pushEnabled: true,
      desktopNotifications: true,
      mobileNotifications: true,
      soundEnabled: true,
      vibrationEnabled: true,
      quietHoursEnabled: false,
      quietHoursStart: '22:00',
      quietHoursEnd: '07:00'
    }
  })

  const slackForm = useForm<SlackSettingsValues>({
    resolver: zodResolver(slackSettingsSchema),
    defaultValues: {
      slackEnabled: false,
      webhookUrl: '',
      channel: '#general',
      username: 'System Bot',
      iconUrl: ''
    }
  })

  const smsForm = useForm<SmsSettingsValues>({
    resolver: zodResolver(smsSettingsSchema),
    defaultValues: {
      smsEnabled: false,
      phoneNumber: '+1 (555) 123-4567',
      provider: 'twilio',
      criticalAlertsOnly: true
    }
  })

  const webhookForm = useForm<WebhookSettingsValues>({
    resolver: zodResolver(webhookSettingsSchema),
    defaultValues: {
      webhookEnabled: false,
      webhookUrl: '',
      secret: '',
      retryAttempts: 3,
      timeout: 10
    }
  })

  const handleSave = async (form: any, channel: string) => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(`Saving ${channel} settings:`, form.getValues())
    setIsSaving(false)
  }

  const handleTestNotification = (channel: string) => {
    setTestChannel(channel)
    setIsTestDialogOpen(true)
    // In real app, this would call an API to send test notification
    setTimeout(() => {
      console.log(`Test ${channel} notification sent`)
    }, 1000)
  }

  const resetChannelSettings = (channel: string) => {
    const forms = {
      email: emailForm,
      push: pushForm,
      slack: slackForm,
      sms: smsForm,
      webhook: webhookForm
    }
    forms[channel as keyof typeof forms]?.reset()
  }

  const getChannelIcon = (channel: string) => {
    const icons = {
      email: Mail,
      push: Bell,
      slack: Slack,
      sms: MessageCircle,
      webhook: Webhook
    }
    const IconComponent = icons[channel as keyof typeof icons] || Bell
    return <IconComponent className="h-5 w-5" />
  }

  const getChannelColor = (channel: string) => {
    const colors = {
      email: 'text-blue-600 bg-blue-50',
      push: 'text-green-600 bg-green-50',
      slack: 'text-purple-600 bg-purple-50',
      sms: 'text-orange-600 bg-orange-50',
      webhook: 'text-gray-600 bg-gray-50'
    }
    return colors[channel as keyof typeof colors] || 'text-gray-600 bg-gray-50'
  }

  const notificationChannels = [
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Receive notifications via email',
      enabled: emailForm.watch('emailEnabled'),
      icon: Mail
    },
    {
      id: 'push',
      name: 'Push Notifications',
      description: 'Browser and mobile push notifications',
      enabled: pushForm.watch('pushEnabled'),
      icon: Bell
    },
    {
      id: 'slack',
      name: 'Slack Integration',
      description: 'Send notifications to Slack channels',
      enabled: slackForm.watch('slackEnabled'),
      icon: Slack
    },
    {
      id: 'sms',
      name: 'SMS Alerts',
      description: 'Critical alerts via text message',
      enabled: smsForm.watch('smsEnabled'),
      icon: MessageCircle
    },
    {
      id: 'webhook',
      name: 'Webhook Notifications',
      description: 'Send notifications to external services',
      enabled: webhookForm.watch('webhookEnabled'),
      icon: Webhook
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications Settings</h1>
          <p className="text-muted-foreground">
            Configure how and when you receive notifications
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => resetChannelSettings(activeTab)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            onClick={() => handleTestNotification(activeTab)}
            variant="outline"
          >
            <TestTube className="h-4 w-4 mr-2" />
            Test Notification
          </Button>
        </div>
      </div>

      {/* Notification Channels Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {notificationChannels.map((channel) => (
          <Card 
            key={channel.id}
            className={`cursor-pointer transition-all ${
              activeTab === channel.id ? 'ring-2 ring-primary' : ''
            } ${!channel.enabled ? 'opacity-60' : ''}`}
            onClick={() => setActiveTab(channel.id)}
          >
            <CardContent className="p-4 text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${getChannelColor(channel.id)}`}>
                <channel.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{channel.name}</h3>
              <div className="flex items-center justify-center">
                {channel.enabled ? (
                  <Badge variant="default" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Enabled
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    <EyeOff className="h-3 w-3 mr-1" />
                    Disabled
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="push" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Push</span>
          </TabsTrigger>
          <TabsTrigger value="slack" className="flex items-center space-x-2">
            <Slack className="h-4 w-4" />
            <span>Slack</span>
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>SMS</span>
          </TabsTrigger>
          <TabsTrigger value="webhook" className="flex items-center space-x-2">
            <Webhook className="h-4 w-4" />
            <span>Webhook</span>
          </TabsTrigger>
        </TabsList>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure email notification preferences and delivery settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form className="space-y-6">
                  <FormField
                    control={emailForm.control}
                    name="emailEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Email Notifications</FormLabel>
                          <FormDescription>
                            Receive notifications via email
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

                  {emailForm.watch('emailEnabled') && (
                    <>
                      <FormField
                        control={emailForm.control}
                        name="sendAs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Send As Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="notifications@company.com" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Email address that notifications will be sent from
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Email Reports</h3>
                        
                        <FormField
                          control={emailForm.control}
                          name="dailyDigest"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Daily Digest</FormLabel>
                                <FormDescription>
                                  Receive a daily summary of activities
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
                          control={emailForm.control}
                          name="weeklyReport"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Weekly Report</FormLabel>
                                <FormDescription>
                                  Receive a weekly performance report
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
                          control={emailForm.control}
                          name="monthlyReport"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Monthly Report</FormLabel>
                                <FormDescription>
                                  Receive a comprehensive monthly report
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

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Delivery Preferences</h3>
                        
                        <FormField
                          control={emailForm.control}
                          name="immediateAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Immediate Alerts</FormLabel>
                                <FormDescription>
                                  Receive critical alerts immediately
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
                          control={emailForm.control}
                          name="batchNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Batch Notifications</FormLabel>
                                <FormDescription>
                                  Group non-critical notifications
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

                        {emailForm.watch('batchNotifications') && (
                          <FormField
                            control={emailForm.control}
                            name="batchFrequency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Batch Frequency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="hourly">Every Hour</SelectItem>
                                    <SelectItem value="every_4_hours">Every 4 Hours</SelectItem>
                                    <SelectItem value="every_12_hours">Every 12 Hours</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave(emailForm, 'email')}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Email Settings'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Push Settings */}
        <TabsContent value="push" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Push Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure push notification preferences for desktop and mobile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...pushForm}>
                <form className="space-y-6">
                  <FormField
                    control={pushForm.control}
                    name="pushEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Push Notifications</FormLabel>
                          <FormDescription>
                            Receive browser and mobile push notifications
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

                  {pushForm.watch('pushEnabled') && (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Targets</h3>
                        
                        <FormField
                          control={pushForm.control}
                          name="desktopNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Desktop Notifications</FormLabel>
                                <FormDescription>
                                  Show notifications on desktop devices
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
                          control={pushForm.control}
                          name="mobileNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Mobile Notifications</FormLabel>
                                <FormDescription>
                                  Show notifications on mobile devices
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

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Behavior</h3>
                        
                        <FormField
                          control={pushForm.control}
                          name="soundEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Play Sound</FormLabel>
                                <FormDescription>
                                  Play sound when notification arrives
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
                          control={pushForm.control}
                          name="vibrationEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Vibration</FormLabel>
                                <FormDescription>
                                  Vibrate on mobile devices (if supported)
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

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Quiet Hours</h3>
                        
                        <FormField
                          control={pushForm.control}
                          name="quietHoursEnabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Enable Quiet Hours</FormLabel>
                                <FormDescription>
                                  Silence notifications during specified hours
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

                        {pushForm.watch('quietHoursEnabled') && (
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={pushForm.control}
                              name="quietHoursStart"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Time</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={pushForm.control}
                              name="quietHoursEnd"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Time</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave(pushForm, 'push')}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Push Settings'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Slack Settings */}
        <TabsContent value="slack" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Slack className="h-5 w-5" />
                <span>Slack Integration</span>
              </CardTitle>
              <CardDescription>
                Connect Slack to receive notifications in your workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...slackForm}>
                <form className="space-y-6">
                  <FormField
                    control={slackForm.control}
                    name="slackEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Slack Integration</FormLabel>
                          <FormDescription>
                            Send notifications to Slack channels
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

                  {slackForm.watch('slackEnabled') && (
                    <>
                      <FormField
                        control={slackForm.control}
                        name="webhookUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Webhook URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://hooks.slack.com/services/..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Slack incoming webhook URL
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={slackForm.control}
                          name="channel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Channel</FormLabel>
                              <FormControl>
                                <Input placeholder="#general" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={slackForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="System Bot" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={slackForm.control}
                        name="iconUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon URL (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://example.com/icon.png" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Custom icon for Slack messages
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-blue-800">
                          <Zap className="h-4 w-4" />
                          <span className="font-medium">Setup Instructions</span>
                        </div>
                        <ol className="text-sm text-blue-700 mt-2 space-y-1 list-decimal list-inside">
                          <li>Go to your Slack workspace settings</li>
                          <li>Navigate to "Incoming Webhooks"</li>
                          <li>Add a new webhook and select a channel</li>
                          <li>Copy the webhook URL and paste it above</li>
                        </ol>
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave(slackForm, 'slack')}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Slack Settings'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SMS Settings */}
        <TabsContent value="sms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>SMS Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure SMS alerts for critical notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...smsForm}>
                <form className="space-y-6">
                  <FormField
                    control={smsForm.control}
                    name="smsEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable SMS Notifications</FormLabel>
                          <FormDescription>
                            Receive critical alerts via text message
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

                  {smsForm.watch('smsEnabled') && (
                    <>
                      <FormField
                        control={smsForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+1 (555) 123-4567" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Phone number to receive SMS alerts
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={smsForm.control}
                        name="provider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMS Provider</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="twilio">Twilio</SelectItem>
                                <SelectItem value="plivo">Plivo</SelectItem>
                                <SelectItem value="nexmo">Vonage (Nexmo)</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={smsForm.control}
                        name="criticalAlertsOnly"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Critical Alerts Only</FormLabel>
                              <FormDescription>
                                Only send SMS for critical system alerts
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

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-amber-800">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">SMS Costs</span>
                        </div>
                        <p className="text-sm text-amber-700 mt-2">
                          SMS notifications may incur additional costs. Please check with your SMS provider for pricing details.
                        </p>
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave(smsForm, 'sms')}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save SMS Settings'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Webhook Settings */}
        <TabsContent value="webhook" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Webhook className="h-5 w-5" />
                <span>Webhook Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure webhooks to send notifications to external services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...webhookForm}>
                <form className="space-y-6">
                  <FormField
                    control={webhookForm.control}
                    name="webhookEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Webhook Notifications</FormLabel>
                          <FormDescription>
                            Send notifications to external services via webhooks
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

                  {webhookForm.watch('webhookEnabled') && (
                    <>
                      <FormField
                        control={webhookForm.control}
                        name="webhookUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Webhook URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://api.example.com/webhook" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              URL to send webhook payloads to
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={webhookForm.control}
                        name="secret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Secret Key</FormLabel>
                            <FormControl>
                              <Input 
                                type="password"
                                placeholder="Enter secret for signing webhooks" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Optional secret for webhook signature verification
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={webhookForm.control}
                          name="retryAttempts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Retry Attempts</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="0"
                                  max="5"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Number of retry attempts for failed webhooks
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={webhookForm.control}
                          name="timeout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Timeout (seconds)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="1"
                                  max="30"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Request timeout in seconds
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-gray-800">
                          <Settings className="h-4 w-4" />
                          <span className="font-medium">Webhook Payload</span>
                        </div>
                        <pre className="text-sm text-gray-700 mt-2 bg-white p-3 rounded border overflow-x-auto">
{`{
  "event": "notification.sent",
  "timestamp": "2024-03-20T10:30:00Z",
  "data": {
    "type": "system_alert",
    "title": "Notification Title",
    "message": "Notification message content",
    "priority": "high"
  }
}`}</pre>
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSave(webhookForm, 'webhook')}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Webhook Settings'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose which events trigger notifications for each channel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(notificationPreferences).map(([event, channels]) => (
              <div key={event} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium capitalize">
                    {event.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Trigger when this event occurs in the system
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {Object.entries(channels).map(([channel, enabled]) => (
                    <div key={channel} className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        getChannelColor(channel)
                      }`}>
                        {getChannelIcon(channel)}
                      </div>
                      <Switch 
                        checked={enabled}
                        onCheckedChange={(checked) => {
                          // In real app, this would update the preference
                          console.log(`Updated ${event} ${channel} to ${checked}`)
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </CardFooter>
      </Card>

      {/* Test Notification Dialog */}
      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Notification</DialogTitle>
            <DialogDescription>
              Send a test notification to verify your {testChannel} settings are working correctly.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Test notification sent successfully!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Check your {testChannel} to confirm you received the test message.
              If you don't see it, verify your configuration settings.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsTestDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NotificationsSettings