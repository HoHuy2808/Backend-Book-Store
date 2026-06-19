// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from 'swagger-ui-express';
// import dotenv from "dotenv";
// import { Express } from 'express';

// dotenv.config();
// const options: swaggerJSDoc.Options ={
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'My API',
//             version: '1.0.0',
//             description: 'API documentation',
//         },
//         servers: [{ url: `http://localhost:${process.env.PORT}` }],
//     },
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT"
//         }
//       }
//     },

//     security: [
//       {
//         bearerAuth: []
//       }
//     ],
//     apis: ['./src/modules/**/*.router.ts', './src/modules/**/*.schema.ts'], // Path to API docs
// }
// export const swaggerDocs = swaggerJSDoc(options);
// export function setupSwagger(app: Express): void {
//     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
//     console.log(`Swagger docs: http://localhost:${process.env.PORT}/api-docs`)
// }

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv'
dotenv.config()

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal API',
      version: '1.0.0',
      description: 'Book Store REST API Documentation',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server',
      },
      // {
      //   url: `http://192.168.1.102:${process.env.PORT}`,
      //   description: 'Remote dev server',
      // },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.router.ts', './src/modules/**/*.schema.ts'],
};

const setupSwagger = swaggerJsdoc(options);

export { setupSwagger, swaggerUi };