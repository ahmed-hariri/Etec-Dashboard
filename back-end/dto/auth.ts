import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

/*---> Structure of data <---*/
export interface userData {
    id: string;
    fullName: string;
    email: string;
    password: string;
    profile: Buffer | null;
    subscribe: boolean | null;
    admin: boolean | null;
}
export interface productTypes {
    id: string,
    name: string,
    description: string,
    price: number,
    pictures: Buffer | null,
    categoryId: string
}

export interface categoryTypes {
    id: string,
    categoryName: string
}

/*---> Type for function <---*/
export type accountRepository = (userData: Partial<userData>) => Promise<{ token: string | null, message: string }>
export type functionRepository = (product?: Partial<productTypes>) => Promise<{ data: any | string | null, message: string }>
export type categoryRepository = (category?: Partial<categoryTypes>) => Promise<{ data: any | string | null, message: string }>
export type functionControllers = (req: Request, res: Response, next: NextFunction) => Promise<Response | any>

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