import { contactsTypes } from "@/types"
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

/*---> Fetch all contacts <---*/
export const fetchAllContacts = async (): Promise<contactsTypes> => {
    return api?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error fetch all contacts:", error?.response?.data?.message)
    })
}

/*---> Fetch all contacts <---*/
export const removeContact = async (contactId: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${contactId}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error delete a contact:", error?.response?.data?.message)
    })
}