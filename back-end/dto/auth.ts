import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

/*---> Structure of data in the database <---*/
export interface user extends Document {
    id: string;
    fullName: string;
    email: string;
    password: string;
    profile?: Buffer | null | undefined;
    subscribe?: boolean | null | undefined;
    admin?: boolean | null | undefined;
}
/*---> Structure of data for the user <---*/
export interface userData {
    id: string;
    fullName: string;
    email: string;
    password: string;
    profile: Buffer | null | undefined;
    subscribe: boolean | null | undefined;
    admin: boolean | null | undefined;
}
/*---> Type for Repository Function <---*/
export type functionRepository = (userData: Partial<userData>) => Promise<{ token: string | null, message: string }>
/*---> Type for Controller Function <---*/
export type functionControllers = (req: Request, res: Response) => Promise<void>

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