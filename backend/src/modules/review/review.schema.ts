import {z} from 'zod'

/**
 * @swagger
 * components:
 *   schemas:
 *     createReviewSchema:
 *       type: object
 *       required:
 *         - bookId
 *         - content
 *         - rating
 *
 *       properties:
 *         bookId:
 *           type: string
 *           example: "book111"
 *
 *         content:
 *           type: string
 *           example: "Good book"
 *
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 */
export const createReviewSchema = z.object({
  bookId: z
    .string()
    .min(1, "Book ID is required"),

  content: z
    .string()
    .min(1, "Content is required"),

  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5"),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     updateReviewSchema:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           example: "Excellent book"
 *
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 4
 */
export const updateReviewSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .optional(),

  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not exceed 5")
    .optional(),
});