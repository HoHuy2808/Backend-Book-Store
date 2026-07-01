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
export const registerRequestSchema = z.object({
    phone: z.string().min(10, 'Phone must have at least 10 number'),
    password: z.string().min(6, 'Password must have at least 6 character'),
    fullName: z.string()
})

/**
 * @swagger
 * components:
 *   schemas:
 *     loginRequestSchema:
 *       type: object
 *       required:
 *         - phone
 *         - password
 *       properties:
 *         phone:
 *           type: string 
 *           example: 033 333 3333
 *         password:
 *           type: string
 *           example: 123456
 */
export const loginRequestSchema = z.object({
    phone: z.string(
        {required_error: 'Phone is require', invalid_type_error:`Phone can't be a string`}
    ).min(10, 'Phone must have at least 10 number'),
    password: z.string(
        {required_error: `Password can't be blank`}
    ).min(6, 'Password must have at least 6 character')
})

/**
 * @swagger
 * components:
 *   schemas:
 *     changePasswordSchema:
 *       type: object
 *       required:
 *         - phone
 *         - password
 *       properties:
 *         phone:
 *           type: string 
 *           example: 033 333 3333
 *         newPass:
 *           type: string
 *           example: 1234567
 */
export const changePasswordSchema = z.object({
    phone: z.string(
        {required_error: 'Phone is require', invalid_type_error:`Phone can't be a string`}
    ).min(10, 'Phone must have at least 10 number'),
    newPass: z.string(
        {required_error: `Password can't be blank`}
    ).min(6, 'Password must have at least 6 character')
})

/**
 * @swagger
 * components:
 *   schemas:
 *     refreshTokenSchema:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           minLength: 10
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.token.example"
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(10, 'Refresh Token không hợp lệ')
});