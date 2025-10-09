import { TrendingUp, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";




export default function ClientsStateCard({clients} : {
    clients : {
        title : string
        icon?: LucideIcon
        percentage: number
    }
} ){
    return (
        <Card className="gap-2 py-2">
            <CardHeader className="flex justify-between items-center">
                <h6 className="capitalize text-gray-700 dark:text-gray-500">{clients.title}</h6>
                {clients?.icon && <clients.icon className="text-gray-700 dark:text-gray-500" size={18} />}
            </CardHeader>
            <CardContent className="py-0 flex justify-between items-center">
                <h1 className="text-3xl font-bold">{clients.percentage}</h1>
                <p className="flex items-center gap-1 text-xs"><TrendingUp size={14} className="text-green-600" /><span className="text-green-600">+12% </span>VS last Period</p>
            </CardContent>
        </Card>
    )
}