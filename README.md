# MERN Authentication API - Week 3

A full-stack MERN backend implementing JWT authentication, real-time task synchronization using Socket.IO, and Cloudinary avatar uploads.

## Live Links

- GitHub Repository: https://github.com/sumaanafzal07-bot/mern-auth-api
- Live Backend: https://mern-auth-api-production-3810.up.railway.app
- Live Swagger API Documentation: https://mern-auth-api-production-3810.up.railway.app/api-docs
- Live Frontend: https://user-portal-pi-two.vercel.app/login

## Features

### Authentication
- User registration
- User login
- JWT authentication
- Protected profile endpoint

### Real-Time Tasks
- Create tasks
- Retrieve authenticated user's tasks
- Update task status
- Socket.IO real-time task synchronization
- User-specific Socket.IO rooms
- Real-time `taskCreated` and `taskUpdated` events

### Avatar Upload
- Multipart/form-data image upload
- Multer for handling uploaded files
- Cloudinary cloud storage
- Secure Cloudinary image URLs
- Protected avatar upload endpoint

### API Documentation
- OpenAPI 3.0 documentation
- Swagger UI
- Authentication, task and avatar endpoints documented

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Socket.IO
- Multer
- Cloudinary
- Swagger / OpenAPI
- Zod
- CORS
- Nodemon

## Project Structure

```text
mern-auth-api/
│
├── config/
│   ├── cloudinary.js
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models/
│   ├── Task.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── avatarRoutes.js
│   └── taskRoutes.js
│
├── sockets/
│   └── taskSocket.js
│
├── server.js
├── swagger.js
├── package.json
└── README.md