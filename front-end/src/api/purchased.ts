import { productsTypes } from "@/types"
import axios from "axios"
import cookies from "js-cookie";

/*---> Fetch all purchased <---*/
export const fetchAllPurchased = async (): Promise<productsTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/purchesed`, {
        headers: {
            'content-type': 'application/json',
             'Authorization': `Bearer ${cookies?.get("Token")}`
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error fetch all products", err))
}