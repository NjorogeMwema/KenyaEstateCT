
# Backend Documentation

## Overview

This documentation provides an overview of the backend structure for the RealEstate project. It includes details about the server setup, routes, database configuration, and environment variables.

## Folder Structure

```
backend/
├── config/
│   └── auth0Config.js
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRoute.js
├── prisma/
│   └── schema.prisma
├── .env
├── index.js
├── package.json
└── README.md
```

## Configuration

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```
DATABASE_URL=mongodb://localhost:27017/realestate
ISSUER_BASE_URL=https://your-issuer-base-url
ISSUER=https://your-issuer
JWKS_URI=https://your-jwks-uri
SECRET=your-secret
PORT=8000
```

### Auth0 Configuration

Create a file named `auth0Config.js` in the `config` folder:

```javascript
// config/auth0Config.js
import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  issuer: process.env.ISSUER,
  jwksUri: process.env.JWKS_URI,
  secret: process.env.SECRET
});

export default jwtCheck;
```

## Server Setup

### Main Server File

Create a file named `index.js` in the root of your project:

```javascript
// index.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import jwtCheck from './config/auth0Config.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(jwtCheck);

// Use user routes
app.use('/api/user', userRoute);

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

## Routes

### User Routes

Create a file named `userRoute.js` in the `routes` folder:

```javascript
// routes/userRoute.js
import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Registration endpoint
router.post('/register', registerUser);

export default router;
```

## Controllers

### User Controller

Create a file named `userController.js` in the `controllers` folder:

```javascript
// controllers/userController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received request:', req.body);

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });

    console.log('User registered successfully:', newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
```

## Models

### User Model

Create a file named `userModel.js` in the `models` folder:

```javascript
// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
```

## Prisma

### Prisma Schema

Create a file named `schema.prisma` in the `prisma` folder:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

### Generate Prisma Client

Run the following command to generate the Prisma client:

```sh
npx prisma generate
```

## Testing the Endpoint

Use a tool like Thunder Client, Postman, or cURL to test the registration endpoint. Make sure you are sending a POST request to the correct URL:

```sh
curl -X POST http://localhost:8000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john.doe@example.com", "password": "password123"}'
```

---
