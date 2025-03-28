import { categorieNameTypes, categoriesTypes } from "@/types"
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

/*---> Fetch all categories <---*/
export const fetchAllCategories = async (): Promise<categoriesTypes> => {
    return api?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categorys`, {
        headers: {
            'content-type': 'application/json'
        }
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error fetch all categories:", error?.response?.data?.message))
}

/*---> Create new categorie <---*/
export const createNewCategorie = async (newCategorie: categorieNameTypes) => {
    return axios?.post(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, newCategorie, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    })?.then((response) => response?.data)?.catch((error) => {
        console?.error("Error create newCategorie:", error?.response?.data?.message)
        return { error: error?.response?.data?.message };
    })
}

/*---> Update categorie <---*/
export const updateCategorie = async (categorieId: string | null, categorie: categorieNameTypes) => {
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categorieId}`, categorie, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error update categorie:", error?.response?.data?.message))
}

/*---> Remove categorie <---*/
export const removeCategorie = async (categorieId: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categorieId}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error remove categorie:", error?.response?.data?.message))
}