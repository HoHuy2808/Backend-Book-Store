import { Request, Response, NextFunction } from 'express';
import * as bookService from './book.service';

// TODO: Implement controllers cho module products
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const search = req.query.search as string
    const result = await bookService.getAll({page, limit, search})
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookService.getById(req.params.id)
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookService.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookService.update(req.params.id, req.body)
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};


export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bookService.remove(req.params.id)
    res.json({ success: true, message: 'Delete succesfully' });
  } catch (error) { next(error); }
};
