import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { expenseuri, uri } from '../../../backend/Uri.js'; // Assuming you have a backend URI setup
import { useNavigate } from 'react-router-dom';
import ExpenseDetails from '../../ExpenseDetails.jsx';

const ExpenseAdmin = () => {
       const [title, setTitle] = useState('');
       const [amount, setAmount] = useState('');
       const [date, setDate] = useState('');
       const [name, setName] = useState('');
       const [message, setMessage] = useState(''); // For success/error feedback
       const navigate = useNavigate()
       const createExpense = async () => {
              try {
                     // date = date
                     // setDate(date+'/3/25')
                     const expenseData = { title, amount, date, user: name, message };
                     await axios.post(`${expenseuri}/create-expense`, expenseData); // Replace with your actual endpoint
                     // setMessage('Expense created successfully!');

                     // navigate("/admin")
                     // Clear inputs after successful submission
                     getExpense()
                     setTitle('');
                     setAmount('');
                     setDate('');
                     setName('');
                     setMessage('')

                     setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
              } catch (error) {
                     console.error('Error creating expense:', error);
                     setTimeout(() => setMessage(''), 3000);
              }
       };
       const deleteExpense = async (id) => {
              axios.delete(`${expenseuri}/delete-expense/id?id=${id}`).then(() => { getExpense()
              });
       };
       const [expenses, setExpense] = useState([])

       const getExpense = () => {
              axios.get(`${expenseuri}/get-expense`)
                     .then(response => {
                            setExpense(response.data.expenses);
                            // setSt(true);
                     })
                     .catch(error => console.error('Error fetching users:', error));
       }
       useEffect(() => {
getExpense()
       }, []);
       // console.log(expenses.expenses)

       let totalExpens = 0;
       expenses.map((e) => { totalExpens += e.amount })

       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50 flex flex-col items-center py-12 px-4">
                     {/* Heading */}
                     <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-10 relative animate-fade-in">
                            नया ख़र्च लिखें
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
                     </h1>

                     {/* Create Expense Form */}
                     <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 border border-gray-100 animate-fade-in delay-200">
                            <div className="space-y-6">
                                   {/* Input Fields */}
                                   <div className="flex flex-col gap-2">
                                          <label className="text-lg font-semibold text-gray-800"> ख़र्च </label>
                                          <input
                                                 type="text"
                                                 placeholder="Enter expense title"
                                                 value={title}
                                                 onChange={(e) => setTitle(e.target.value)}
                                                 className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                                          />
                                   </div>

                                   <div className="flex flex-col gap-2">
                                          <label className="text-lg font-semibold text-gray-800">राशि (₹)</label>
                                          <input
                                                 type="number"
                                                 placeholder="Enter amount"
                                                 value={amount}
                                                 onChange={(e) => setAmount(e.target.value)}
                                                 className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                                          />
                                   </div>

                                   <div className="flex flex-col gap-2">
                                          <label className="text-lg font-semibold text-gray-800">दिनांक</label>
                                          <input
                                                 type="string"
                                                 value={date}
                                                 onChange={(e) => setDate(e.target.value)}
                                                 placeholder='write date'
                                                 className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700"
                                          />
                                   </div>

                                   <div className="flex flex-col gap-2">
                                          <label className="text-lg font-semibold text-gray-800">नाम</label>
                                          <input
                                                 type="text"
                                                 placeholder="Enter name"
                                                 value={name}
                                                 onChange={(e) => setName(e.target.value)}
                                                 className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                                          />
                                   </div>

                                   <div className="flex flex-col gap-2">
                                          <label className="text-lg font-semibold text-gray-800">Comment</label>
                                          <input
                                                 type="text"
                                                 placeholder="Enter comment"
                                                 value={message}
                                                 onChange={(e) => setMessage(e.target.value)}
                                                 className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                                          />
                                   </div>

                                   {/* Submit Button */}
                                   <button
                                          onClick={createExpense}
                                          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
                                   >
                                          व्यय बनाएं
                                   </button>


                            </div>

                     </div>
                     <div className="w-full max-w-3x  py-6 ">
                            <ul className="space-y-6">
                                   {/* Header Row */}
                                   <li className="flex justify-between items-center py-3 hover:bg-orange-50 transition-all duration-200 border-t-2 border-b-2">
                                          <span className='text-blue-400 w-[150px]'>ख़र्च</span>
                                          <span className='text-green-700 w-[50px]'>राशि</span>
                                          <span className='text-yellow-700 w-[50px]'>दिनांक</span>
                                   </li>

                                   {/* Expense Items */}
                                   {expenses.length > 0 ? (
                                          expenses.map((expense, index) => (
                                                 <div key={index} className=" border-b-2 pb-2">

                                                        <ExpenseDetails expense={expense} />
                                                        <div className="flex flex-col justify-center items-center">
                                                               <button className='border-2 p-1 rounded-2xl px-5 my-2 bg-red-400 text-white font-semibold cursor-pointer' onClick={() => deleteExpense(expense._id)}>Delete</button>
                                                               {expense.user.length > 3 && <p className='text-yellow-400'>नाम: {expense.user}</p>}
                                                               {expense.message.length > 3 &&
                                                                      <p className='text-pink-700'>Comment : {expense.message || ""}</p>
                                                               }
                                                        </div>
                                                 </div>
                                          ))
                                   ) : (
                                          <li className="text-md text-gray-500 text-center py-4 col-span-4">
                                                 कोई व्यय विवरण उपलब्ध नहीं
                                          </li>
                                   )}
                            </ul>


                     </div>
              </div>
       );
};

export default ExpenseAdmin;