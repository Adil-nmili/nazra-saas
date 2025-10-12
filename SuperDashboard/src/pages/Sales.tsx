import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import React from "react";
import data from "../app/dashboard/data.json"

export default function Sales() {
    const [fakeData, setFakeData] = React.useState(data);

    return (
        <div className="p-4 space-y-8">
        <ChartAreaInteractive />
        <DataTable data={fakeData} />
        </div>
    )
}