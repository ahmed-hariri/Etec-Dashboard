import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

/*---> Structure of data <---*/
export interface accountTypes {
    id?: string
    fullName: string
    email: string
    password: string
    profile: string | null
    subscribe: boolean | null
    role?: "admin" | "client" | null
}
export interface productTypes {
    id?: string
    name: string
    description: string
    price: number
    pictures: string[]
    categoryId: string
}

export interface categoryTypes {
    id?: string
    categoryName: string
}

export interface contactTypes {
    id?: string
    name: string
    email: string
    description: string
}

export interface orderTypes {
    id?: string
    userId: string
    products: [
        { productId: string, quantity: number }
    ]
    status: "Processing" | "Shipped" | "Delivered"
    totalPrice: number
}

/*---> Type for function <---*/
export type accountRepository = (userData: Partial<accountTypes>) => Promise<{ token: string | null, data?: any, message: string }>
export type functionRepository<T> = (parameter?: Partial<T>) => Promise<{ data: any, message: string }>
export type functionControllers = (req: Request, res: Response, next: NextFunction) => Promise<any>

// Expanding the Request interface of Express to include the `data` property
declare global {
    namespace Express {
        // Adding a `data` property to the `Request` interface
        interface Request {
            // `data` can be a string, a decoded JWT payload, or undefined
            data?: any;
        }
    }
}