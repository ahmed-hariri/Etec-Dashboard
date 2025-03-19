import { ordersTypes } from "@/types"
import axios from "axios"
import { setupCache } from "axios-cache-adapter"

const cache = setupCache({
    maxAge: 15 * 60 * 1000, // 15 min
    clearOnStale: true,
})

const api = axios?.create({
    adapter: cache?.adapter
})

export const refreshCache = () => {
    (cache?.store as { clear: () => void })?.clear(); // Clear the cache
}

/*---> Fetch all purchased <---*/
export const fetchAllPurchased = async (): Promise<ordersTypes> => {
    return api?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/purcheseds`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error fetch all products", error?.response?.data?.message))
}

/*---> delete purchased product <---*/
export const removePurchasedProduct = async (productId: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/purchesed/${productId}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error purchased product:", error?.response?.data?.message))
}