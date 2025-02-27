import OrdersComponents from "@/components/admin/orders";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Orders",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Orders() {
    return <>
        <OrdersComponents />
    </>
}