"use client"

import { useState } from "react";
import Title from "../title";
import { categorieTypes, productsTypes } from "@/types";
import { Input } from "@/components/chadcn/ui/input"
import { Label } from "@/components/chadcn/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/chadcn/ui/select"
import { Textarea } from "@/components/chadcn/ui/textarea"
import { toast, Toaster } from "sonner";
import { inputs } from "@/data";
import { Button } from "@/components/chadcn/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"
import TableMessage from "../table/message";


export default function ProductsComponents() {
    /*---> States <---*/
    const products: productsTypes = {
        data: [
            { _id: '0', name: "phone", description: "nice phone!", price: 100, picture: "http...", categoryId: { _id: '123444', categoryName: "mobile" } }
        ]
    }
    const [product, setProduct] = useState<{ name: string, description: string, price: number, picture: string, categoryId: { categoryName: string } }>({
        name: '', description: '', price: 0, picture: '', categoryId: { categoryName: '' }
    });
    const categories: categorieTypes[] = [
        { _id: '0', categoryName: 'mobile' },
        { _id: '1', categoryName: 'pc' }
    ];
    const tableHead: string[] = ['Product ID', 'Name', 'Description', 'Price', 'Picture', 'Category', 'Action']

    /*---> Functions <---*/
    const handelChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e?.target;
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
    const handelValues = () => {
        /*---> Verification <---*/
        const validationName: boolean = product?.name?.trim() !== "";
        const validationDescription: boolean = product?.description?.trim() !== "";
        const validationPrice: boolean = product?.price !== 0;
        const validationCategory: boolean = product?.categoryId?.categoryName !== '';
        if (!validationName || !validationDescription || !validationPrice || !validationCategory) {
            toast?.warning("Please fill in all the fields.");
            return
        }
    }

    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Products" paragraphe="Welcome back, here’s an overview of your products." />
                <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col lg:flex-row gap-3">
                        {/* <!-- Inputs --> */}
                        {inputs && inputs?.slice(0, 3)?.map((item, index) => (
                            <div key={index} className="w-full lg:w-1/3 flex flex-col gap-2">
                                <Label htmlFor={item?.inputName} className="text-[16px]">{item?.inputLabel}</Label>
                                <Input type={item?.type} id={item?.inputName} placeholder={item?.placeHolder} name={item?.inputName} onChange={handelChanges} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3">
                        {/* <!-- Inputs --> */}
                        {inputs && inputs?.slice(3, 6)?.map((item, index) => (
                            <div key={index} className="w-full lg:w-1/2 flex flex-col gap-2">
                                <Label htmlFor={item?.inputName} className="text-[16px]">{item?.inputLabel}</Label>
                                {item?.inputName !== 'description' && <Input type={item?.type} id={item?.inputName} placeholder={item?.placeHolder} name={item?.inputName} onChange={handelChanges} />}
                                {item?.inputName === 'description' && <Textarea placeholder="Type your description here." rows={4} className="resize-none" name="description" onChange={handelChanges} />}
                            </div>
                        ))}
                        <div className="w-full lg:w-1/2 flex flex-col justify-between gap-3 lg:gap-0">
                            {/* <!-- Options --> */}
                            <div className="w-full flex flex-col gap-2">
                                <Label htmlFor="categorys" className="text-[16px]">Category</Label>
                                <Select disabled={!categories || categories?.length === 0} name="categorys" onValueChange={(value) => setProduct((prevState) => ({ ...prevState, categoryId: { ...prevState.categoryId, categoryName: value } }))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={categories?.length ? "Select a Category" : "No Categories Available"} />
                                    </SelectTrigger>
                                    <SelectContent aria-disabled>
                                        <SelectGroup>
                                            {categories?.map((category, index) => (
                                                <SelectItem key={index} value={`${category?._id}`}>
                                                    {category?.categoryName}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* <!-- Button --> */}
                            <div className="w-full flex flex-col gap-2">
                                <Button className="py-[24px] text-[15px]" onClick={handelValues}>
                                    Create Product
                                </Button>
                            </div>
                        </div>
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
                        {products && products?.data?.length > 0 ? (
                            products?.data?.map((content) => (
                                <TableRow key={content?._id} className="text-center">
                                    <TableCell className="font-medium">{content?._id}</TableCell>
                                    <TableCell>{content?.name}</TableCell>
                                    <TableCell>{content?.description}</TableCell>
                                    <TableCell>${content?.price}.00</TableCell>
                                    <TableCell>{content?.picture}</TableCell>
                                    <TableCell>{content?.categoryId?.categoryName}</TableCell>
                                    <TableCell className="flex justify-center items-center gap-3">
                                        {['Modify', 'Remove']?.map((item, index) => (
                                            <Button key={index} className="px-[12px] py-[6px]">
                                                {item}
                                            </Button>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableMessage colSpan={8} content="You dont have products!" />
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
    </>
}