import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js'; // Import the connectDB function
import { userRoute } from './routes/userRoute.js';
import residencyRoute from './routes/residencyRoute.js';
import testRoute from './routes/testRoute.js';
import userRoutes from './routes/userRoutes.js';
import residencyRoutes from './routes/residencyRoutes.js'; //


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use('/api/users', userRoute);
app.use('/api/residencies', residencyRoute);
app.use('/api/test', testRoute);
app.use('/api/users', userRoutes);
app.use('/api/residencies', residencyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});