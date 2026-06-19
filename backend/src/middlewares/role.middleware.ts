import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

// Role: ADMIN || CUSTOMER
export const checkRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    const hasPermission = req.user.role.some(role => roles.includes(role));
    if (!hasPermission) {
      return res.sendStatus(403).json({
        messages: 'Permission Denied'
      });
    }

    next();
  }
}

export const requireAdmin = checkRole(Role.ADMIN);
export const requireCustomer = checkRole(Role.CUSTOMER);