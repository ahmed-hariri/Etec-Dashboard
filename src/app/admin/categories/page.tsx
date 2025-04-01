import CategoriesComponents from "@/components/categories/manager";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Categories",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Categories() {
    return <>
        <CategoriesComponents />
    </>
}