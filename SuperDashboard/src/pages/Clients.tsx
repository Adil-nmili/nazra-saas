import ClientsStateCard from "@/components/partials/ClientsStatCard";
import { ClientsTable } from "@/components/partials/ClientsTable";
import { Activity, Cable, ClipboardClock, Users } from "lucide-react";

const clientsState = [
    {
        title: "totale clients",
        percentage: 247,
        icon: Users
    },
    {
        title: "active lead",
        percentage: 80,
        icon: Activity
    },
    {
        title: "converted clients",
        percentage: 70,
        icon: Cable
    },
    {
        title: "pending follow-ups",
        percentage: 18,
        icon: ClipboardClock
    }
]


export function Clients() {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-2">
                {
                    clientsState.map((item,index) => <ClientsStateCard  clients={item} key={index} />)
                }
            </div>
            <ClientsTable />
        </div>
    )
}