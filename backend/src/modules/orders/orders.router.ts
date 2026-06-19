import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import * as orderController from './orders.controller';
import { requireAdmin } from '@/middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * /api/orders/get-all-order:
 *   get:
 *     summary: Lấy danh sách đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
 *       401:
 *         description: Chưa đăng nhập hoặc token không hợp lệ
 *       403:
 *         description: Không có quyền truy cập
 */
router.get('/get-all-order', authMiddleware, orderController.getAll);
router.get('/get-all-order', authMiddleware, orderController.getAll);

/**
 * @swagger
 * /api/orders/get-order/{id}:
 *   get:
 *     summary: Lấy thông tin một order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 */
router.get('/get-order/:id', authMiddleware, orderController.getById);

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

/**
 * @swagger
 * /api/orders/cancel-order/{id}:
 *   patch:
 *     summary: Hủy đơn hàng
 *     description: Cho phép người dùng hủy đơn hàng theo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng cần hủy
 *         schema:
 *           type: string
 *           example: "cmf8x9a1b0001abc123xyz789"
 *     responses:
 *       200:
 *         description: Hủy đơn hàng thành công
 *       400:
 *         description: Không thể hủy đơn hàng
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.patch('/cancel-order/:id', authMiddleware, orderController.cancel);

/**
 * @swagger
 * /api/orders/delete-order/{id}:
 *   patch:
 *     summary: Xóa đơn hàng
 *     description: Cho phép người dùng xóa đơn hàng theo ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng cần xóa
 *         schema:
 *           type: string
 *           example: "cmf8x9a1b0001abc123xyz789"
 *     responses:
 *       200:
 *         description: Xóa đơn hàng thành công
 *       400:
 *         description: Không thể xóa đơn hàng
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.patch('/delete-order/:id', authMiddleware, orderController.isDeleted);


/**
 * @swagger
 * /api/orders/remove-order/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng cần xóa
 *         schema:
 *           type: string
 *           example: "cmf8x9a1b0001abc123xyz789"
 *     responses:
 *       200:
 *         description: Xóa đơn hàng thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 */
router.delete('/remove-order/:id', authMiddleware, orderController.remove);

export default router;
