import DashboardComponents from "@/components/dashboard";
import { Metadata } from "next";

/*---> Added metadata for SEO and better page information <---*/
export const metadata: Metadata = {
    title: "Dashboard",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Dashboard() {
    return <>
        <DashboardComponents />
    </>
}