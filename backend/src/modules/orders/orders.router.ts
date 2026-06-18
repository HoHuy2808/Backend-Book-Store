import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import * as orderController from './orders.controller';

const router = Router();

// TODO: Äá»‹nh nghÄ©a routes cho module orders
// router.get('/', authMiddleware, controller.getAll);
// router.get('/:id', authMiddleware, controller.getById);

/**
 * @swagger
 * /api/orders/create-order:
 *   post:
 *     summary: Tạo đơn hàng mới
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createOrderSchema'
 *     responses:
 *       201:
 *         description: Tạo đơn hàng thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post('/create-order', authMiddleware, orderController.create);


/**
 * @swagger
 * /api/orders/update-order/{id}:
 *   patch:
 *     summary: Cập nhật đơn hàng
 *     description: Cập nhật số lượng hoặc danh sách sản phẩm trong đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng
 *         schema:
 *           type: string
 *           example: "cmf8x9a1b0001abc123xyz789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateOrderSchema'
 *     responses:
 *       200:
 *         description: Cập nhật đơn hàng thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc không thể cập nhật đơn hàng
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.patch('/update-order/:id', authMiddleware, orderController.update);
// router.delete('/:id', authMiddleware, controller.remove);

export default router;
