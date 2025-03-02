import { categorieTypes } from "@/types"
import axios from "axios"

/*---> Fetch all categories <---*/
export const fetchAllCategories = async (): Promise<categorieTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`, {
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error fetch all categories", err))
}
