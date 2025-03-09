import { accountTypes } from "@/types"
import axios from "axios"

/*---> Fetch all clients <---*/
export const fetchAllClients = async (): Promise<accountTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error fetch all clients:", err))
}