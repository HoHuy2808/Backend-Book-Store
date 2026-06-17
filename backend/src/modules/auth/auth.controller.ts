import { Request, Response, NextFunction } from "express";
import * as authService from './auth.service'
import { success } from "zod/v4";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.register(req.body)
        res.json({ success: true, data: result })
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.login(req.body)
        res.json({success: true, data: result})
    } catch (error) {
        next(error)
    }
}

export const changePassword = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const result = await authService.changePassword(req.body)
        res.json({success: true, data: result})
    } catch (error) {
        next(error)
    }
}