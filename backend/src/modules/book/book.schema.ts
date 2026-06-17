import { z } from 'zod'


/**
 * @swagger
 * components:
 *   schemas:
 *     createBookSchema:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - stock
 *         - image
 *         - genres
 *         - isbn
 *         - publishDate
 *         - publisher
 *         - format
 *         - pages
 *         - language
 *       properties:
 *         title:
 *           type: string
 *           example: "Clean Code"
 *         price:
 *           type: number
 *           example: 250000
 *         stock:
 *           type: integer
 *           example: 30
 *         image:
 *           type: string
 *           example: "clean-code.jpg"
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Programming"
 *         isbn:
 *           type: string
 *           example: "9780132350884"
 *         publishDate:
 *           type: string
 *           example: "2008-08-01"
 *         publisher:
 *           type: string
 *           example: "Prentice Hall"
 *         format:
 *           type: string
 *           example: "Paperback"
 *         pages:
 *           type: integer
 *           example: 464
 *         language:
 *           type: string
 *           example: "English"
 *         award:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Jolt Award"
 */
export const createBookSchema = z.object({

})

/**
 * @swagger
 * components:
 *   schemas:
 *     updateBookSchema:
 *       type: object
 *       properties:
 *         book:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               example: "Clean Code - Updated Edition"
 *             price:
 *               type: number
 *               example: 300000
 *             stock:
 *               type: integer
 *               minimum: 0
 *               example: 50
 *             image:
 *               type: string
 *               example: "clean-code-updated.jpg"
 *             genres:
 *               type: array
 *               items:
 *                 type: string
 *               example:
 *                 - "Programming"
 *                 - "Software Engineering"
 *             isActive:
 *               type: bool
 *               example: false
 *
 *         details:
 *           type: object
 *           properties:
 *             isbn:
 *               type: string
 *               example: "9780132350884"
 *             publish_date:
 *               type: string
 *               format: date
 *               example: "2008-08-01"
 *             publisher:
 *               type: string
 *               example: "Prentice Hall"
 *             format:
 *               type: string
 *               example: "Hardcover"
 *             pages:
 *               type: integer
 *               minimum: 1
 *               example: 500
 *             language:
 *               type: string
 *               example: "English"
 *             award:
 *               type: array
 *               items:
 *                 type: string
 *               example:
 *                 - "Jolt Award"
 *                 - "Best Technical Book"
 *       example:
 *         book:
 *           title: "Clean Code - Updated Edition"
 *           price: 300000
 *           stock: 50
 *         details:
 *           pages: 500
 *           publisher: "Prentice Hall"
 */
export const updateBookSchema = z.object