"use client"

import React, { useCallback, useEffect, useState } from "react";
import Title from "../../shared/title";
import { categoriesTypes, inputTypes, loadingTypes, popUpTypes, productsTypes } from "@/types";
import { toast, Toaster } from "sonner";
import { createNewProduct, fetchAllProducts, refreshCache, removeProduct, updateProduct } from "@/api/product";
import { fetchAllCategories } from "@/api/category";
import notFoundPicture from "@/../public/no-photo.jpg"
import ProductCards from "@/components/shared/product/cards";
import ProductAction from "@/components/shared/product/action";
import ProductForm from "@/components/shared/product/form";
import { fetchData } from "@/util/fetchData";

export default function ProductsComponents() {
    /*---> States <---*/
    const [products, setProducts] = useState<productsTypes>({ data: [] })
    const [product, setProduct] = useState<inputTypes>({ name: '', description: '', price: null, pictures: [], categoryId: '' });
    const [categories, setCategories] = useState<categoriesTypes>({ data: [] });
    const [loading, setLoading] = useState<loadingTypes>({ newProduct: false, showProducts: true })
    const [popUp, setPopUp] = useState<popUpTypes>({ modify: false, remove: false, productId: "" })
    const [newPicture, setNewPicture] = useState<string>('')

    /*---> Functions <---*/
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e?.target;
        if (name === "pictures") {
            setNewPicture(value)
        } else if (name === 'price') {
            setProduct((prevState) => ({ ...prevState, [name]: parseFloat(value) }));
        } else {
            setProduct((prevState) => ({ ...prevState, [name]: value }));
        }
    }, [])
    const isValidProduct = useCallback((product: inputTypes) => {
        return product?.name?.trim() && product?.description?.trim() && product?.price && product?.categoryId?.trim();
    }, [])
    const handelValues = useCallback(async (): Promise<void> => {
        /*---> Verification <---*/
        if (!isValidProduct(product)) {
            toast.warning("Please fill in all the fields.");
            return;
        }
        await addProduct()
    }, [product])
    /* <!-- Picture (Add / Remove) --> */
    const pictureAction = useCallback((action: string, index?: number): void => {
        if (action === "addNewPicture") {
            if (product?.pictures?.length < 4 && newPicture?.trim() !== "") {
                setProduct((prevState) => ({ ...prevState, pictures: [...prevState?.pictures, newPicture] }))
                setNewPicture("")
            }
        } else {
            const newPictures: string[] = product?.pictures?.filter((_, pictureId) => pictureId !== index)
            setProduct((prevState) => ({ ...prevState, pictures: newPictures }))
        }
    }, [product, newPicture]);
    /* <!-- Validate if client give me url or not --> */
    const isUrl = (url: string) => {
        try {
            const validatedUrl = new URL(url);
            return validatedUrl.protocol.startsWith("http") ? url : notFoundPicture?.src;
        } catch {
            return notFoundPicture?.src;
        }
    };
    const addProduct = async (): Promise<void> => {
        setLoading((prevState) => ({ ...prevState, newProduct: true }))
        try {
            const response = await createNewProduct(product)
            if (response?.message === 'Product has been created!') {
                toast?.success(response?.message);
                setProduct({ name: '', description: '', price: null, pictures: [], categoryId: '' })
                refreshCache()
                await fetchData(fetchAllProducts, setProducts);
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
                name: findProduct?.name, price: findProduct?.price, pictures: findProduct?.pictures,
                description: findProduct?.description, categoryId: findProduct?.categoryId?._id ?? ''
            })
        }
    }
    const modifyProduct = async (id: string | null): Promise<void> => {
        try {
            const response = await updateProduct(id, product);
            if (response?.message === 'Product updated successfully!') {
                toast?.success(response?.message);
                setPopUp({ modify: false, remove: false, productId: '' });
                setProduct({ name: '', description: '', price: null, pictures: [], categoryId: '' })
                refreshCache()
                await fetchData(fetchAllProducts, setProducts);
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
                refreshCache()
                await fetchData(fetchAllProducts, setProducts);
            }
        } catch (error) {
            console?.error("Error remove product : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        Promise?.allSettled([
            fetchData(fetchAllProducts, setProducts, "Error fetch all products:"),
            fetchData(fetchAllCategories, setCategories, "Error fetch all categories:")
        ]).finally(() => setLoading((prevState) => ({ ...prevState, showProducts: false })))
    }, [])

    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Products" paragraphe="Welcome back, here’s an overview of your products." />
                {/* <!-- Product Form --> */}
                <ProductForm
                    productValue={product} setProductValue={setProduct} pictureValue={newPicture}
                    onChange={handleInputChange} categories={categories} loading={loading}
                    pictureAction={pictureAction} onCreateProduct={handelValues}
                />
                {/* <!-- Product cards --> */}
                <ProductCards loading={loading} products={products} handelProduct={handelProduct} setPopUp={setPopUp} isUrl={isUrl} />
            </div>
        </section>
        {/* <!-- Message --> */}
        <div className='w-full py-5 flex justify-center bottom-0 fixed'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {/* <!-- Remove product --> */}
        <ProductAction type="remove" popUp={popUp} setPopUp={setPopUp} pictureMethod={deleteProduct} />
        {/* <!-- Modify product --> */}
        <ProductAction
            type="modify" popUp={popUp} setPopUp={setPopUp} pictureMethod={modifyProduct}
            product={product} setProductValue={setProduct} categories={categories} onChange={handleInputChange} pictureAction={pictureAction}
        />
    </>
}