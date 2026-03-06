import expense from '../model/expenseModel.js';

export const createexpense = async (req, res) => {
  try {
    const { title, date, user, amount, message, year } = req.body;
    const expenseYear = (year && String(year).trim()) || '2025';
    const newexpense = new expense({
      title,
      date: date ?? '',
      user: user ?? '',
      amount: amount ?? 0,
      message: message ?? '',
      year: expenseYear
    });
    await newexpense.save();
    res.status(201).json({ message: 'Expense created successfully', expense: newexpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getexpense = async (req, res) => {
  try {
    const year = req.query.year && String(req.query.year).trim();
    const query = year ? { year } : {};
    const expenses = await expense.find(query).lean();
    res.status(200).json({ message: 'OK', expenses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await expense.findByIdAndDelete(id);
    res.json('deleted');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
