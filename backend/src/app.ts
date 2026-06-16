import express from 'express'
import dotenv from "dotenv"

import authRouter from './modules/auth/auth.router'
import { createServer } from 'http';
import { setupSwagger } from './swagger/swagger.config';
import helmet from 'helmet';
// import bookRouter from './modules/books/books.router'
// import orderRouter from './modules/orders/orders.router'
// import reviewRouter from './modules/reviews/reviews.router'

dotenv.config()

const app = express();
const httpServer = createServer(app);

app.use(helmet());
app.use(express.json());

// API Routers
app.use(`/api/auth`, authRouter)
// app.use(`/api/books`,bookRouter)
// app.use(`/api/orders`,orderRouter)
// app.use(`/api/reviews`,reviewRouter)

// Swagger docs
setupSwagger(app);

// ─── Start Server ─────────────────────────────
httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  console.log(`Swagger docs: http://localhost:${process.env.PORT}/api-docs`);
});

export default app;