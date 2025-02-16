import ProductsComponents from "@/components/admin/products";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Products() {
    return <>
        <ProductsComponents />
    </>
}