import { productsTypes } from "@/types"
import axios from "axios"

/*---> Fetch all products <---*/
export const fetchAllProducts = async (): Promise<productsTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product`, {
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error fetch all products", err))
}