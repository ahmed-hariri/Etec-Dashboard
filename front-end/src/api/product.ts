import { productsTypes } from "@/types"
import axios from "axios"
import cookies from "js-cookie";

/*---> Fetch all products <---*/
export const fetchAllProducts = async (): Promise<productsTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, {
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error fetch all products", err))
}

/*---> Create newProduct <---*/
export const createNewProduct = async (newProduct: { name: string, description: string, price: number, picture: string, categoryId: string }) => {
    return axios?.post(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, newProduct, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${cookies?.get("Token")}`
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error create newProduct", err))
}

/*---> Update product <---*/
export const updateProduct = async (id: string | null, product: { name: string, description: string, price: number, picture: string, categoryId: string }) => {
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, product, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${cookies?.get("Token")}`
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error update product", err))
}

/*---> Remove product <---*/
export const removeProduct = async (id: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${cookies?.get("Token")}`
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error delete product", err))
}
