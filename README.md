# 📚 Simple Book API

A simple RESTful API built with **Node.js**, **Express**, and **MongoDB (via Mongoose)** to manage a collection of books.  
This project is educational and demonstrates how to structure a minimal backend with validation, routing, and error handling.

---

## 🚀 Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for routing and middleware
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB (schema + validation)
- **dotenv** – Environment variable management
- **Nodemon** – Development tool for hot reloading

---

## 📦 Features

- Create, read, update, and delete books (CRUD API)
- Book schema includes:
  - `title` (required)
  - `author` (required)
  - `ISBN` (unique, validated for ISBN-10 or ISBN-13)
  - `publishedYear` (optional)
  - `pages` (optional)
- Centralized error handling middleware
- MongoDB connection via `mongoose`

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A running [MongoDB server](https://www.mongodb.com/try/download/community) (local or cloud/Atlas)

Install required dependencies:
```npm install express mongoose dotenv
npm install --save-dev nodemon```

Create a .env file in the root directory:
```MONGO_URI=mongodb://localhost:27017/booksdb
PORT=3000```
