import { accountTypes } from "@/types";
import axios from "axios";

/*---> Create newAccount <---*/
export const accountSignUp = async (account: Partial<accountTypes>) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,account, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        }
    }).then((response) => response.data).catch((error) => console.error("Error Register New Account:", error))
}

/*---> Login oldAccount <---*/
export const accountSignIn = async (account: Partial<accountTypes>) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,account, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        }
    }).then((response) => response.data).catch((error) => console.error("Error Login Account:", error))
}