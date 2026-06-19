import { Request, Response, NextFunction } from 'express';
import * as orderService from './orders.service';

// TODO: Implement controllers cho module orders
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.user?.role?.[0]
    const result = await orderService.getAllOrder(role)
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id;
    const role = req.user?.role?.[0]
    const result = await orderService.getOrderById(orderId, role)
    res.json({ success: true, data: result });
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

export const cancel = async(req:Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id;
    const result = await orderService.cancelOrder(orderId);
    res.json({succes: true, message: 'Cancel order successfully', data: result})
  } catch (error) {
    next(error)
  }
}

export const isDeleted = async(req:Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id;
    const result = await orderService.deleteOrder(orderId);
    res.json({succes: true, message: 'Delete order successfully', data: result})
  } catch (error) {
    next(error)
  }
}
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderId = req.params.id;
    await orderService.remove(orderId)
    res.json({ success: true, message: 'Xóa đơn hàng thành công' });
  } catch (error) { next(error); }
};
