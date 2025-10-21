'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit,
    Download,
    Trash2,
    FileText,
    CalendarIcon,
    TrendingUp,
    DollarSign,
    Users,
    Clock
} from 'lucide-react';
import { Invoice, InvoiceFilters } from '@/types/invoice';
import { cn } from '@/lib/utils';

// Mock data - replace with actual API calls
const mockInvoices: Invoice[] = [
    {
        id: '1',
        invoiceNumber: 'OPT-2024-001',
        clientName: 'Marie Lambert',
        clientEmail: 'marie.lambert@email.com',
        clientAddress: '123 Vision Street, Paris 75001',
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        status: 'paid',
        totalAmount: 450.00,
        taxAmount: 75.00,
        subtotal: 375.00,
        items: [
            {
                id: '1',
                description: 'Designer Frames - Ray-Ban',
                quantity: 1,
                unitPrice: 150.00,
                total: 150.00,
                category: 'frames'
            },
            {
                id: '2',
                description: 'Progressive Lenses - Anti-reflective',
                quantity: 1,
                unitPrice: 225.00,
                total: 225.00,
                category: 'lenses'
            }
        ],
        opticianId: 'opt1'
    },
    {
        id: '2',
        invoiceNumber: 'OPT-2024-002',
        clientName: 'Jean Dubois',
        clientEmail: 'jean.dubois@email.com',
        clientAddress: '456 Optics Avenue, Lyon 69000',
        issueDate: new Date('2024-01-18'),
        dueDate: new Date('2024-02-18'),
        status: 'pending',
        totalAmount: 320.00,
        taxAmount: 53.33,
        subtotal: 266.67,
        items: [
            {
                id: '1',
                description: 'Contact Lenses - Monthly',
                quantity: 6,
                unitPrice: 40.00,
                total: 240.00,
                category: 'contact_lenses'
            },
            {
                id: '2',
                description: 'Lens Solution',
                quantity: 2,
                unitPrice: 13.33,
                total: 26.67,
                category: 'accessories'
            }
        ],
        opticianId: 'opt1'
    }
];

const statusVariants = {
    paid: 'bg-green-500/20 text-green-600 border-green-200',
    pending: 'bg-yellow-500/20 text-yellow-600 border-yellow-200',
    overdue: 'bg-red-500/20 text-red-600 border-red-200',
    draft: 'bg-gray-500/20 text-gray-600 border-gray-200'
};

