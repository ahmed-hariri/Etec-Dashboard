import { accountTypes } from "@/types"
import axios from "axios"
import { setupCache } from "axios-cache-adapter"

const cache = setupCache({
    maxAge: 15 * 60 * 1000, // 15 min
    clearOnStale: true,
})

const api = axios?.create({
    adapter: cache?.adapter
})

/*---> Fetch all clients <---*/
export const fetchAllClients = async (): Promise<accountTypes> => {
    return api?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((error) => console?.error("Error fetch all clients:", error?.response?.data?.message))
}