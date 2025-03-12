"use client"

import { useEffect, useState } from "react";
import Title from "../../shared/title";
import { categorieTypes, productsTypes } from "@/types";
import { Input } from "@/components/shared/chadcn/ui/input"
import { Label } from "@/components/shared/chadcn/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/shared/chadcn/ui/select"
import { Textarea } from "@/components/shared/chadcn/ui/textarea"
import { toast, Toaster } from "sonner";
import { inputs } from "@/data";
import { Button } from "@/components/shared/chadcn/ui/button"
import { createNewProduct, fetchAllProducts, removeProduct, updateProduct } from "@/api/product";
import { fetchAllCategories } from "@/api/category";
import Image from "next/image";

export default function ProductsComponents() {
    /*---> States <---*/
    const [products, setProducts] = useState<productsTypes>({ data: [] })
    const [product, setProduct] = useState<{ name: string, description: string, price: number, picture: string, categoryId: string, [key: string]: string | number; }>(
        { name: '', description: '', price: 0, picture: '', categoryId: '' }
    );
    const [categories, setCategories] = useState<categorieTypes>({ data: [] });
    const [loading, setLoading] = useState<{ newProduct: boolean, showProducts: boolean }>({ newProduct: false, showProducts: true })
    const [popUp, setPopUp] = useState<{ modify: boolean, remove: boolean, productId: string | null }>({ modify: false, remove: false, productId: "" })

    /*---> Functions <---*/
    const handelChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e?.target;
        const updateValue = name === 'price' ? parseFloat(value) : value
        setProduct((prevState) => ({ ...prevState, [name]: updateValue }));
    }
    const handelValues = async () => {
        /*---> Verification <---*/
        const validationName: boolean = product?.name?.trim() !== "";
        const validationDescription: boolean = product?.description?.trim() !== "";
        const validationPrice: boolean = product?.price !== 0;
        const validationCategory: boolean = product?.categoryId?.trim() !== '';
        if (!validationName || !validationDescription || !validationPrice || !validationCategory) {
            toast?.warning("Please fill in all the fields.");
            return
        }
        await addProduct()
    }
    const getAllProducts = async (): Promise<void> => {
        try {
            const response = await fetchAllProducts();
            setProducts(response ?? []);
        } catch (error) {
            console?.error("Error gel all products : ", error)
        }
    }
    const addProduct = async (): Promise<void> => {
        setLoading((prevState) => ({ ...prevState, newProduct: true }))
        try {
            const response = await createNewProduct(product)
            if (response?.message === 'Product has been created!') {
                toast?.success(response?.message);
                await getAllProducts();
                setProduct({ name: '', price: 0, picture: '', description: '', categoryId: '' })
            }
        } catch (error) {
            console?.error("Error create newProduct : ", error)
        } finally {
            setLoading((prevState) => ({ ...prevState, newProduct: false }))
        }
    }
    const handelProduct = (id: string | null): void => {
        const findProduct = products?.data?.find((product) => product?._id === id);
        if (findProduct) {
            setPopUp((prevState) => ({ ...prevState, modify: true, productId: id ?? null }))
            setProduct({
                name: findProduct?.name, price: findProduct?.price, picture: findProduct?.picture,
                description: findProduct?.description, categoryId: findProduct?.categoryId?._id ?? ''
            })
        }
    }
    const modifyProduct = async (id: string | null): Promise<void> => {
        try {
            const response = await updateProduct(id, product);
            if (response?.message === 'Product Update!') {
                toast?.success(response?.message);
                setPopUp({ modify: false, remove: false, productId: '' });
                await getAllProducts();
            }
        } catch (error) {
            console?.error("Error remove product : ", error)
        }
    }
    const deleteProduct = async (id: string | null): Promise<void> => {
        try {
            const response = await removeProduct(id);
            if (response?.message === 'Product deleted successfully!') {
                toast?.success(response?.message);
                setPopUp({ modify: false, remove: false, productId: '' });
                await getAllProducts();
            }
        } catch (error) {
            console?.error("Error remove product : ", error)
        }
    }
    const getAllCategories = async (): Promise<void> => {
        try {
            const response = await fetchAllCategories();
            setCategories(response ?? []);
        } catch (error) {
            console?.error("Error gel all products : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        Promise?.allSettled([getAllProducts(), getAllCategories()])
            .finally(() => setLoading((prevState) => ({ ...prevState, showProducts: false })))
            .catch((error) => console.error("Error fetching data:", error));
    }, [])
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
                                <Select disabled={loading?.showProducts || categories?.data?.length === 0} name="categorys" onValueChange={(value) => setProduct((prevState) => ({ ...prevState, categoryId: value }))}>
                                    <SelectTrigger className="w-full">
                                        {loading?.showProducts ? (
                                            <SelectValue placeholder="Loading Categories..." />
                                        ) : (
                                            <SelectValue placeholder={categories?.data?.length ? "Select a Category" : "No Categories Available"} />
                                        )}
                                    </SelectTrigger>
                                    <SelectContent aria-disabled>
                                        <SelectGroup>
                                            {categories?.data?.map((category, index) => (
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
                                <Button className="py-[24px] text-[15px]" onClick={handelValues} disabled={loading?.newProduct}>
                                    {loading?.newProduct ? (
                                        <div className="w-5 h-5 border-l rounded-full duration-700 animate-spin"></div>
                                    ) : (
                                        <h1>Create Product</h1>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Table Products --> */}
                {loading?.showProducts ? (
                    <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
                ) : (
                    <div className="w-full flex flex-wrap justify-between sm:gap-5 lg:gap-4">
                        {products && products?.data?.length > 0 ? (
                            products?.data?.map((product) => (
                                <div key={product?._id} className="w-full sm:w-[48.5%] md:max-w-[550px] lg:w-full lg:h-[280px] xl:w-[49%] flex flex-col lg:flex-row bg-white rounded-lg shadow-lg">
                                    <div className="w-full lg:w-[45%] h-96 lg:h-full">
                                        <Image src={`${product?.picture}`} alt="product-picture" className="w-full h-full" />
                                    </div>
                                    <div className="w-full lg:w-[55%] h-full p-4 flex flex-col gap-3">
                                        <div className="w-full flex justify-between items-center">
                                            <h1 className="px-3 py-[3px] border border-black rounded-full text-sm">{product?.categoryId?.categoryName ?? "not found"}</h1>
                                            <div className="flex items-center gap-2">
                                                {['Modify', 'Remove']?.map((item, index) => (
                                                    <Button key={index} className="h-auto px-[10px] py-[5px] text-[13px]" onClick={() => {
                                                        if (item === 'Modify') {
                                                            handelProduct(product?._id ?? null)
                                                        } else {
                                                            setPopUp((prevState) => ({ ...prevState, remove: true, productId: product?._id ?? null }))
                                                        }
                                                    }}>
                                                        {item}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between items-center mt-3">
                                            <h1 className="text-lg font-bold">{product?.name}</h1>
                                            <h1>{product?.price} $</h1>
                                        </div>
                                        <div className="w-full overflow-scroll" style={{ scrollbarWidth: "none" }}>
                                            <p className="text-[13.8px]">{product?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-20 text-[25px] font-bold">
                                <h1>You dont have any products</h1>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
        <div className='w-full py-5flex justify-center bottom-0 fixed'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {popUp?.remove && (
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center">
                <div className="p-4 rounded-lg bg-black flex flex-col gap-5 text-white shadow-lg">
                    <h1 className="text-lg font-[600]">You want remove this products!</h1>
                    <div className="ml-40 flex gap-3">
                        {[
                            { name: 'Remove', style: 'text-[17px] bg-red-500 text-white' },
                            { name: 'Cancel', style: 'text-[17px] bg-white text-black hover:text-white' }
                        ]?.map((item, index) => (
                            <Button key={index} className={`${item?.style}`} onClick={() => {
                                if (item?.name === 'Cancel') {
                                    setPopUp((prevState) => ({ ...prevState, remove: false, productId: null }))
                                } else {
                                    deleteProduct(popUp?.productId ?? null)
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
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center px-5 lg:px-0 z-50">
                <div className="w-full lg:max-w-[700px]">
                    <div className="w-full p-5 rounded-lg bg-black flex flex-col gap-5 text-white shadow-lg">
                        <h1 className="text-lg font-[600]">You want update this products!</h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col lg:flex-row gap-3">
                                {/* <!-- Inputs --> */}
                                {inputs && inputs?.slice(0, 3)?.map((item, index) => (
                                    <div key={index} className="w-full lg:w-1/3 flex flex-col gap-2">
                                        <Label htmlFor={item?.inputName} className="text-[16px]">{item?.inputLabel}</Label>
                                        <Input type={item?.type} id={item?.inputName} placeholder={item?.placeHolder} name={item?.inputName} onChange={handelChanges} value={product?.[item?.inputName]} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col lg:flex-row gap-3">
                                {/* <!-- Inputs --> */}
                                {inputs && inputs?.slice(3, 6)?.map((item, index) => (
                                    <div key={index} className="w-full lg:w-1/2 flex flex-col gap-2">
                                        <Label htmlFor={item?.inputName} className="text-[16px]">{item?.inputLabel}</Label>
                                        {item?.inputName !== 'description' && <Input type={item?.type} id={item?.inputName} placeholder={item?.placeHolder} name={item?.inputName} onChange={handelChanges} value={product?.[item?.inputName]} />}
                                        {item?.inputName === 'description' && <Textarea placeholder="Type your description here." rows={4} className="resize-none" name="description" onChange={handelChanges} value={product?.[item?.inputName]} />}
                                    </div>
                                ))}
                                <div className="w-full lg:w-1/2 flex flex-col justify-between gap-3 lg:gap-0">
                                    {/* <!-- Options --> */}
                                    <div className="w-full flex flex-col gap-2">
                                        <Label htmlFor="categorys" className="text-[16px]">Category</Label>
                                        <Select disabled={loading?.showProducts || categories?.data?.length === 0} name="categorys" onValueChange={(value) => setProduct((prevState) => ({ ...prevState, categoryId: value }))}>
                                            <SelectTrigger className="w-full">
                                                {loading ? (
                                                    <SelectValue placeholder="Loading Categories..." />
                                                ) : (
                                                    <SelectValue placeholder={categories?.data?.length ? "Select a Category" : "No Categories Available"} />
                                                )}
                                            </SelectTrigger>
                                            <SelectContent aria-disabled>
                                                <SelectGroup>
                                                    {categories?.data?.map((category, index) => (
                                                        <SelectItem key={index} value={`${category?._id}`}>
                                                            {category?.categoryName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {/* <!-- Button --> */}
                                    <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
                                        {['Modify', 'Cancel']?.map((item, index) => (
                                            <Button key={index} className={`w-full lg:w-1/2 py-[24px] text-[18px] bg-white ${item === "Modify" ? "bg-green-600" : "text-black"} hover:text-white`} onClick={() => {
                                                if (item === 'Cancel') {
                                                    setPopUp((prevState) => ({ ...prevState, modify: false, productId: null }))
                                                } else {
                                                    modifyProduct(popUp?.productId ?? null)
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
                </div>
            </div>
        )}
    </>
}