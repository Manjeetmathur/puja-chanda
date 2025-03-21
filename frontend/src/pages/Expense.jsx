import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { expenseuri, uri } from '../backend/Uri';
import ExpenseDetails from './ExpenseDetails';

const Expense = () => {
       // Sample static data (you can replace this with dynamic data via props or API)

       const [expenses, setExpense] = useState([])


       useEffect(() => {
              axios.get(`${expenseuri}/get-expense`)
                     .then(response => {
                            setExpense(response.data.expenses);
                            // setSt(true);
                     })
                     .catch(error => console.error('Error fetching users:', error));
       }, []);
       // console.log(expenses.expenses)

       let totalExpens = 0;
       expenses.map((e) => { totalExpens += e.amount })
       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50 flex flex-col items-center py-12 px-1">
                     {/* Heading */}
                     <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-10 relative animate-fade-in">
                            व्यय विवरण
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
                     </h1>

                     {/* Expense List */}
                     <div className="w-full max-w-3x shadow-xl rounded-xl p-6 animate-fade-in delay-200">
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
                                                               { expense.user.length > 3 && <p className='text-yellow-400'>नाम: {expense.user}</p>}
                                                               { expense.message.length > 3 &&
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
                     <span className='text-gray-900  text-xl font-bold my-6'>💰 कुल ख़र्च : {totalExpens}</span>

              </div>
       );
};

export default Expense;