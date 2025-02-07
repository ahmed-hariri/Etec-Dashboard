import AdminHero from "@/components/admin-hero";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Admin() {
    return <>
        <AdminHero />
    </>
}