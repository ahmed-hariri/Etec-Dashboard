"use client"

import { useState } from "react";
import Title from "../title";
import { Input } from "@/components/chadcn/ui/input"
import { Label } from "@/components/chadcn/ui/label"
import { Button } from "@/components/chadcn/ui/button"
import { toast, Toaster } from "sonner";
import { categorieTypes } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"

export default function CategoriesComponents() {
    /*---> States <---*/
    const [categorie, setCategorie] = useState<string>('');
    const [categories] = useState<categorieTypes>({ data: [{ _id: '0', categoryName: "mobile" }] });
    const tableHead: string[] = ['Categorie ID', 'Name', 'Action'];

    /*---> Functions <---*/
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCategorie(e?.target?.value);
    }
    const handelValues = (): void => {
        /*---> Verification <---*/
        const validationCategoryName: boolean = categorie?.trim() !== "";
        if (!validationCategoryName) {
            toast?.warning("Please fill in all the fields.");
            return
        }
    }
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Categories" paragraphe="Welcome back, here’s an overview of your categories." />
                <div className="w-full flex flex-col lg:flex-row items-center gap-3">
                    {/* <!-- Inputs --> */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-2">
                        <Label htmlFor="categorie" className="text-[16px]">Categorie</Label>
                        <Input type="text" id="categorie" placeholder="categorie" className="py-4" onChange={handelChange} />
                    </div>
                    {/* <!-- Button --> */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:mt-9">
                        <Button className="py-[19px] text-[15px]" onClick={handelValues}>
                            Create Product
                        </Button>
                    </div>
                </div>
                {/* <!-- Table Products --> */}
                <Table className="rounded-lg overflow-hidden">
                    <TableHeader className="bg-gray-100">
                        <TableRow className="border-b border-gray-300">
                            {tableHead && tableHead?.map((head, index) => (
                                <TableHead key={index} className="text-center">{head}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories?.data?.map((categorie) => (
                            <TableRow key={categorie?._id} className="text-center">
                                <TableCell className="font-medium">{categorie?._id}</TableCell>
                                <TableCell>{categorie?.categoryName}</TableCell>
                                <TableCell className="flex justify-center gap-3">
                                    {['Modify', 'Remove']?.map((item, index) => (
                                        <Button key={index} className="px-[12px] py-[6px]">
                                            {item}
                                        </Button>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
    </>
}