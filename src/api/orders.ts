import { ordersTypes } from "@/types";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";

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

/*---> Fetch all orders <---*/
export const fetchAllOrders = async (): Promise<ordersTypes> => {
    return api?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error fetch all orders:", error?.response?.data?.message)
    })
}
/*---> Change order state <---*/
export const changeOrderState = async (id: string | null, newStatus: { status: string }) => {
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}`, newStatus, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true // send request with cookies
    }).then((response) => response?.data).catch((error) => {
        console.error("Error change a order state:", error?.response?.data?.message)
    })
}