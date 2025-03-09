import { ordersTypes } from "@/types";
import axios from "axios";

/*---> Fetch all orders <---*/
export const fetchAllOrders = async (): Promise<ordersTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error fetch all orders:", err))
}

/*---> Change order state <---*/
export const changeOrderState = async (id: string | null, newStatus: { status: string }) => {
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}`, newStatus, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error change order state:", err))
}