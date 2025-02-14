"use client"

import { useState } from "react";
import TableAdmin from "../table";
import Title from "../title";
import { productsTypes } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"


export default function ProductsComponents() {
    const [products] = useState<productsTypes[]>([
        { _id: '0', name: "phone", description: "nice phone!", price: 100, picture: "http...", categoryId: { _id: '123444', categoryName: "mobile" } }
    ])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Products" paragraphe="Welcome back, here’s an overview of your products." />
                <TableAdmin
                    tableHead={['Product ID', 'Name', 'Description', 'Price', 'Picture', 'Category' , 'Action']}
                    contents={products}
                    type="products"
                />
            </div>
        </section>
    </>
}