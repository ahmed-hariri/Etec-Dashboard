import { contactsTypes } from "@/types"
import axios from "axios"

/*---> Fetch all contacts <---*/
export const fetchAllContacts = async (): Promise<contactsTypes> => {
    return axios?.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error fetch all contacts:", err))
}

/*---> Fetch all contacts <---*/
export const removeContact = async (contactId: string | null) => {
    return axios?.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/${contactId}`, {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    })?.then((response) => response?.data)?.catch((err) => console?.error("Error delete contact:", err))
}