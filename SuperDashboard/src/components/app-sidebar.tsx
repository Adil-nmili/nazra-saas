"use client"

import * as React from "react"
import {
  AudioWaveform,
  BadgeInfo,
  Blocks,
  BookOpen,
  Bot,
  ChartLine,
  Command,
  DollarSign,
  FolderCog,
  Frame,
  GalleryVerticalEnd,
  HandFist,
  HeartPulse,
  Kanban,
  LayoutDashboard,
  Map,
  MonitorCog,
  PartyPopper,
  PieChart,
  Rss,
  Send,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { COMPANYINFORMATION, COMPTES, CUSTOMERSSEGMENTATIONS, DASHBOARDCLIENTS, EMAILTEMPLATES, FACTUREPAGE, GENERALSETTING, HISTORY, KPIS, NOTIFICATIONSETTINGS, PAYMENTPROCESSING, PRICINGPERTEIRS, QUICKACTIONS, REVENUECHART, SUBSCRIPTIONS, SYSTEMEHEALTH, USERMANAGEMENT } from "@/constant/routeConstants"


// This is sample data.
const data = {
  user: {
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],


  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "User growth analytics",
          url: '/dashboard',
        },
        
       
        {
          title: "Key metrics and KPIs",
          url: KPIS
        },
        {
          title: "Revenue charts",
          url: REVENUECHART
        },
        {
          title: "System health status",
          url: SYSTEMEHEALTH
        },
        {
          title: "Quick actions panel",
          url: QUICKACTIONS
        },
      ]
    },
    {
      title: "User & Customers",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "Customers list",
          url: DASHBOARDCLIENTS
        },
         {
          title: "Customers profiles",
          url: COMPTES
        },
         {
          title: "User management",
          url: USERMANAGEMENT
        },
         {
          title: "Customers segmentation",
          url: CUSTOMERSSEGMENTATIONS
        },
         {
          title: "Activity logs per user",
          url: "#"
        },
        {
          title: "History",
          url: HISTORY,
        },
      ],
    },
    {
      title: "Plan & Subscriptions",
      url: "#",
      icon: Kanban,
      items: [
        {
          title: "Subscription plan management",
          url: SUBSCRIPTIONS,
        },
        {
          title: "Pricing tiers",
          url: PRICINGPERTEIRS,
        },
        {
          title: "Feature management per plan",
          url: "#",
        },
        {
          title: "Plan analytics",
          url: "#",
        },
        {
          title: "Upgrade/downgrade paths",
          url: "#",
        },
      ],
    },
    {
      title: "Billing & Payments",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "Payment processing",
          url: PAYMENTPROCESSING
        },
        {
          title: "Invoice management",
          url: FACTUREPAGE,
        },
        {
          title: "Revenue analytics",
          url: "#",
        },
        {
          title: "Failed payment handling",
          url: "#",
        },
        {
          title: "Tax configuration",
          url: "#",
        },
        {
          title: "Refund management",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics & Reports",
      url: "#",
      icon: ChartLine,
      items: [
        {
          title: "Business intelligence dashboard",
          url: "#",
        },
        {
          title: "Custom reports",
          url: "#",
        },
        {
          title: "Export functionality",
          url: "#",
        },
        {
          title: "Real-time analytics",
          url: "#",
        },
      ],
    },
    {
      title: "System & Operations",
      url: "#",
      icon: MonitorCog,
      items: [
        {
          title: "General settings",
          url: GENERALSETTING,
        },
        {
          title: "Company information",
          url: COMPANYINFORMATION,
        },
        {
          title: "Brand customization",
          url: "#",
        },
        {
          title: "Email templates",
          url: EMAILTEMPLATES ,
        },
        {
          title: "Notification settings",
          url: NOTIFICATIONSETTINGS,
        },
      ],
    },
    {
      title: "Security & Access",
      url: "#",
      icon: BadgeInfo,
      items: [
        {
          title: "User roles & permissions",
          url: "#",
        },
        {
          title: "API key management",
          url: "#",
        },
        {
          title: "Audit logs",
          url: "#",
        },
        {
          title: "Security settings",
          url: "#",
        },
        {
          title: "Two-factor authentication",
          url: "#",
        },
      ],
    },
    {
      title: "Integrations",
      url: "#",
      icon: Blocks,
      items: [
        {
          title: "Third-party app connections",
          url: "#",
        },
        {
          title: "API documentation",
          url: "#",
        },
        {
          title: "Webhook management",
          url: "#",
        },
        {
          title: "Make.com integrations",
          url: "#",
        },
      ],
    },
    {
      title: "System Health",
      url: "#",
      icon: HeartPulse,
      items: [
        {
          title: "Server status monitoring",
          url: "#",
        },
        {
          title: "Performance metrics",
          url: "#",
        },
        {
          title: "Error logs",
          url: "#",
        },
        {
          title: "Uptime monitoring",
          url: "#",
        },
        {
          title: "Database health",
          url: "#",
        },
      ],
    },
    {
      title: "Content Management",
      url: "#",
      icon: Rss,
      items: [
        {
          title: "Blog/articles management",
          url: "#",
        },
        {
          title: "Documentation",
          url: "#",
        },
        {
          title: "Knowledge base",
          url: "#",
        },
        {
          title: "FAQ management",
          url: "#",
        },
      ],
    },
    {
      title: "Email & Communications",
      url: "#",
      icon: Send,
      items: [
        {
          title: "Email campaigns",
          url: "#",
        },
        {
          title: "Newsletter management",
          url: "#",
        },
        {
          title: "Automated sequences",
          url: "#",
        },
        {
          title: "Template builder",
          url: "#",
        },
        {
          title: "Delivery analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Support & Help Desk",
      url: "#",
      icon: HandFist,
      items: [
        {
          title: "Facture management",
          url: FACTUREPAGE,
        },
        {
          title: "Customer support inbox",
          url: "#",
        },
        {
          title: "Support agent performance",
          url: "#",
        },
        {
          title: "Resolution analytics",
          url: "#",
        },
      ],
    },
    {
      title: "File & Media Management",
      url: "#",
      icon: FolderCog,
      items: [
        {
          title: "File uploads management",
          url: "#",
        },
        {
          title: "Media library",
          url: "#",
        },
        {
          title: "Storage analytics",
          url: "#",
        },
        {
          title: "File access controls",
          url: "#",
        },
        {
          title: "Database health",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    

    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent style={{ scrollbarWidth: "none" }}>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
