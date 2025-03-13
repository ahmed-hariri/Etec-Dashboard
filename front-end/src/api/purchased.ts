import { ordersTypes } from "@/types"
import axios from "axios"

/*---> Fetch all purchased <---*/
export const fetchAllPurchased = async (): Promise<ordersTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/purcheseds`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error fetch all products", err))
}

/*---> delete purchased product <---*/
export const removePurchasedProduct = async (productId: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/purchesed/${productId}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error purchased product:", err))
}