export function InvoicePage() {
    const [invoices] = useState<Invoice[]>(mockInvoices);
    const [filters, setFilters] = useState<InvoiceFilters>({
        status: '',
        dateRange: { from: null, to: null },
        client: ''
    });
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInvoices = invoices.filter(invoice => {
        const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !filters.status || invoice.status === filters.status;
        const matchesDate = (!filters.dateRange.from || invoice.issueDate >= filters.dateRange.from) &&
            (!filters.dateRange.to || invoice.issueDate <= filters.dateRange.to);

        return matchesSearch && matchesStatus && matchesDate;
    });

    const stats = {
        totalRevenue: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
        pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
        averageInvoice: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0) / invoices.length,
        paidInvoices: invoices.filter(inv => inv.status === 'paid').length
    };

    return (
        <div className="min-h-screen bg-gradient-to-br  p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Gestion des Factures</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                            Gérez vos factures et suivez vos revenus
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="">
                                <Plus className="w-4 h-4 mr-2" />
                                Nouvelle Facture
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Créer une nouvelle facture</DialogTitle>
                            </DialogHeader>
                            <div className="p-4">
                                <p className="text-slate-600">Formulaire de création de facture à implémenter</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="">
                        <CardHeader>
                            <p className="text-xl font-medium text-slate-600 dark:text-slate-400">Revenu Total</p>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">

                            <p className="text-2xl font-bold ">
                                {stats.totalRevenue.toFixed(2)}€
                            </p>
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </CardContent>
                    </Card>

                    <Card className="">
                    <CardHeader>

                                    <p className="text-xl font-medium text-slate-600 dark:text-slate-400">Factures en Attente</p>
                    </CardHeader>
                        <CardContent className="flex items-center justify-between">
                                    <p className="text-2xl font-bold  ">
                                        {stats.pendingInvoices}
                                    </p>
                                    <Clock className="w-6 h-6 text-yellow-600" />
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader>

                                    <p className="text-xl font-medium text-slate-600 dark:text-slate-400">Moyenne par Facture</p>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                                    <p className="text-2xl font-bold">
                                        {stats.averageInvoice.toFixed(2)}€
                                    </p>
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                        </CardContent>
                    </Card>

                    <Card className="">
                        <CardHeader>

                                    <p className="text-xl font-medium text-slate-600 dark:text-slate-400">Factures Payées</p>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                                    <p className="text-2xl font-bold ">
                                        {stats.paidInvoices}
                                    </p>
                                    <Users className="w-6 h-6 text-purple-600" />
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="">
                    <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4 items-end">
                            <div className="flex-1 w-full">
                                <label className="text-sm font-medium text-slate-700 mb-2 block">
                                    Recherche
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                        placeholder="Rechercher par client ou numéro de facture..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-white/50"
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-48">
                                <label className="text-sm font-medium text-slate-700 mb-2 block">
                                    Statut
                                </label>
                                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                                    <SelectTrigger className="bg-white/50">
                                        <SelectValue placeholder="Tous les statuts" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="paid">Payée</SelectItem>
                                        <SelectItem value="pending">En attente</SelectItem>
                                        <SelectItem value="overdue">En retard</SelectItem>
                                        <SelectItem value="draft">Brouillon</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full lg:w-64">
                                <label className="text-sm font-medium text-slate-700 mb-2 block">
                                    Période
                                </label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal bg-white/50",
                                                !filters.dateRange.from && "text-slate-500"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {filters.dateRange.from ? (
                                                filters.dateRange.to ? (
                                                    <>
                                                        {format(filters.dateRange.from, "dd/MM/yy")} -{" "}
                                                        {format(filters.dateRange.to, "dd/MM/yy")}
                                                    </>
                                                ) : (
                                                    format(filters.dateRange.from, "dd/MM/yy")
                                                )
                                            ) : (
                                                <span>Sélectionner une période</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={filters.dateRange.from || new Date()}
                                            selected={{
                                                from: filters.dateRange.from || undefined,
                                                to: filters.dateRange.to || undefined,
                                            }}
                                            onSelect={(range) => setFilters({
                                                ...filters,
                                                dateRange: { from: range?.from || null, to: range?.to || null }
                                            })}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Invoices Table */}
                <Card className="">
                    <CardHeader>
                        <CardTitle>Factures Récentes</CardTitle>
                        <CardDescription>
                            {filteredInvoices.length} facture(s) trouvée(s)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Numéro</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Date d'émission</TableHead>
                                    <TableHead>Échéance</TableHead>
                                    <TableHead>Montant</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInvoices.map((invoice) => (
                                    <TableRow key={invoice.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                                {invoice.invoiceNumber}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium text-slate-900">{invoice.clientName}</p>
                                                <p className="text-sm text-slate-500">{invoice.clientEmail}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{format(invoice.issueDate, 'dd/MM/yyyy')}</TableCell>
                                        <TableCell>{format(invoice.dueDate, 'dd/MM/yyyy')}</TableCell>
                                        <TableCell className="font-semibold">
                                            {invoice.totalAmount.toFixed(2)}€
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "capitalize border-2",
                                                    statusVariants[invoice.status]
                                                )}
                                            >
                                                {invoice.status === 'paid' && 'Payée'}
                                                {invoice.status === 'pending' && 'En attente'}
                                                {invoice.status === 'overdue' && 'En retard'}
                                                {invoice.status === 'draft' && 'Brouillon'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="flex items-center gap-2">
                                                        <Eye className="w-4 h-4" />
                                                        Voir
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-2">
                                                        <Edit className="w-4 h-4" />
                                                        Modifier
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-2">
                                                        <Download className="w-4 h-4" />
                                                        Télécharger
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                                        <Trash2 className="w-4 h-4" />
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {filteredInvoices.length === 0 && (
                            <div className="text-center py-12">
                                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500 text-lg">Aucune facture trouvée</p>
                                <p className="text-slate-400 mt-2">
                                    Ajustez vos filtres ou créez une nouvelle facture
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}