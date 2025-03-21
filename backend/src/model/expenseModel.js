
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
       title: { type: String, required: true },
       date: { type: String, },
       user: { type: String, },
       amount: { type: Number, default: 0 },
       message:{ type: String, },
});

export default mongoose.model('Expense', expenseSchema);