import { Request, Response, NextFunction } from 'express';
import * as orderService from './orders.service';

// TODO: Implement controllers cho module orders
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: [] });
  } catch (error) { next(error); }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: null });
  } catch (error) { next(error); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = req.user!.userId;
    const { items } = req.body;
    const result = await orderService.createOrder(customerId, items)
    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id;
    const { items } = req.body;
    const result = await orderService.updateOrder(orderId, items);
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, message: 'ÄÃ£ xÃ³a thÃ nh cÃ´ng' });
  } catch (error) { next(error); }
};
