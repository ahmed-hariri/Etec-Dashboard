"use client"

import { useState } from "react";
import TableAdmin from "../table";
import Title from "../title";
import { Input } from "@/components/chadcn/ui/input"
import { Label } from "@/components/chadcn/ui/label"
import { Button } from "@/components/chadcn/ui/button"
import { toast, Toaster } from "sonner";
import { categorieTypes } from "@/types";

export default function CategoriesComponents() {
    /*---> States <---*/
    const [categories] = useState<categorieTypes[]>([{ _id: '0', categoryName: "mobile" }]);
    const [categorie, setCategorie] = useState<string>('');

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
                <div className="w-full flex items-center gap-3">
                    {/* <!-- Inputs --> */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-2">
                        <Label htmlFor="categorie" className="text-[16px]">Categorie</Label>
                        <Input type="text" id="categorie" placeholder="categorie" className="py-4" onChange={handelChange} />
                    </div>
                    {/* <!-- Button --> */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-2 mt-9">
                        <Button className="py-[19px] text-[15px]" onClick={handelValues}>
                            Create Product
                        </Button>
                    </div>
                </div>
                {/* <!-- Table Products --> */}
                <TableAdmin
                    tableHead={['Categorie ID', 'Name', 'Action']}
                    contents={categories}
                    type="categorie"
                />
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
    </>
}