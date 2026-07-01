import { Router } from 'express'
import * as authController from './auth.controller'
import { validate } from '@/middlewares/validate.middleware';
import { changePasswordSchema, loginRequestSchema, refreshTokenSchema, registerRequestSchema } from './auth.schema';
import { authMiddleware } from '@/middlewares/auth.middleware';

export const router = Router();

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

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/refreshTokenSchema'
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', authMiddleware, validate(refreshTokenSchema), authController.renewAccessToken);

// router.get
// router.delete

export default router;