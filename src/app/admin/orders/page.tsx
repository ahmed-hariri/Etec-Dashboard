import OrdersComponents from "@/components/orders";
import { Metadata } from "next";

/*---> Added metadata for SEO and better page information <---*/
export const metadata: Metadata = {
    title: "Orders",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Orders() {
    return <>
        <OrdersComponents />
    </>
}