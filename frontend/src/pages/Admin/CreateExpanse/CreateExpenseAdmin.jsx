import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { expenseuri } from '../../../backend/Uri.js';

const AVAILABLE_YEARS = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const ExpenseAdmin = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [expenses, setExpense] = useState([]);
  const year = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(year);
  const [listLoading, setListLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const getExpense = () => {
    setListLoading(true);
    axios
      .get(`${expenseuri}/get-expense`, { params: { year: selectedYear } })
      .then((response) => {
        setExpense(response.data.expenses ?? []);
        setListLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
        setListLoading(false);
      });
  };

  useEffect(() => {
    getExpense();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetch when selectedYear changes only
  }, [selectedYear]);

  const createExpense = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try {
      const expenseData = { title, amount, date, user: name, message, year: selectedYear };
      await axios.post(`${expenseuri}/create-expense`, expenseData);
      getExpense();
      setTitle('');
      setAmount('');
      setDate('');
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Error creating expense:', error);
    } finally {
      setSaving(false);
    }
  };

  const deleteExpense = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${expenseuri}/delete-expense/${id}`);
      getExpense();
    } catch (error) {
      console.error('Error deleting expense:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const totalExpens = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-gray-50 flex flex-col items-center py-8 px-4">
      {/* Header with back link */}
      <div className="w-full max-w-xl mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-orange-600">
          नया खर्च लिखें
        </h1>
        <Link
          to="/expense"
          className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          खर्च की जानकारी
        </Link>
      </div>

      {/* Year selector + summary table */}
      <div className="w-full max-w-xl mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">वर्ष (Year):</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white font-medium text-orange-600"
          >
            {AVAILABLE_YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <span className="text-xs text-gray-500">वर्ष {selectedYear} के अनुसार</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
          <span className="text-sm text-gray-600">कुल खर्च: </span>
          <span className="font-semibold text-orange-600">₹{totalExpens}</span>
        </div>
      </div>

      {/* Create form card */}
      <div className="w-full max-w-xl bg-white shadow rounded-lg p-5 mb-6 border border-gray-100">
        <h2 className="text-md font-semibold text-gray-700 mb-4">नया व्यय जोड़ें</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">खर्च (विवरण)</label>
            <input
              type="text"
              placeholder="खर्च का नाम लिखें"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">राशि (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">दिनांक</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="दिनांक"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">नाम (वैकल्पिक)</label>
            <input
              type="text"
              placeholder="नाम"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">टिप्पणी (वैकल्पिक)</label>
            <input
              type="text"
              placeholder="टिप्पणी"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
            />
          </div>
          <button
            onClick={createExpense}
            disabled={saving || !title.trim()}
            className="w-full py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow hover:from-green-600 hover:to-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {saving ? 'सेव हो रहा है...' : 'व्यय बनाएं'}
          </button>
        </div>
      </div>

      {/* Expense list card */}
      <div className="w-full max-w-xl">
        <h2 className="text-md font-semibold text-gray-700 mb-3">इस वर्ष के खर्च</h2>
        {listLoading ? (
          <div className="flex items-center justify-center gap-3 text-gray-600 animate-pulse py-12 bg-white rounded-lg shadow">
            <div className="w-5 h-5 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            लोड हो रहा है...
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
            <div className="flex justify-between items-center px-4 py-3 border-b font-semibold text-sm text-gray-700 bg-gray-50">
              <span className="flex-1 min-w-0">खर्च</span>
              <span className="w-16 text-center shrink-0">राशि</span>
              <span className="w-20 text-right shrink-0">दिनांक</span>
              <span className="w-20 text-center shrink-0">क्रिया</span>
            </div>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <div
                  key={expense._id || index}
                  className="flex justify-between items-center px-4 py-3 border-b border-gray-100 hover:bg-orange-50 text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-blue-700 font-medium">{expense.title || '—'}</span>
                    {(expense.user && expense.user.length > 0) && (
                      <p className="text-xs text-gray-500">नाम: {expense.user}</p>
                    )}
                    {(expense.message && expense.message.length > 0) && (
                      <p className="text-xs text-pink-600 truncate max-w-[200px]">{expense.message}</p>
                    )}
                  </div>
                  <span className="w-16 text-center text-green-700 font-semibold shrink-0">₹{expense.amount ?? 0}</span>
                  <span className="w-20 text-right text-yellow-700 text-xs shrink-0">{expense.date || '—'}</span>
                  <div className="w-20 flex justify-center shrink-0">
                    <button
                      type="button"
                      onClick={() => deleteExpense(expense._id)}
                      disabled={deletingId === expense._id}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {deletingId === expense._id ? '...' : 'हटाएं'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                कोई व्यय विवरण उपलब्ध नहीं
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseAdmin;
