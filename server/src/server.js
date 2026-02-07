import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Employee Management API is running'
  });
});

app.use('/api/auth', authRoutes);          
app.use('/api/employees', employeeRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    });
});
