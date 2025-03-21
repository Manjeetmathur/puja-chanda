import express from 'express';
import { createexpense, deleteExpense, getexpense } from '../controller/expensecontroller.js';

const router = express.Router();


router.post('/create-expense', createexpense);
router.delete('/delete-expense/:id', deleteExpense);
router.get('/get-expense', getexpense);

export default router