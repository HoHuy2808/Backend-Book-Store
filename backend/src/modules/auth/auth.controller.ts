import { Request, Response, NextFunction } from "express";
import * as authService from './auth.service'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.register(req.body)
        res.json({ success: true, data: result })
    } catch (error) {
        next(error);
    }
}