'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    FileText,
    CalendarIcon,
    TrendingUp,
    DollarSign,
    Clock,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInvoices, useInvoiceStats, useInvoiceMutations } from '@/hooks';
import type { Invoice, Client } from '@/api/types';

const statusVariants: Record<string, string> = {
    paid: 'bg-green-500/20 text-green-600 border-green-200',
    pending: 'bg-yellow-500/20 text-yellow-600 border-yellow-200',
    sent: 'bg-blue-500/20 text-blue-600 border-blue-200',
    overdue: 'bg-red-500/20 text-red-600 border-red-200',
    draft: 'bg-gray-500/20 text-gray-600 border-gray-200',
    cancelled: 'bg-slate-500/20 text-slate-600 border-slate-200'
};

const statusLabels: Record<string, string> = {
    paid: 'Payée',
    pending: 'En attente',
    sent: 'Envoyée',
    overdue: 'En retard',
    draft: 'Brouillon',
    cancelled: 'Annulée'
};

export function InvoicePage() {
    const [filters, setFilters] = useState({
        status: '',
        dateRange: { from: null as Date | null, to: null as Date | null },
        client: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    // Fetch invoices and stats from API - don't pass filters here to avoid infinite loop
    const { invoices, loading, error, refetch, pagination } = useInvoices();
    const { stats, loading: statsLoading } = useInvoiceStats();
    const { deleteInvoice, markAsPaid, loading: mutationLoading } = useInvoiceMutations();

    // Filter invoices client-side by search term and status
    const filteredInvoices = useMemo(() => {
        let result = invoices;

        // Filter by search term
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            result = result.filter(invoice => {
                const clientName = typeof invoice.client === 'object' ? (invoice.client as Client).name : '';
                return invoice.invoiceNumber.toLowerCase().includes(search) ||
                    clientName.toLowerCase().includes(search);
            });
        }

        // Filter by status
        if (filters.status && filters.status !== 'all') {
            result = result.filter(invoice => invoice.status === filters.status);
        }

        // Filter by date range
        if (filters.dateRange.from) {
            result = result.filter(invoice => new Date(invoice.issueDate) >= filters.dateRange.from!);
        }
        if (filters.dateRange.to) {
            result = result.filter(invoice => new Date(invoice.issueDate) <= filters.dateRange.to!);
        }

        return result;
    }, [invoices, searchTerm, filters]);

    // Handle delete invoice
    const handleDelete = async (id: string) => {
        try {
            await deleteInvoice(id);
            setDeleteConfirmId(null);
            refetch();
        } catch (err) {
            console.error('Failed to delete invoice:', err);
        }
    };

    // Handle mark as paid
    const handleMarkAsPaid = async (id: string) => {
        try {
            await markAsPaid(id);
            refetch();
        } catch (err) {
            console.error('Failed to mark invoice as paid:', err);
        }
    };

    // Handle view invoice
    const handleView = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsViewDialogOpen(true);
    };

    // Loading state
    if (loading && invoices.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <Skeleton className="h-9 w-64 mb-2" />
                            <Skeleton className="h-5 w-48" />
                        </div>
                        <Skeleton className="h-10 w-40" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
                                <CardContent><Skeleton className="h-8 w-24" /></CardContent>
                            </Card>
                        ))}
                    </div>
                    <Card>
                        <CardContent className="p-6">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full mb-2" />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <p className="text-lg text-muted-foreground">Échec du chargement des factures</p>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button onClick={() => refetch()}>Réessayer</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Gestion des Factures</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-2">
                            Gérez vos factures et suivez vos revenus
                        </p>
                    </div>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Nouvelle Facture
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Créer une nouvelle facture</DialogTitle>
                            </DialogHeader>
                            <div className="p-4">
                                <p className="text-slate-600">Fonctionnalité de création à venir</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader>
                            <p className="text-xl font-medium text-slate-600 dark:text-slate-400">Revenu Total</p>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            {statsLoading ? (
                                <Skeleton className="h-8 w-24" />
                            ) : (
                                <p className="text-2xl font-bold">
                                    {(stats?.revenue || 0).toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })}
                                </p>
                            )}
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <p className="text-xl font-medium text-slate-600 dark:text-slate-400">Factures en Attente</p>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            {statsLoading ? (
                                <Skeleton className="h-8 w-16" />
                            ) : (
                                <p className="text-2xl font-bold">{stats?.pending || 0}</p>
                            )}
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <p className="text-xl font-medium text-slate-600 dark:text-slate-400">Montant en Attente</p>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            {statsLoading ? (
                                <Skeleton className="h-8 w-24" />
                            ) : (
                                <p className="text-2xl font-bold">
                                    {(stats?.pendingAmount || 0).toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })}
                                </p>
                            )}
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <p className="text-xl font-medium text-slate-600 dark:text-slate-400">Factures Payées</p>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            {statsLoading ? (
                                <Skeleton className="h-8 w-16" />
                            ) : (
                                <p className="text-2xl font-bold">{stats?.paid || 0}</p>
                            )}
                            <CheckCircle className="w-6 h-6 text-purple-600" />
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card>
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
                                        <SelectItem value="sent">Envoyée</SelectItem>
                                        <SelectItem value="overdue">En retard</SelectItem>
                                        <SelectItem value="draft">Brouillon</SelectItem>
                                        <SelectItem value="cancelled">Annulée</SelectItem>
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
                <Card>
                    <CardHeader>
                        <CardTitle>Factures Récentes</CardTitle>
                        <CardDescription>
                            {filteredInvoices.length} facture(s) trouvée(s) sur {pagination.total}
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
                                {filteredInvoices.map((invoice) => {
                                    const client = typeof invoice.client === 'object' ? invoice.client as Client : null;
                                    return (
                                        <TableRow key={invoice._id} className="hover:bg-slate-50/50">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-blue-600" />
                                                    {invoice.invoiceNumber}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-slate-100">{client?.name || 'N/A'}</p>
                                                    <p className="text-sm text-slate-500">{client?.email || ''}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>{format(new Date(invoice.issueDate), 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>{format(new Date(invoice.dueDate), 'dd/MM/yyyy')}</TableCell>
                                            <TableCell className="font-semibold">
                                                {invoice.total.toLocaleString('fr-FR', { style: 'currency', currency: invoice.currency })}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "capitalize border-2",
                                                        statusVariants[invoice.status] || statusVariants.draft
                                                    )}
                                                >
                                                    {statusLabels[invoice.status] || invoice.status}
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
                                                        <DropdownMenuItem
                                                            className="flex items-center gap-2"
                                                            onClick={() => handleView(invoice)}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                            Voir
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center gap-2">
                                                            <Edit className="w-4 h-4" />
                                                            Modifier
                                                        </DropdownMenuItem>
                                                        {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                                                            <DropdownMenuItem
                                                                className="flex items-center gap-2 text-green-600"
                                                                onClick={() => handleMarkAsPaid(invoice._id)}
                                                                disabled={mutationLoading}
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                                Marquer payée
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem
                                                            className="flex items-center gap-2 text-red-600"
                                                            onClick={() => setDeleteConfirmId(invoice._id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Supprimer
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
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

                {/* View Invoice Dialog */}
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Détails de la Facture {selectedInvoice?.invoiceNumber}</DialogTitle>
                        </DialogHeader>
                        {selectedInvoice && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-slate-500">Client</Label>
                                        <p className="font-medium">
                                            {typeof selectedInvoice.client === 'object'
                                                ? (selectedInvoice.client as Client).name
                                                : 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-slate-500">Statut</Label>
                                        <Badge className={cn("mt-1", statusVariants[selectedInvoice.status])}>
                                            {statusLabels[selectedInvoice.status]}
                                        </Badge>
                                    </div>
                                    <div>
                                        <Label className="text-slate-500">Date d'émission</Label>
                                        <p>{format(new Date(selectedInvoice.issueDate), 'dd/MM/yyyy')}</p>
                                    </div>
                                    <div>
                                        <Label className="text-slate-500">Date d'échéance</Label>
                                        <p>{format(new Date(selectedInvoice.dueDate), 'dd/MM/yyyy')}</p>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-slate-500">Articles</Label>
                                    <Table className="mt-2">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Description</TableHead>
                                                <TableHead className="text-right">Qté</TableHead>
                                                <TableHead className="text-right">Prix Unitaire</TableHead>
                                                <TableHead className="text-right">Montant</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedInvoice.items.map((item, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell>{item.description}</TableCell>
                                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                                    <TableCell className="text-right">${item.unitPrice}</TableCell>
                                                    <TableCell className="text-right">${item.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Sous-total</span>
                                        <span>${selectedInvoice.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Taxe ({selectedInvoice.taxRate}%)</span>
                                        <span>${selectedInvoice.tax}</span>
                                    </div>
                                    {selectedInvoice.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Remise</span>
                                            <span>-${selectedInvoice.discount}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                                        <span>Total</span>
                                        <span>${selectedInvoice.total}</span>
                                    </div>
                                </div>

                                {selectedInvoice.notes && (
                                    <div>
                                        <Label className="text-slate-500">Notes</Label>
                                        <p className="text-sm text-slate-600 mt-1">{selectedInvoice.notes}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirmer la suppression</DialogTitle>
                        </DialogHeader>
                        <p className="text-slate-600">
                            Êtes-vous sûr de vouloir supprimer cette facture ? Cette action est irréversible.
                        </p>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                                Annuler
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                                disabled={mutationLoading}
                            >
                                {mutationLoading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Suppression...</>
                                ) : (
                                    'Supprimer'
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}