import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Personal API",
      version: "1.0.0",
      description: "Book Store REST API Documentation",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development server",
      },
    ],

    tags: [
      {
        name: "Auth",
        description: "Authentication APIs",
      },
      {
        name: "Books",
        description: "Book management APIs",
      },
      {
        name: "Orders",
        description: "Order APIs",
      },
      {
        name: "Reviews",
        description: "Review APIs",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [{ bearerAuth: [] }],
  },

  apis: [
    "./src/modules/**/*.router.ts",
    "./src/modules/**/*.schema.ts",
  ],
};

const setupSwagger = swaggerJsdoc(options);

export { setupSwagger, swaggerUi };