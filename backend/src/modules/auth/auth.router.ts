import { Router } from 'express'
import * as authController from './auth.controller'
import { validate } from '@/middlewares/validate.middleware';
import { changePasswordSchema, loginRequestSchema, registerRequestSchema } from './auth.schema';

export const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/registerRequestSchema'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 */
router.post('/register', validate(registerRequestSchema), authController.register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginRequestSchema'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 */
router.post('/login', validate(loginRequestSchema), authController.login)

/**
 * @swagger
 * /api/auth/change-password:
 *   patch:
 *     summary: Thay đổi mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changePasswordSchema'
 *     responses:
 *       201:
 *         description: Password change successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 */
router.patch('/change-password', validate(changePasswordSchema), authController.changePassword)
// router.get
// router.delete

export default router;