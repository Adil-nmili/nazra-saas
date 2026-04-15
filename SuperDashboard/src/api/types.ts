// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: T[];
}

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

// Client types
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: Address;
  segment: 'enterprise' | 'business' | 'startup' | 'individual';
  status: 'active' | 'inactive' | 'pending';
  notes?: string;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface ClientStats {
  total: number;
  active: number;
  segments: { _id: string; count: number }[];
}

// Compte types
export interface Compte {
  _id: string;
  accountNumber: string;
  name: string;
  type: 'checking' | 'savings' | 'business' | 'investment';
  balance: number;
  currency: string;
  client: Client | string;
  status: 'active' | 'inactive' | 'frozen' | 'closed';
  openedDate: string;
  lastTransaction?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompteStats {
  total: number;
  totalBalance: number;
  byType: { _id: string; count: number; totalBalance: number }[];
}

// Invoice types
export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  client: Client | string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  total: number;
  currency: string;
  status: 'draft' | 'pending' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  notes?: string;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceStats {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
  revenue: number;
  pendingAmount: number;
}

// Sale types
export interface Sale {
  _id: string;
  saleNumber: string;
  client: Client | string;
  invoice?: Invoice | string;
  amount: number;
  currency: string;
  paymentMethod: 'cash' | 'credit_card' | 'bank_transfer' | 'check' | 'other';
  status: 'pending' | 'completed' | 'refunded' | 'cancelled';
  description?: string;
  saleDate: string;
  processedBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface SalesStats {
  total: number;
  completed: number;
  revenue: number;
  monthlySales: { _id: number; total: number; count: number }[];
  byPaymentMethod: { _id: string; total: number; count: number }[];
}

// Company types
export interface Company {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  logo?: string;
  address?: Address;
  taxId?: string;
  registrationNumber?: string;
  currency: string;
  timezone: string;
  fiscalYearStart: number;
  createdAt: string;
  updatedAt: string;
}

// Plan types
export interface Plan {
  _id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  maxUsers: number;
  maxStorage: number;
  isActive: boolean;
  tier: 'free' | 'basic' | 'professional' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

// Subscription types
export interface Subscription {
  _id: string;
  user: User | string;
  plan: Plan | string;
  status: 'active' | 'cancelled' | 'expired' | 'pending' | 'trial';
  startDate: string;
  endDate?: string;
  trialEndDate?: string;
  autoRenew: boolean;
  paymentMethod?: string;
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionStats {
  total: number;
  active: number;
  cancelled: number;
  byPlan: { _id: string; count: number; planName: string; planPrice: number }[];
}

// Dashboard types
export interface DashboardStats {
  clients: {
    total: number;
    active: number;
  };
  invoices: {
    total: number;
    pending: number;
  };
  subscriptions: {
    active: number;
  };
  revenue: {
    total: number;
    pending: number;
    monthly: { _id: number; total: number }[];
  };
  recent: {
    invoices: Invoice[];
    sales: Sale[];
  };
}

export interface RevenueChartData {
  _id: number;
  revenue: number;
  count: number;
}
