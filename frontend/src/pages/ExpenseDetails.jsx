import React from 'react'

const ExpenseDetails = ({ expense }) => {
       console.log(expense)
       return (
              <div>
                     <li
                            className={`flex justify-between items-center pb-1 border-b border-gray-100 hover:bg-orange-50 transition-all duration-200`}

                     >
                            <span className="text-md w-[150px] text-blue-700">{expense.title}</span>
                            <span className="text-md w-[80px] text-green-700 font-semibold">₹{expense.amount}</span>
                            <span className="text-md mr-2 text-yellow-700">{expense.date}</span>
                     </li>
              </div>
       )
}

export default ExpenseDetails
