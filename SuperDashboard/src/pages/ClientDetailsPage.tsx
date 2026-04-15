"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useClient, useClientMutations } from "@/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    ArrowLeft,
    Building2,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit,
    Trash2,
    User,
    Tag,
    FileText,
    AlertCircle,
} from "lucide-react";
import { DASHBOARDCLIENTS } from "@/constant/routeConstants";

const statusVariants: Record<string, { bg: string; text: string }> = {
    active: { bg: "bg-green-500/20", text: "text-green-600" },
    inactive: { bg: "bg-gray-500/20", text: "text-gray-600" },
    pending: { bg: "bg-yellow-500/20", text: "text-yellow-600" },
};

const segmentVariants: Record<string, { bg: string; text: string }> = {
    enterprise: { bg: "bg-purple-500/20", text: "text-purple-600" },
    startup: { bg: "bg-blue-500/20", text: "text-blue-600" },
    business: { bg: "bg-orange-500/20", text: "text-orange-600" },
    individual: { bg: "bg-teal-500/20", text: "text-teal-600" },
};

export function ClientDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { client, loading, error } = useClient(id || "");
    const { deleteClient, loading: deleteLoading } = useClientMutations();

    const handleDelete = async () => {
        if (!id) return;
        try {
            await deleteClient(id);
            navigate(DASHBOARDCLIENTS);
        } catch (err) {
            console.error("Failed to delete client:", err);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto py-6 space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        );
    }

    // Error state
    if (error || !client) {
        return (
            <div className="container mx-auto py-6">
                <Card>
                    <CardContent className="flex flex-col items-center justify-center h-[400px] space-y-4">
                        <AlertCircle className="h-16 w-16 text-red-500" />
                        <h2 className="text-xl font-semibold">Client Not Found</h2>
                        <p className="text-muted-foreground">{error || "The client you are looking for does not exist."}</p>
                        <Button onClick={() => navigate(DASHBOARDCLIENTS)}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Clients
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const statusStyle = statusVariants[client.status] || statusVariants.active;
    const segmentStyle = segmentVariants[client.segment] || segmentVariants.business;

    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(DASHBOARDCLIENTS)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg bg-primary/10 text-primary">
                            {getInitials(client.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold">{client.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge className={`${segmentStyle.bg} ${segmentStyle.text}`}>{client.segment}</Badge>
                            <Badge className={`${statusStyle.bg} ${statusStyle.text}`}>{client.status}</Badge>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Client</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete {client.name}? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} disabled={deleteLoading}>
                                    {deleteLoading ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <Separator />

            {/* Content Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Contact Information
                        </CardTitle>
                        <CardDescription>Primary contact details for this client</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <Mail className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{client.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <Phone className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{client.phone || "Not provided"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Building2 className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Company</p>
                                <p className="font-medium">{client.company || "Not provided"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Address Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Address
                        </CardTitle>
                        <CardDescription>Client's business or billing address</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {client.address && (client.address.street || client.address.city) ? (
                            <div className="space-y-2">
                                {client.address.street && (
                                    <p className="font-medium">{client.address.street}</p>
                                )}
                                <p className="text-muted-foreground">
                                    {[client.address.city, client.address.state, client.address.zipCode]
                                        .filter(Boolean)
                                        .join(", ")}
                                </p>
                                {client.address.country && (
                                    <p className="text-muted-foreground">{client.address.country}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No address provided</p>
                        )}
                    </CardContent>
                </Card>

                {/* Client Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Tag className="h-5 w-5" />
                            Client Details
                        </CardTitle>
                        <CardDescription>Segment and status information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Segment</span>
                            <Badge className={`${segmentStyle.bg} ${segmentStyle.text}`}>
                                {client.segment}
                            </Badge>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Status</span>
                            <Badge className={`${statusStyle.bg} ${statusStyle.text}`}>
                                {client.status}
                            </Badge>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Created</span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                {new Date(client.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Notes
                        </CardTitle>
                        <CardDescription>Additional notes about this client</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className={client.notes ? "" : "text-muted-foreground"}>
                            {client.notes || "No notes added yet."}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ClientDetailsPage;
