import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

/*---> Middleware to check if the token is valid <---*/
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token: string | undefined = req.headers['authorization']?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token not provided!" });
        return
    }
    jwt.verify(token, process.env.JWT_SECRET ?? '', (error, data) => {
        if (error) {
            res.status(403).json({ message: "Invalid token" });
            return
        }
        req.data = data
        next();
    })
}

/*---> Middleware to check if the user is an admin <---*/
export const checkAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const userData = req.data as { admin: boolean }
    if (userData?.admin) {
        next();
    }
    else {
        res.status(403).json({ message: "Access denied. Admins only." });
        return
    }
}