export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: Date;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  totalAmount: number;
  taxAmount: number;
  subtotal: number;
  items: InvoiceItem[];
  notes?: string;
  opticianId: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'frames' | 'lenses' | 'contact_lenses' | 'accessories' | 'services';
}

export interface InvoiceFilters {
  status: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  client: string;
}