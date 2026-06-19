import { Request, Response, NextFunction } from 'express';
import * as reviewService from './review.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.user!.userId;
    const result = await reviewService.create(customerId, req.body)
    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reviewService.update(req.params.id, req.body)
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await reviewService.remove(req.params.id)
    res.json({ success: true, message: 'Xóa thành công' });
  } catch (error) { next(error); }
};

// export const getAll = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.json({ success: true, data: [] });
//   } catch (error) { next(error); }
// };

// export const getById = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.json({ success: true, data: null });
//   } catch (error) { next(error); }
// };

