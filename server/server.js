import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: false }));
app.use(express.json());
app.use(morgan('dev'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/idea_shop';
await mongoose.connect(MONGO_URI);

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Auth server running on ' + PORT));
