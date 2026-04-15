import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable, schema } from "@/components/data-table";
import React from "react";
import { useSales, useSalesStats } from "@/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { z } from "zod";

export default function Sales() {
    const { sales, loading, error, refetch } = useSales();
    const { stats, loading: statsLoading } = useSalesStats();

    // Transform sales data to match DataTable schema
    const tableData: z.infer<typeof schema>[] = React.useMemo(() => {
        return sales.map((sale, index) => ({
            id: index + 1,
            header: sale.saleNumber,
            type: sale.paymentMethod.replace('_', ' '),
            status: sale.status,
            target: new Intl.NumberFormat('en-US', { style: 'currency', currency: sale.currency }).format(sale.amount),
            limit: sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : '-',
            reviewer: sale.description || 'N/A'
        }));
    }, [sales]);

    if (loading) {
        return (
            <div className="p-4 space-y-8">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <p className="text-lg text-muted-foreground">Failed to load sales data</p>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-8">
            <ChartAreaInteractive />
            <DataTable data={tableData} />
        </div>
    );
}