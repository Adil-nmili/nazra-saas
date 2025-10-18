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
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Plus, 
  Search, 
  Users, 
  Mail, 
  Settings, 
  Download, 
  Upload,
  Bell,
  Shield,
  Database,
  Zap,
  MessageCircle,
  CreditCard,
  BarChart3,
  FileText,
  UserPlus,
  Send,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  MoreHorizontal
} from 'lucide-react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data for quick actions
const quickActions = [
  {
    id: 1,
    title: 'Add New User',
    description: 'Create a new user account',
    icon: UserPlus,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    category: 'users',
    shortcut: 'Ctrl + U',
    action: 'addUser'
  },
  {
    id: 2,
    title: 'Send Bulk Email',
    description: 'Send email to multiple users',
    icon: Send,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    category: 'communication',
    shortcut: 'Ctrl + E',
    action: 'sendEmail'
  },
  {
    id: 3,
    title: 'Generate Report',
    description: 'Create analytics report',
    icon: BarChart3,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    category: 'analytics',
    shortcut: 'Ctrl + R',
    action: 'generateReport'
  },
  {
    id: 4,
    title: 'Backup Database',
    description: 'Create system backup',
    icon: Database,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    category: 'system',
    shortcut: 'Ctrl + B',
    action: 'backupDatabase'
  },
  {
    id: 5,
    title: 'System Settings',
    description: 'Update platform settings',
    icon: Settings,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    category: 'system',
    shortcut: 'Ctrl + ,',
    action: 'openSettings'
  },
  {
    id: 6,
    title: 'Send Notification',
    description: 'Push notification to users',
    icon: Bell,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    category: 'communication',
    shortcut: 'Ctrl + N',
    action: 'sendNotification'
  },
  {
    id: 7,
    title: 'Security Scan',
    description: 'Run security audit',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    category: 'security',
    shortcut: 'Ctrl + S',
    action: 'securityScan'
  },
  {
    id: 8,
    title: 'Import Data',
    description: 'Bulk import user data',
    icon: Upload,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    category: 'data',
    shortcut: 'Ctrl + I',
    action: 'importData'
  }
]

const recentActions = [
  {
    id: 1,
    action: 'User Created',
    description: 'Created user john.doe@example.com',
    timestamp: '2 minutes ago',
    status: 'completed',
    user: 'You'
  },
  {
    id: 2,
    action: 'Report Generated',
    description: 'Monthly revenue report',
    timestamp: '15 minutes ago',
    status: 'completed',
    user: 'Sarah Wilson'
  },
  {
    id: 3,
    action: 'Email Campaign',
    description: 'Sent to 2,543 users',
    timestamp: '1 hour ago',
    status: 'completed',
    user: 'You'
  },
  {
    id: 4,
    action: 'Database Backup',
    description: 'Full system backup',
    timestamp: '3 hours ago',
    status: 'completed',
    user: 'System'
  },
  {
    id: 5,
    action: 'Security Scan',
    description: 'Routine security audit',
    timestamp: '5 hours ago',
    status: 'completed',
    user: 'Automated'
  }
]

const pendingTasks = [
  {
    id: 1,
    title: 'Review pending users',
    description: '5 users awaiting approval',
    priority: 'high',
    dueDate: 'Today',
    category: 'users'
  },
  {
    id: 2,
    title: 'Update billing plans',
    description: 'New pricing tiers',
    priority: 'medium',
    dueDate: 'Tomorrow',
    category: 'billing'
  },
  {
    id: 3,
    title: 'API documentation',
    description: 'Update endpoint docs',
    priority: 'low',
    dueDate: 'In 3 days',
    category: 'development'
  }
]

const systemStatus = {
  tasksRunning: 3,
  pendingApprovals: 5,
  unreadNotifications: 12,
  systemAlerts: 1
}

const QuickActionsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isSendEmailOpen, setIsSendEmailOpen] = useState(false)
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false)

  const categories = [
    { value: 'all', label: 'All Actions' },
    { value: 'users', label: 'User Management' },
    { value: 'communication', label: 'Communication' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'system', label: 'System' },
    { value: 'security', label: 'Security' },
    { value: 'data', label: 'Data Management' }
  ]

  const filteredActions = quickActions.filter(action => {
    const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || action.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case 'addUser':
        setIsAddUserOpen(true)
        break
      case 'sendEmail':
        setIsSendEmailOpen(true)
        break
      case 'generateReport':
        setIsGenerateReportOpen(true)
        break
      case 'backupDatabase':
        // Simulate backup process
        console.log('Starting database backup...')
        break
      case 'openSettings':
        // Navigate to settings
        console.log('Opening settings...')
        break
      case 'sendNotification':
        console.log('Sending notification...')
        break
      case 'securityScan':
        console.log('Starting security scan...')
        break
      case 'importData':
        console.log('Opening data import...')
        break
      default:
        console.log('Action not implemented:', actionType)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const QuickActionCard = ({ action }: { action: typeof quickActions[0] }) => {
    const IconComponent = action.icon

    return (
      <Card 
        className="cursor-pointer transition-all hover:shadow-md hover:scale-105 group"
        onClick={() => handleQuickAction(action.action)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${action.bgColor}`}>
                <IconComponent className={`h-5 w-5 ${action.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-blue-600">
                  {action.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs font-normal">
              {action.shortcut}
            </Badge>
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
          <h1 className="text-3xl font-bold tracking-tight">Quick Actions</h1>
          <p className="text-muted-foreground">
            Fast access to frequently used tasks and operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Action
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Tasks</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStatus.tasksRunning}</div>
            <p className="text-xs text-muted-foreground">
              Active background tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStatus.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Users waiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStatus.unreadNotifications}</div>
            <p className="text-xs text-muted-foreground">
              Unread messages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{systemStatus.systemAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions Grid */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Frequently used tasks and operations
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search actions..."
                      className="pl-8 w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredActions.map(action => (
                  <QuickActionCard key={action.id} action={action} />
                ))}
              </div>
              {filteredActions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No actions found matching your search</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
              <CardDescription>
                Recently completed tasks and operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.map(action => (
                  <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(action.status)}
                      <div>
                        <p className="font-medium text-sm">{action.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{action.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {action.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Pending Tasks & Quick Tools */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>
                Tasks requiring your attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map(task => (
                  <div key={task.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Due: {task.dueDate}</span>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tools</CardTitle>
              <CardDescription>
                Essential system utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Audit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Controls */}
          <Card>
            <CardHeader>
              <CardTitle>System Controls</CardTitle>
              <CardDescription>
                Platform management tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </Button>
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Restart
                </Button>
                <Button variant="outline" size="sm">
                  <Zap className="h-4 w-4 mr-1" />
                  Optimize
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account in the system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input placeholder="john.doe@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddUserOpen(false)}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={isSendEmailOpen} onOpenChange={setIsSendEmailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Bulk Email</DialogTitle>
            <DialogDescription>
              Send an email to multiple users at once.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Enter email subject" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Recipients</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active Users</SelectItem>
                  <SelectItem value="inactive">Inactive Users</SelectItem>
                  <SelectItem value="premium">Premium Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea 
                className="w-full min-h-[120px] border rounded-md p-2 text-sm"
                placeholder="Enter your message here..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendEmailOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsSendEmailOpen(false)}>
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog open={isGenerateReportOpen} onOpenChange={setIsGenerateReportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>
              Create a custom analytics report.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="users">User Analytics</SelectItem>
                  <SelectItem value="system">System Performance</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateReportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsGenerateReportOpen(false)}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default QuickActionsPanel