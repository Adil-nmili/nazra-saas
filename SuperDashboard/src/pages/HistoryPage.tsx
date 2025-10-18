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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { 
  Timeline, 
  TimelineItem, 
  TimelineConnector, 
  TimelineHeader, 
  TimelineIcon, 
  TimelineBody 
} from '@/components/ui/timeline'
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  User,
  CreditCard,
  Settings,
  Shield,
  Mail,
  Bell,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Calendar,
  BarChart3,
  Users,
  Database,
  Cloud,
  MessageSquare,
  FileText
} from 'lucide-react'

type Activity = {
  id: string
  type: 'user' | 'billing' | 'system' | 'security' | 'notification' | 'integration'
  action: string
  description: string
  user: {
    name: string
    email: string
    avatar?: string
  }
  timestamp: Date
  severity: 'low' | 'medium' | 'high' | 'critical'
  ipAddress?: string
  metadata?: Record<string, any>
}

type TimelineEvent = {
  id: string
  title: string
  description: string
  timestamp: Date
  type: 'milestone' | 'update' | 'incident' | 'release'
  icon: React.ReactNode
  color: string
}

// Mock data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'user',
    action: 'user_login',
    description: 'User logged in successfully',
    user: { name: 'John Doe', email: 'john@example.com' },
    timestamp: new Date('2024-03-20T14:30:00'),
    severity: 'low',
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    type: 'billing',
    action: 'subscription_upgraded',
    description: 'Upgraded from Starter to Professional plan',
    user: { name: 'Sarah Wilson', email: 'sarah@example.com' },
    timestamp: new Date('2024-03-20T13:15:00'),
    severity: 'medium',
    metadata: { from_plan: 'Starter', to_plan: 'Professional', amount: 79 }
  },
  {
    id: '3',
    type: 'system',
    action: 'maintenance_completed',
    description: 'Scheduled maintenance completed successfully',
    user: { name: 'System', email: 'system@saas.com' },
    timestamp: new Date('2024-03-20T12:00:00'),
    severity: 'medium'
  },
  {
    id: '4',
    type: 'security',
    action: 'password_changed',
    description: 'User password changed',
    user: { name: 'Mike Johnson', email: 'mike@example.com' },
    timestamp: new Date('2024-03-20T11:45:00'),
    severity: 'medium',
    ipAddress: '192.168.1.150'
  },
  {
    id: '5',
    type: 'notification',
    action: 'email_sent',
    description: 'Monthly newsletter sent to all users',
    user: { name: 'System', email: 'system@saas.com' },
    timestamp: new Date('2024-03-20T10:30:00'),
    severity: 'low',
    metadata: { recipients: 2543, subject: 'March Updates & Features' }
  },
  {
    id: '6',
    type: 'integration',
    action: 'api_call_failed',
    description: 'Stripe API connection timeout',
    user: { name: 'System', email: 'system@saas.com' },
    timestamp: new Date('2024-03-20T09:15:00'),
    severity: 'high'
  },
  {
    id: '7',
    type: 'user',
    action: 'account_created',
    description: 'New user signed up',
    user: { name: 'Emma Davis', email: 'emma@example.com' },
    timestamp: new Date('2024-03-20T08:45:00'),
    severity: 'low'
  },
  {
    id: '8',
    type: 'billing',
    action: 'payment_failed',
    description: 'Credit card payment failed',
    user: { name: 'Alex Brown', email: 'alex@example.com' },
    timestamp: new Date('2024-03-20T08:00:00'),
    severity: 'high',
    metadata: { plan: 'Professional', amount: 79, reason: 'Insufficient funds' }
  }
]

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'v2.5.0 Released',
    description: 'Added advanced analytics dashboard and real-time reporting features',
    timestamp: new Date('2024-03-15'),
    type: 'release',
    icon: <Zap className="h-4 w-4" />,
    color: 'text-yellow-500'
  },
  {
    id: '2',
    title: 'System Maintenance',
    description: 'Completed database optimization and performance improvements',
    timestamp: new Date('2024-03-10'),
    type: 'maintenance',
    icon: <Settings className="h-4 w-4" />,
    color: 'text-blue-500'
  },
  {
    id: '3',
    title: '1,000 Users Milestone',
    description: 'Reached 1,000 active users on our platform',
    timestamp: new Date('2024-03-05'),
    type: 'milestone',
    icon: <Users className="h-4 w-4" />,
    color: 'text-green-500'
  },
  {
    id: '4',
    title: 'API Rate Limiting',
    description: 'Implemented new rate limiting rules for API endpoints',
    timestamp: new Date('2024-02-28'),
    type: 'update',
    icon: <Cloud className="h-4 w-4" />,
    color: 'text-purple-500'
  },
  {
    id: '5',
    title: 'Security Audit',
    description: 'Completed quarterly security audit with zero critical issues found',
    timestamp: new Date('2024-02-20'),
    type: 'milestone',
    icon: <Shield className="h-4 w-4" />,
    color: 'text-green-500'
  }
]

