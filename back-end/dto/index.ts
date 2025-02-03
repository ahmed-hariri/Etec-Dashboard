import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

/*---> Structure of data <---*/
export interface accountTypes {
    id: string
    fullName: string
    email: string
    password: string
    profile: Buffer | null
    subscribe: boolean | null
    admin: boolean | null
}
export interface productTypes {
    id: string
    name: string
    description: string
    price: number
    pictures: Buffer | null
    categoryId: string
}

export interface categoryTypes {
    id: string
    categoryName: string
}

export interface orderTypes {
    id: string
    userId: string
    products: [
        { productId: string, quantity: number }
    ]
    status: "Processing" | "Shipped" | "Delivered"
    totalPrice: number
}

/*---> Type for function <---*/
export type accountRepository = (userData: Partial<accountTypes>) => Promise<{ token: string | null, message: string }>
export type functionRepository<T> = (parameter?: Partial<T>) => Promise<{ data: any, message: string }>
export type functionControllers = (req: Request, res: Response, next: NextFunction) => Promise<any>

// Expanding the Request interface of Express to include the `data` property
declare global {
    namespace Express {
        // Adding a `data` property to the `Request` interface
        interface Request {
            // `data` can be a string, a decoded JWT payload, or undefined
            data?: string | JwtPayload | undefined;
        }
    }
}