import CategoriesComponents from "@/components/categories/manager";
import { Metadata } from "next";

/*---> Added metadata for SEO and better page information <---*/
export const metadata: Metadata = {
    title: "Categories",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Categories() {
    return <>
        <CategoriesComponents />
    </>
}