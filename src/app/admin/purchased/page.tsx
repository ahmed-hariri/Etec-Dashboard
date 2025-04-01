import PurchasedComponents from "@/components/purchased/manager";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Purchased",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Purchased() {
    return <>
        <PurchasedComponents />
    </>
}