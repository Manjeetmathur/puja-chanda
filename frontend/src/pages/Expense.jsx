import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { expenseuri } from '../backend/Uri';

const AVAILABLE_YEARS = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const transliterate = (text) => {
  const map = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ट': 't', 'ठ': 'th',
    'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'ph',
    'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
    'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'
  };
  return (text || '').split('').map(char => map[char] || char).join('');
};

const Expense = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const yearFromUrl = searchParams.get('year');
  const initialYear = yearFromUrl && AVAILABLE_YEARS.includes(yearFromUrl) ? yearFromUrl : new Date().getFullYear().toString();

  const [expenses, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState(initialYear);

  useEffect(() => {
    setSelectedYear(initialYear);
  }, [initialYear]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${expenseuri}/get-expense`, { params: { year: selectedYear } })
      .then((response) => {
        setExpense(response.data.expenses ?? []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      });
  }, [selectedYear]);

  const filteredExpenses = expenses.filter((e) => {
    const title = (e.title || '').toLowerCase();
    const user = (e.user || '').toLowerCase();
    const message = (e.message || '').toLowerCase();
    const translitTitle = transliterate(e.title || '').toLowerCase();
    const translitUser = transliterate(e.user || '').toLowerCase();
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return title.includes(q) || user.includes(q) || message.includes(q) || translitTitle.includes(q) || translitUser.includes(q);
  });

  const totalExpens = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-gray-50 flex flex-col items-center pb-6">
      <div className="w-full p-2">
        {/* Year selector */}
        <div className="w-full max-w-xl mb-4 flex flex-row items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">वर्ष (Year):</label>
            <select
              value={selectedYear}
              onChange={(e) => {
                const y = e.target.value;
                setSelectedYear(y);
                setSearchParams({ year: y });
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white font-medium text-orange-600"
            >
              {AVAILABLE_YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <span className="text-xs text-gray-500">वर्ष {selectedYear} के अनुसार</span>
          </div>
          <Link
            to={`/expense?year=${selectedYear}`}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            लिंक साझा करें
          </Link>
        </div>

        {/* Summary table (like User totals) */}
        <div className="w-full max-w-xl mb-6 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden bg-white">
            <thead className="bg-white text-gray-700 border-b border-orange-600">
              <tr>
                <th className="px-3 py-2 text-center font-semibold">कुल खर्च</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-center font-semibold">
                <td className="px-3 py-2 text-orange-600 text-lg">₹ {totalExpens}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Search */}
        <div className="w-full max-w-xl mb-6 border-2 border-orange-500 rounded-lg">
          <input
            type="text"
            placeholder="🔍 खर्च या नाम खोजें"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
          />
        </div>

        {/* Expense list */}
        {loading ? (
          <div className="flex items-center justify-center gap-3 text-gray-600 animate-pulse py-12">
            <div className="w-5 h-5 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            लोड हो रहा है...
          </div>
        ) : (
          <div className="w-full max-w-xl bg-white shadow rounded-lg overflow-hidden">
            <div className="flex justify-between px-4 py-3 border-b font-semibold text-sm text-gray-700 bg-gray-50">
              <span className="w-[140px]">खर्च</span>
              <span className="w-[70px] text-center">राशि</span>
              <span className="w-[80px] text-right">दिनांक</span>
            </div>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <div
                  key={expense._id || index}
                  className="flex justify-between items-center px-4 py-3 border-b border-gray-100 hover:bg-orange-50 text-sm"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-blue-700 font-medium">{expense.title || '—'}</span>
                    {(expense.user && expense.user.length > 0) && (
                      <p className="text-xs text-gray-500 mt-0.5">नाम: {expense.user}</p>
                    )}
                    {(expense.message && expense.message.length > 0) && (
                      <p className="text-xs text-pink-600 mt-0.5">{expense.message}</p>
                    )}
                  </div>
                  <span className="w-[70px] text-center text-green-700 font-semibold shrink-0">₹{expense.amount ?? 0}</span>
                  <span className="w-[80px] text-right text-yellow-700 text-xs shrink-0">{expense.date || '—'}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                {search.trim() ? 'कोई परिणाम नहीं मिला' : 'कोई व्यय विवरण उपलब्ध नहीं'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;
