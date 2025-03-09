import { productsTypes } from "@/types"
import axios from "axios"

/*---> Fetch all purchased <---*/
export const fetchAllPurchased = async (): Promise<productsTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/purcheseds`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error fetch all products", err))
}