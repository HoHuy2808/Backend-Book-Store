import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv'
import { Role } from '@prisma/client';
dotenv.config()

interface AuthPayload extends Request {
    userId: string;
    roles: Role[]
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
        res.json({ message: `Need login to continue` });
    }

    const secret = process.env.JWT_ACCESS_TOKEN;
    if (!secret) {
        throw new Error("JWT_ACCESS_TOKEN is missing in .env");
    }

    try {
        const decoded = jwt.verify(token, secret) as AuthPayload
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'The token is invalid or has expired' });
    }

}
