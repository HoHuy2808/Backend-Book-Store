import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import dotenv from "dotenv";
import { Express } from 'express';

dotenv.config();
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [{ url: `http://localhost:${process.env.PORT}` }],
    },
    apis: ['./src/modules/**/*.router.ts', './src/modules/**/*.schema.ts'], // Path to API docs
}
export const swaggerDocs = swaggerJSDoc(swaggerOptions);
export function setupSwagger(app: Express): void {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    console.log(`Swagger docs: http://localhost:${process.env.PORT}/api-docs`)
}
