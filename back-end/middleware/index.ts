import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { accountTypes } from '../dto';

/*---> Middleware to check if the token is valid <---*/
export const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Token not provided!" });
    }
    jwt.verify(token, process.env.JWT_SECRET ?? '', (error: jwt.VerifyErrors | null, data: string | jwt.JwtPayload | undefined) => {
        if (error) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.data = data as accountTypes
        next();
    })
}

/*---> Middleware to check if the user is an admin <---*/
export const checkAdmin = (req: Request, res: Response, next: NextFunction): any => {
    const userData = req.data as accountTypes
    console?.log(userData?.role)
    if (userData?.role === "admin") {
        next();
    }
    else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
}