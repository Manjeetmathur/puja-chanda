import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
       path:"./.env"
});
import userRoutes from './routes/userRoutes.js';
import expenseRouter from './routes/expenseRouter.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors(
       {
              origin:["https://puja-chanda.vercel.app","http://localhost:5173"],
              credentials:true
       }
));

// // Routes
app.use('/user', userRoutes);
app.use('/expense', expenseRouter);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));