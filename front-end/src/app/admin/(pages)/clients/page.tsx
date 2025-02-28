import ClientsComponents from "@/components/admin/clients";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Clients",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Clients() {
    return <>
        <ClientsComponents />
    </>
}