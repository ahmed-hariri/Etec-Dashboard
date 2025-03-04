"use client"

import { useEffect, useState } from "react";
import Title from "../title";
import { Input } from "@/components/chadcn/ui/input"
import { Label } from "@/components/chadcn/ui/label"
import { Button } from "@/components/chadcn/ui/button"
import { toast, Toaster } from "sonner";
import { categorieTypes } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"
import { createNewCategorie, fetchAllCategories, removeCategorie, updateCategorie } from "@/api/category";
import TableMessage from "../table/message";

export default function CategoriesComponents() {
    /*---> States <---*/
    const [categorie, setCategorie] = useState<string>('');
    const [categories, setCategories] = useState<categorieTypes>({ data: [] });
    const tableHead: string[] = ['Categorie ID', 'Name', 'Action'];
    const [loading, setLoading] = useState<boolean>(true);
    const [popUp, setPopUp] = useState<{ modify: boolean, remove: boolean, categorieId: string | null }>({ modify: false, remove: false, categorieId: "" })

    /*---> Functions <---*/
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCategorie(e?.target?.value);
    }
    const handelValues = async (): Promise<void> => {
        /*---> Verification <---*/
        const validationCategoryName: boolean = categorie?.trim() !== "";
        if (!validationCategoryName) {
            toast?.warning("Please fill in all the fields.");
            return
        }
        await addNewCategorie({ categoryName: categorie })
    }
    const getAllCategories = async (): Promise<void> => {
        try {
            const response = await fetchAllCategories();
            setCategories(response ?? []);
        } catch (error) {
            console?.error("Error get all categories : ", error)
        }
    }
    const addNewCategorie = async (newCategorie: { categoryName: string }): Promise<void> => {
        try {
            const response = await createNewCategorie(newCategorie);
            if (response?.message === "Category has been created!") {
                toast?.success(response?.message)
                await getAllCategories();
                setCategorie('')
            }
        } catch (error) {
            console?.error("Error create categorie : ", error)
        }
    }
    const handelCategorie = (id: string | null): void => {
        const findCategorie = categories?.data?.find((product) => product?._id === id);
        if (findCategorie) {
            setPopUp((prevState) => ({ ...prevState, modify: true, categorieId: id ?? null }))
            setCategorie(findCategorie?.categoryName)
        }
    }
    const modifyCategorie = async (categorieId: string | null): Promise<void> => {
        try {
            const response = await updateCategorie(categorieId, { categoryName: categorie });
            if (response?.message === "Category Update!") {
                toast?.success(response?.message)
                setPopUp({ modify: false, remove: false, categorieId: '' });
                await getAllCategories();
            }
        } catch (error) {
            console?.error("Error delete categorie : ", error)
        }
    }
    const deleteCategorie = async (categorieName: string | null): Promise<void> => {
        try {
            const response = await removeCategorie(categorieName);
            if (response?.message === "Category deleted successfully!") {
                toast?.success(response?.message)
                setPopUp({ modify: false, remove: false, categorieId: '' });
                await getAllCategories();
            }
        } catch (error) {
            console?.error("Error delete categorie : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        Promise?.allSettled([getAllCategories()])
            .finally(() => setLoading(false))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])

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
                {loading ? (
                    <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
                ) : (
                    <Table className="rounded-lg overflow-hidden">
                        <TableHeader className="bg-gray-100">
                            <TableRow className="border-b border-gray-300">
                                {tableHead && tableHead?.map((head, index) => (
                                    <TableHead key={index} className="text-center">{head}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories && categories?.data?.length > 0 ? (
                                categories?.data?.map((categorie) => (
                                    <TableRow key={categorie?._id} className="text-center">
                                        <TableCell className="font-medium">{categorie?._id}</TableCell>
                                        <TableCell className="font-bold text-[16.3px]">{categorie?.categoryName}</TableCell>
                                        <TableCell className="flex justify-center gap-3">
                                            {['Modify', 'Remove']?.map((item, index) => (
                                                <Button key={index} className="px-[12px] py-[6px]" onClick={() => {
                                                    if (item === 'Modify') {
                                                        handelCategorie(categorie?._id ?? null)
                                                    } else {
                                                        setPopUp((prevState) => ({ ...prevState, remove: true, categorieId: categorie?._id ?? null }))
                                                    }
                                                }}>
                                                    {item}
                                                </Button>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableMessage colSpan={8} content="You dont have categories!" />
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {popUp?.remove && (
            <div className="w-full h-screen backdrop-blur-sm absolute flex justify-center items-center">
                <div className="p-4 rounded-lg bg-black flex flex-col gap-5 text-white shadow-lg">
                    <h1 className="text-lg font-[600]">You want remove this categorie!</h1>
                    <div className="ml-40 flex gap-3">
                        {[
                            { name: 'Remove', style: 'text-[17px] bg-red-500 text-white' },
                            { name: 'Cancel', style: 'text-[17px] bg-white text-black hover:text-white' }
                        ]?.map((item, index) => (
                            <Button key={index} className={`${item?.style}`} onClick={() => {
                                if (item?.name === 'Cancel') {
                                    setPopUp((prevState) => ({ ...prevState, remove: false, productId: null }))
                                } else {
                                    deleteCategorie(popUp?.categorieId ?? null)
                                }
                            }}>
                                {item?.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {popUp?.modify && (
            <div className="w-full h-screen backdrop-blur-sm absolute flex justify-center items-center px-5 lg:px-0 z-50">
                <div className="w-full lg:max-w-[700px]">
                    <div className="w-full p-5 rounded-lg bg-black flex flex-col gap-5 text-white shadow-lg">
                        <h1 className="text-lg font-[600]">You want update this categorie!</h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col lg:flex-row gap-3">
                                {/* <!-- Inputs --> */}
                                <div className="w-full lg:w-1/2 flex flex-col gap-2">
                                    <Label htmlFor="categorie" className="text-[16px]">Categorie</Label>
                                    <Input type="text" id="categorie" placeholder="categorie" className="py-4" onChange={handelChange} value={categorie} />
                                </div>
                            </div>
                            {/* <!-- Button --> */}
                            <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
                                {['Modify', 'Cancel']?.map((item, index) => (
                                    <Button key={index} className={`w-full lg:w-1/2 py-[24px] text-[18px] bg-white ${item === "Modify" ? "bg-green-600" : "text-black"} hover:text-white`} onClick={() => {
                                        if (item === 'Cancel') {
                                            setPopUp((prevState) => ({ ...prevState, modify: false, productId: null }))
                                        } else {
                                            modifyCategorie(popUp?.categorieId ?? null)
                                        }
                                    }}>
                                        {item}
                                    </Button>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
}