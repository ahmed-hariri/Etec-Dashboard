import { productsTypes } from "@/types"
import axios from "axios"

type newProductType = {
    name: string,
    description: string,
    price: number,
    picture: string,
    categoryId: string
}

/*---> Fetch all products <---*/
export const fetchAllProducts = async (): Promise<productsTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        headers: {
            'content-type': 'application/json'
        }
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error fetch all products:", err))
}

/*---> Create newProduct <---*/
export const createNewProduct = async (newProduct: newProductType) => {
    return axios?.post(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, newProduct, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error create newProduct:", err))
}

/*---> Update product <---*/
export const updateProduct = async (id: string | null, product: newProductType) => {
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, product, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error update product:", err))
}

/*---> Remove product <---*/
export const removeProduct = async (id: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error delete product:", err))
}
