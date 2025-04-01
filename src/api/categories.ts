import { categorieNameTypes, categoriesTypes } from "@/types"
import axios from "axios"
import { setupCache } from "axios-cache-adapter"

// Set up cache with configuration
const cache = setupCache({
    maxAge: 15 * 60 * 1000, // 15 min
    clearOnStale: true, // Clear data when it's stale (expired)
})

// Create an axios instance with the cache adapter
const api = axios?.create({
    adapter: cache?.adapter
})

// Clear the cache when needed
// This function can be called to refresh the cache manually
export const refreshCache = () => {
    (cache?.store as { clear: () => void })?.clear();
}

/*---> Fetch all categories <---*/
export const fetchAllCategories = async (): Promise<categoriesTypes> => {
    return api?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categorys`, {
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => response?.data).catch((error) => {
        console.error("Error fetch all categorys:", error?.response?.data?.message)
    })
}

/*---> Create a new category <---*/
export const createNewCategorie = async (newCategorie: categorieNameTypes) => {
    return axios?.post(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, newCategorie, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error create a new category:", error?.response?.data?.message)
    })
}

/*---> Update an existing category <---*/
export const updateCategorie = async (categorieId: string | null, categorie: categorieNameTypes) => {
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categorieId}`, categorie, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error update a category:", error?.response?.data?.message)
    })
}

/*---> Remove a category <---*/
export const removeCategorie = async (categorieId: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categorieId}`, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error remove a category:", error?.response?.data?.message)
    })
}