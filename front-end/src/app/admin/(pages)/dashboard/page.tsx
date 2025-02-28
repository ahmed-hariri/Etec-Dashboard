import DashboardComponents from "@/components/admin/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Dashboard() {
    return <>
        <DashboardComponents />
    </>
}