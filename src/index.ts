import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import dealsRoutes from './routes/deals';
import connectDb from './db';
import morgan from 'morgan'
dotenv.config();
connectDb()
const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);


app.use(cors({ origin:"*" }));
// app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',') }));
app.use(express.json());
app.use(morgan('dev'))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Sales Tracking API');
});
app.use('/api/auth', authRoutes);
app.use('/api/deals', dealsRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});