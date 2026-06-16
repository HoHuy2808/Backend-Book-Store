import {z} from 'zod'


/**
 * @swagger
 * components:
 *   schemas:
 *     registerRequestSchema:
 *       type: object
 *       required:
 *         - phone
 *         - password
 *         - fullName
 *       properties:
 *         phone:
 *           type: string 
 *           example: 033 333 3333
 *         password:
 *           type: string
 *           example: 123456
 *         fullName:
 *           type: string
 *           example: Nguyen Van A
 */
const registerRequestSchema = z.object({
    phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
    password: z.string().min(6, "Mat khau phai co it nhat 6 ky tu"),
    fullName: z.string()
})