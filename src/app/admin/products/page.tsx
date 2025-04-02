import ProductsComponents from "@/components/products/manager";
import { Metadata } from "next";

/*---> Added metadata for SEO and better page information <---*/
export const metadata: Metadata = {
    title: "Products",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Products() {
    return <>
        <ProductsComponents />
    </>
}