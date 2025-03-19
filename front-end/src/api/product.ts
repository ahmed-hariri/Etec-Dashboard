import { newProductTypes, productsTypes } from "@/types"
import axios from "axios"
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 15 * 60 * 1000, // 15 min
    clearOnStale: true, // Set cache expiration to 15 minutes and enable auto-clear on stale data
})

const api = axios?.create({
    adapter: cache?.adapter
})

export const refreshCache = () => {
    (cache?.store as { clear: () => void })?.clear(); // Clear the cache
}

/*---> Fetch all products <---*/
export const fetchAllProducts = async (): Promise<productsTypes> => {
    return api?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        headers: {
            'content-type': 'application/json'
        }
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error fetch all products:", error?.response?.data?.message))
}

/*---> Create newProduct <---*/
export const createNewProduct = async (newProduct: newProductTypes) => {
    return axios?.post(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, newProduct, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error create newProduct:", error?.response?.data?.message))
}

/*---> Update product <---*/
export const updateProduct = async (id: string | null, product: newProductTypes) => {
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, product, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error update product:", error?.response?.data?.message))
}

/*---> Remove product <---*/
export const removeProduct = async (id: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error delete product:", error?.response?.data?.message))
}
