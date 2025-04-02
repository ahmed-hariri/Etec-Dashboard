"use client"

import React, { useCallback, useEffect } from "react";
import { inputTypes } from "@/types";
import { toast, Toaster } from "sonner";
import { createNewProduct, fetchAllProducts, refreshCache, removeProduct, updateProduct } from "@/api/product";
import { fetchAllCategories } from "@/api/categories";
import notFoundPicture from "@/../public/no-photo.jpg"
import { fetchData } from "@/util/fetchData";
import useProductsStore from "@/store/pages/productStore";
import ProductAction from "./modify";
import ProductCards from "./cards";
import ProductForm from "./form";
import RemoveAction from "@/components/shared/remove";
import Title from "../shared/title";

export default function ProductsComponents() {
    /*---> States (Zustand) <---*/
    const {
        product, setProduct,
        products, setProducts,
        categories, setCategories,
        loading, setLoading,
        popUp, setPopUp,
        picture, setPicture
    } = useProductsStore()

    /*---> Functions <---*/
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e?.target;
        if (name === "pictures") {
            setPicture(value)
            return
        }
        setProduct({ [name]: name === "price" ? parseFloat(value) : value });
    }, [setProduct, setPicture])
    const isValidProduct = useCallback((product: inputTypes) => {
        return product?.name?.trim() && product?.description?.trim() && product?.price && product?.categoryId?.trim();
    }, [])
    const handelValues = useCallback(async (): Promise<void> => {
        /*---> Verification <---*/
        if (!isValidProduct(product)) {
            toast.warning("Please fill in all the fields.");
            return;
        }
        // Create a new product
        await addProduct()
    }, [product])
    /* <!-- Picture (Add / Remove) --> */
    const pictureAction = useCallback((action: string, index?: number): void => {
        if (action === "addNewPicture") {
            if ((product?.pictures ?? [])?.length < 4 && picture?.trim() !== "") {
                // Validate if the provided URL is valid
                try {
                    new URL(picture)
                    setProduct(({ ...product, pictures: [...product?.pictures ?? [], picture] }))
                    setPicture("")
                } catch {
                    toast?.warning("The provided URL is invalid:");
                }
            }
        } else {
            const newPictures: string[] = product?.pictures?.filter((_, pictureId) => pictureId !== index) ?? []
            setProduct({ pictures: newPictures })
        }
    }, [picture, product]);
    /* <!-- Validate if the admin provided a URL or not --> */
    const isUrl = (url: string) => {
        try {
            const validatedUrl = new URL(url);
            return validatedUrl.protocol.startsWith("http") ? url : notFoundPicture?.src;
        } catch {
            return notFoundPicture?.src;
        }
    };
    const addProduct = async (): Promise<void> => {
        try {
            const response = await createNewProduct(product)
            if (response?.message === 'Product has been created!') {
                toast?.success(response?.message);
                setProduct({ name: '', description: '', price: null, pictures: [], categoryId: '' })
                refreshCache() // Clears the cache to fetch new data.
                await fetchData(fetchAllProducts, setProducts); // Fetches all products again.
            }
        } catch (error) {
            console?.error("Error create newProduct : ", error)
        }
    }
    const handelProduct = (id: string | null): void => {
        const findProduct = products?.data?.find((product) => product?._id === id);
        if (findProduct) {
            setPopUp?.({ modify: true, id: id ?? null })
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
                setPopUp?.({ modify: false, remove: false, id: '' });
                setProduct({ name: '', description: '', price: null, pictures: [], categoryId: '' })
                refreshCache() // Clears the cache to fetch new data.
                await fetchData(fetchAllProducts, setProducts); // Fetches all products again.
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
                setPopUp?.({ modify: false, remove: false, id: '' });
                refreshCache() // Clears the cache to fetch new data.
                await fetchData(fetchAllProducts, setProducts); // Fetches all products again.
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
        ]).finally(() => setLoading({ showProducts: false }))
    }, [setProducts, setCategories, setLoading])

    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                {/* <!-- Title/Description of the page --> */}
                <Title title="Products" description="Welcome back, here’s an overview of your products." />
                {/* <!-- Product Form --> */}
                <ProductForm
                    product={product} setProduct={setProduct} picture={picture}
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
        <RemoveAction title="product" popUp={popUp} setPopUp={setPopUp} method={deleteProduct} />
        {/* <!-- Modify product --> */}
        <ProductAction
            popUp={popUp} setPopUp={setPopUp} method={modifyProduct} onChange={handleInputChange}
            product={product} setProduct={setProduct} picture={picture} pictureAction={pictureAction}
            categories={categories}
        />
    </>
}