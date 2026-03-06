
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, default: '' },
  user: { type: String, default: '' },
  amount: { type: Number, default: 0 },
  message: { type: String, default: '' },
  year: { type: String, required: true }
});

expenseSchema.index({ year: 1 });

export default mongoose.model('Expense', expenseSchema);