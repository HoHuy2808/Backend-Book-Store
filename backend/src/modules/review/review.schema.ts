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