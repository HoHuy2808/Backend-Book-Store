import { z } from 'zod'


/**
 * @swagger
 * components:
 *   schemas:
 *     createOrderSchema:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           minItems: 1
 *           description: Danh sách sản phẩm trong đơn hàng
 *           items:
 *             type: object
 *             required:
 *               - bookId
 *               - quantity
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: "cmf8x9a1b0001abc123xyz789"
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 */
export const createOrderSchema = z.object

/**
 * @swagger
 * components:
 *   schemas:
 *     updateOrderSchema:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           description: Danh sách sản phẩm cần cập nhật trong đơn hàng
 *           items:
 *             type: object
 *             required:
 *               - bookId
 *               - quantity
 *             properties:
 *               bookId:
 *                 type: string
 *                 example: "cmf8x9a1b0001abc123xyz789"
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 */
export const updateOrderSchema = z.object