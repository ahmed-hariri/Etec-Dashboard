import { authenticationTypes } from "@/types";
import axios from "axios";

/*---> Create a new account <---*/
export const accountSignUp = async (account: Partial<authenticationTypes>) => {
    return axios?.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, account, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        }
    }).then((response) => response?.data).catch((error) => {
        console.error("Error register newAccount:", error?.response?.data?.message)
    })
}

/*---> Log in to your account <---*/
export const accountSignIn = async (account: Partial<authenticationTypes>) => {
    return axios?.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, account, {
        headers: {
            Accept: "application/json",
            'content-type': 'application/json'
        }
    }).then((response) => response.data).catch((error) => {
        console.error("Error login account:", error?.response?.data?.message)
    })
}