import { accountTypes } from "@/types"
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

/*---> Fetch all clients <---*/
export const fetchAllClients = async (): Promise<accountTypes> => {
    return api?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error fetch all clients:", error?.response?.data?.message)
    })
}

/*---> Remove a client <---*/
export const removeClient = async (clientId: string | null): Promise<{ message: string }> => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/client/${clientId}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error remove a clients", error?.response?.data?.message)
    })
}