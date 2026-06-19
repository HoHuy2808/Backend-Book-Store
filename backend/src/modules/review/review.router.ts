import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import * as reviewController from './review.controller';

const router = Router();

/**
 * @swagger
 * /api/reviews/post-review:
 *   post:
 *     summary: Create a review
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createReviewSchema'
 *
 *     responses:
 *       201:
 *         description: Review created successfully
 *
 *       400:
 *         description: Invalid request body
 *
 *       404:
 *         description: Book not found
 */
router.post('/post-review', authMiddleware, reviewController.create);

/**
 * @swagger
 * /api/reviews/update/{id}:
 *   patch:
 *     summary: Update a review
 *     tags:
 *       - Reviews
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateReviewSchema'
 *
 *     responses:
 *       200:
 *         description: Review updated successfully
 *
 *       400:
 *         description: Invalid request body
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Review not found
 */
router.patch('/update/:id', authMiddleware, reviewController.update);

/**
 * @swagger
 * /api/reviews/delete/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "review123"
 *         description: Review ID
 *
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Review not found
 */
router.delete('/delete/:id', authMiddleware, reviewController.remove);


// router.get('/', authMiddleware, controller.getAll);
// router.get('/:id', authMiddleware, controller.getById);
export default router;
