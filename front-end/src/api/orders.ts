import { ordersTypes } from "@/types";
import axios from "axios";
import cookies from "js-cookie";

/*---> Fetch all orders <---*/
export const fetchAllOrders = async (): Promise<ordersTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${cookies?.get("Token")}`
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error fetch all orders", err))
}

/*---> Change order state <---*/
export const changeOrderState = async (id: string | null, status: string) => {
    console.log(id, status)
    return axios?.put(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${id}`, { status: status }, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${cookies?.get("Token")}`
        }
    }).then((response) => response?.data)?.catch((err) => console?.error("Error change order state", err))
}