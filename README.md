# Backend Book Store

A backend API for an book store application, built with TypeScript, Prisma, and Swagger.

## 🚀 Features
- **Authentication (`/auth`):** Secure user registration and login.
- **Book Management (`/book`):** Browse, search, and manage bookstore inventory.
- **Order Processing (`/orders`):** Handle order creation, order updates, order delete.
- **API Documentation:** Fully documented interactive endpoints via Swagger.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Documentation:** Swagger

## 🗂️ Schema
<img width="2123" height="1001" alt="book_store (2)" src="https://github.com/user-attachments/assets/a493c87d-5c66-4962-8dca-747db188146b" />

---

## 💻 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install dependencies
`npm install`

### 2. Environment Setup
Copy the example environment file and fill in your database credentials:
`cp .env.example .env`
Open the newly created .env file and update your DATABASE_URL.

### 3. Docker
Run `docker compose up -d` to start the database.

### 4. Database Migration
Generate Prisma client:
`npx prisma generate`
Run Prisma migrations to set up your database schema:
`npx prisma migrate dev`

### 5. Run the Application
`npm run dev`

## 📖 API Documentation
Once the server is running, you can explore and test the API endpoints interactively using Swagger at:
http://localhost:3000/api-docs
(Note: Replace 3000 with your actual port number if different)