const HistoryPage = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterSeverity, setFilterSeverity] = useState<string>('all')
  const [dateRange, setDateRange] = useState<string>('7d')

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4" />
      case 'billing':
        return <CreditCard className="h-4 w-4" />
      case 'system':
        return <Settings className="h-4 w-4" />
      case 'security':
        return <Shield className="h-4 w-4" />
      case 'notification':
        return <Bell className="h-4 w-4" />
      case 'integration':
        return <Zap className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getSeverityIcon = (severity: Activity['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityVariant = (severity: Activity['severity']) => {
    switch (severity) {
      case 'critical':
        return 'destructive'
      case 'high':
        return 'default'
      case 'medium':
        return 'secondary'
      case 'low':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getTypeColor = (type: Activity['type']) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'billing':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'system':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'security':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'notification':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'integration':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days}d ago`
    
    return timestamp.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || activity.type === filterType
    const matchesSeverity = filterSeverity === 'all' || activity.severity === filterSeverity
    
    return matchesSearch && matchesType && matchesSeverity
  })

  const exportData = () => {
    // In a real app, this would generate a CSV or PDF
    console.log('Exporting activity data...')
  }

  const refreshData = () => {
    // In a real app, this would refetch from API
    console.log('Refreshing data...')
  }

  const getStats = () => {
    const totalActivities = activities.length
    const criticalActivities = activities.filter(a => a.severity === 'critical').length
    const todayActivities = activities.filter(a => {
      const today = new Date()
      return a.timestamp.toDateString() === today.toDateString()
    }).length

    return { totalActivities, criticalActivities, todayActivities }
  }

  const stats = getStats()

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity History</h1>
          <p className="text-muted-foreground">
            Monitor all activities and events across your platform
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActivities}</div>
            <p className="text-xs text-muted-foreground">
              All-time recorded activities
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayActivities}</div>
            <p className="text-xs text-muted-foreground">
              Activities in last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.criticalActivities}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="timeline">Platform Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search activities..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="notification">Notification</SelectItem>
                    <SelectItem value="integration">Integration</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Activity List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                {filteredActivities.length} activities found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`p-2 rounded-full ${getTypeColor(activity.type).split(' ')[0]}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-sm">{activity.description}</p>
                        {getSeverityIcon(activity.severity)}
                        <Badge variant={getSeverityVariant(activity.severity)} className="text-xs">
                          {activity.severity}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getTypeColor(activity.type)}`}>
                          {activity.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {activity.user.name}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimestamp(activity.timestamp)}
                        </span>
                        {activity.ipAddress && (
                          <span>IP: {activity.ipAddress}</span>
                        )}
                      </div>
                      {activity.metadata && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          {Object.entries(activity.metadata).map(([key, value]) => (
                            <span key={key} className="mr-3">
                              {key}: {String(value)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {filteredActivities.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No activities found matching your filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Platform Timeline</CardTitle>
              <CardDescription>
                Important milestones and events in your platform's history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                {timelineEvents.map((event, index) => (
                  <TimelineItem key={event.id}>
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className={event.color}>
                        {event.icon}
                      </TimelineIcon>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-sm font-semibold">{event.title}</h4>
                        <Badge variant="outline" className="mt-1 sm:mt-0">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.timestamp.toLocaleDateString()}
                        </Badge>
                      </div>
                    </TimelineHeader>
                    <TimelineBody>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </TimelineBody>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HistoryPage