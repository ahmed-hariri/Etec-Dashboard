import { Request, Response } from "express";
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
