import express from 'express'
import authRoute from './routes/auth.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js'
import cors from 'cors';
import profileRoute from './routes/profile.route.js'
import adminRoute from './routes/admin.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json({ limit: '5mb' }));

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// app.use('/uploads', express.static(path.join(import.meta.dirname, 'uploads')));

app.use('/api/auth',authRoute)
app.use('/api/profile',profileRoute)
app.use('/api/admin',adminRoute)

app.listen(PORT,()=>{
  console.log('Server running on PORT:',PORT)
  connectDB()
})