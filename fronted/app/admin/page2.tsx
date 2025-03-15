import type { Metadata } from "next";

import React from "react";
import MonthlyTarget from "@/components/admin/dashboard/MonthlyTarget";
import MonthlySalesChart from "@/components/admin/dashboard/MonthlySalesChart";
import StatisticsChart from "@/components/admin/dashboard/StatisticsChart";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import DemographicCard from "@/components/admin/dashboard/DemographicCard";
import EcommerceMetrics from "@/components/admin/dashboard/EcommerceMetrics";

export const metadata: Metadata = {
    title:
        "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
    return (
        <>
            <div><h1>Welcome Admin</h1></div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <EcommerceMetrics />
                    {/* <EcommerceMetrics /> */}

                    {/* <MonthlySalesChart /> */}
                </div>

                <div className="col-span-12 xl:col-span-5 h-25">
                    <MonthlyTarget />
                    {/* <MonthlySalesChart /> */}
                </div>

                <div className="col-span-12">
                    <StatisticsChart />
                </div>

                <div className="col-span-12 xl:col-span-6">
                    {/* <DemographicCard /> */}
                    <RecentOrders />
                </div>

                <div className="col-span-12 xl:col-span-6">
                    <RecentOrders />
                </div>
            </div>
        </>
    );
}
