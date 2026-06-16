import { Router } from 'express'
import * as authController from './auth.controller'

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
 *     summary: Register a new user
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
router.post('/register', authController.register)
// router.get
// router.patch
// router.delete

export default router;