import { Router } from 'express';
// import { authMiddleware } from '@/middlewares/auth.middleware';
import * as bookController from './book.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { requireAdmin } from '@/middlewares/role.middleware';
import { validate } from '@/middlewares/validate.middleware';
import { createBookSchema, updateBookSchema } from './book.schema';

const router = Router();

/**
 * @swagger
 * /api/books/get-all-books:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Số lượng sản phẩm mỗi trang
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "Clean Code"
 *         description: Lọc theo trạng thái đơn hàng
 *     responses:
 *       200:
 *         description: Lấy danh sách sản phẩm thành công
 *       401:
 *         description: Unauthorized
 */
router.get('/get-all-books', authMiddleware, bookController.getAll);

/**
 * @swagger
 * /api/books/get-book/{id}:
 *   get:
 *     summary: Lấy thông tin sách theo ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sách
 *         schema:
 *           type: string
 *           example: "cmf8x9a1b0001abc123xyz789"
 *     responses:
 *       200:
 *         description: Lấy sách thành công
 *       404:
 *         description: Không tìm thấy sách
 */
router.get('/get-book/:id', authMiddleware, bookController.getById);

/**
 * @swagger
 * /api/books/add:
 *   post:
 *     summary: Tạo sản phẩm mới
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createBookSchema'
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 */
router.post('/add', authMiddleware, requireAdmin, validate(createBookSchema), bookController.create);

/**
 * @swagger
 * /api/books/update-book/{id}:
 *   patch:
 *     summary: Cập nhật thông tin sách
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sách
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateBookSchema'
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 * 
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.patch('/update-book/:id', authMiddleware, requireAdmin, validate(updateBookSchema), bookController.update);


/**
 * @swagger
 * /api/books/delete-book/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sách cần xóa
 *         schema:
 *           type: string
 *           example: "cmf8x9a1b0001abc123xyz789"
 *     responses:
 *       200:
 *         description: Xóa sản phẩm thành công
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
// router.delete('/:id', authMiddleware, controller.remove);
router.delete('/delete-book/:id', authMiddleware, requireAdmin, bookController.remove);

export default router;
