import { categorieTypes } from "@/types"
import axios from "axios"

/*---> Fetch all categories <---*/
export const fetchAllCategories = async (): Promise<categorieTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categorys`, {
        headers: {
            'content-type': 'application/json'
        }
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error fetch all categories:", err))
}

/*---> Create new categorie <---*/
export const createNewCategorie = async (newCategorie: { categoryName: string }) => {
    return axios?.post(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, newCategorie, {
        headers: {
            'content-type': 'application/json'
        },  
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error create newCategorie:", err))
}

/*---> Update categorie <---*/
export const updateCategorie = async (categorieId: string | null, categorie: { categoryName: string }) => {
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categorieId}`, categorie, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error update categorie:", err))
}

/*---> Remove categorie <---*/
export const removeCategorie = async (categorieId: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${categorieId}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error remove categorie:", err))
}