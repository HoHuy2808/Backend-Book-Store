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
    title: z.string().min(1, 'Title is require'),
    price: z.number().positive("Price must be greater than 0"),
    stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative"),
    image: z.string().optional(),
    genres: z.array(z.string()),
    isbn: z.string().min(10, "ISBN is too short"),
    publishDate: z.string().date("Invalid publish date"),
    publisher: z.string().min(1, "Publisher is required"),
    format: z.string().min(1, "Format is required"),
    pages: z.number().int("Pages must be an integer").positive("Pages must be greater than 0"),
    language: z.string().min(1, "Language is required"),
    award: z.array(z.string()).optional(),
});


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
// export const updateBookSchema = z.object
export const updateBookSchema = z.object({
  book: z.object({
      title: z.string().min(1, "Title is required").optional(),
      price: z.number().positive("Price must be greater than 0").optional(),
      stock: z.number().int("Stock must be an integer").min(0, "Stock cannot be negative").optional(),
      image: z.string().optional(),
      genres: z.array(z.string()).optional(),
      isActive: z.boolean().optional(),
    }).optional(),

  details: z.object({
      isbn: z.string().min(10, "ISBN is too short").optional(),
      publishDate: z.string().date("Invalid publish date").optional(),
      publisher: z.string().min(1, "Publisher is required").optional(),
      format: z.string().min(1, "Format is required").optional(),
      pages: z.number().int("Pages must be an integer").positive("Pages must be greater than 0").optional(),
      language: z.string().min(1, "Language is required").optional(),
      award: z.array(z.string()).optional(),
    }).optional(),
});
