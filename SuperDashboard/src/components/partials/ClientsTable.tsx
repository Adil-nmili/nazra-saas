import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useClients } from "@/hooks";
import { AlertCircle, MoreHorizontal, Users } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Client } from "@/api/types";

const statusVariants: Record<string, string> = {
  active: "bg-green-500/20 text-green-600",
  inactive: "bg-gray-500/20 text-gray-600",
  pending: "bg-yellow-500/20 text-yellow-600",
};

const segmentVariants: Record<string, string> = {
  enterprise: "bg-purple-500/20 text-purple-600",
  startup: "bg-blue-500/20 text-blue-600",
  business: "bg-orange-500/20 text-orange-600",
  individual: "bg-teal-500/20 text-teal-600",
};

export function ClientsTable() {
  const { clients, loading, error, refetch } = useClients();

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] space-y-4 border rounded-md">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-muted-foreground">Failed to load clients</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  // Empty state
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] space-y-4 border rounded-md">
        <Users className="h-12 w-12 text-slate-300" />
        <p className="text-lg text-muted-foreground">No clients found</p>
        <p className="text-sm text-muted-foreground">Add your first client to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client: Client) => (
            <TableRow key={client._id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.company || '-'}</TableCell>
              <TableCell>
                <Badge variant="outline" className={segmentVariants[client.segment]}>
                  {client.segment}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusVariants[client.status]}>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(client.email)}>
                      Copy email
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/dashboard/customers/${client._id}`}>View details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit client</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
