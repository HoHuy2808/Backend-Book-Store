import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Request validation failed',
        errors: result.error.flatten(),
      });
    }

    // Replace req.body with validated & transformed data
    req.body = result.data;

    next();
  };