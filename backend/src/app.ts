import express from 'express'
import dotenv from "dotenv"

import authRouter from './modules/auth/auth.router'
// import bookRouter from './modules/books/books.router'
// import orderRouter from './modules/orders/orders.router'
// import reviewRouter from './modules/reviews/reviews.router'

dotenv.config()

const app = express();

app.use(express.json())

// API Routers
app.use(`/api/auth`, authRouter)
// app.use(`/api/books`,bookRouter)
// app.use(`/api/orders`,orderRouter)
// app.use(`/api/reviews`,reviewRouter)


app.listen(
    `${process.env.PORT}`,
    () => { console.log(`Server running on port: http://localhost:${process.env.PORT}`) }
)
