import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { vivahshulk } from '../../../backend/Uri.js'; // Assuming you have a backend URI setup
import { useNavigate } from 'react-router-dom';
import VivahShulkDetails from './VivahShulkdetails.jsx';

const Vivahshulk = () => {
       const [amount, setAmount] = useState('');
       const [marriageDate, setmarriageDate] = useState('');
       const [name, setName] = useState('');
       const [message, setMessage] = useState(''); // For success/error feedback
       const createUser = async () => {
              try {
                     const userData = { shulk: amount,  name, comment: message, marriageDate };
                     await axios.post(`${vivahshulk}/create-user`, userData); // Replace 
                     getUser()
                     setmarriageDate('');
                     setAmount('');
                     setName('');
                     setMessage('')

              } catch (error) {
                     console.error('Error creating expense:', error);
                     // setTimeout(() => setMessage(''), 3000);
              }
       };
       const deleteuser = async (id) => {
              axios.delete(`${vivahshulk}/delete-user/id?id=${id}`).then(() => {
                     getUser()
              });
       };
     
       const paidshulk = async(id) => {
              const date = new Date(Date.now()).toLocaleDateString('en-IN')
              console.log(date)
              
              await axios.post(`${vivahshulk}/paid-shulk`,{date,id})
              getUser()
       }
       const [users, setuser] = useState([])

       const getUser = () => {
              axios.get(`${vivahshulk}/get-users`)
                     .then(response => {
                            // console.log(re)
                            setuser(response.data);
                     })
                     .catch(error => console.error('Error fetching users:', error.message));
       }
       useEffect(() => {
              getUser()
       }, []);

       let totalamount = 0;
       users?.map((e) => { totalamount += e.amount })

       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50 flex flex-col items-center py-12 px-4">
                     {/* Heading */}
                     <h1 className="text-2xl  font-extrabold text-orange-600 mb-10 relative animate-fade-in">
                            नया विवाह शुल्क लिखें
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
                     </h1>

                     {/* Create Expense Form */}
                     <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 border border-gray-100 animate-fade-in delay-200">
                            <div className="space-y-6">
                                   {/* Input Fields */}
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
                                          <label className="text-lg font-semibold text-gray-800">  विवाह की तिथि</label>
                                          <input
                                                 type="text"
                                                 placeholder="Enter expense title"
                                                 value={marriageDate}
                                                 onChange={(e) => setmarriageDate(e.target.value)}
                                                 className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                                          />
                                   </div>

                                   <div className="flex flex-col gap-2">
                                          <label className="text-lg font-semibold text-gray-800">विवाह शुल्क (₹)</label>
                                          <input
                                                 type="number"
                                                 placeholder="Enter amount"
                                                 value={amount}
                                                 onChange={(e) => setAmount(e.target.value)}
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
                                          onClick={createUser}
                                          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
                                   >
                                          Create
                                   </button>


                            </div>

                     </div>
                     <div className="w-full max-w-3x  py-6 ">
                            <ul className="space-y-6">
                                   {/* Header Row */}
                                

                                   {/* Expense Items */}
                                   {users?.length > 0 ? (
                                          users?.map((user, index) => (
                                                 <div key={index} className=" border-b-2 pb-2">

                                                        <VivahShulkDetails user={user} />
                                                        <div className="flex flex-col justify-center items-center">
                                                              <div className="flex  gap-3">
                                                              <button
                                                                      onClick={()=>paidshulk(user._id)}
                                                                      className={`my-3 px-5 py-2 font-medium rounded-full shadow-sm transition-all duration-300 text-white ${user.paid ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} flex justify-center `}
                                                               >
                                                                      {user.paid ? 'Click to Unpaid' : 'Click to Paid'}
                                                               </button>
                                                               <button className='my-3 px-5 py-2 font-medium rounded-full shadow-sm transition-all duration-300 text-white bg-red-500 hover:bg-red-600' onClick={() => deleteuser(user._id)}>Delete</button>
                                                              </div>
                                                        </div>
                                                 </div>
                                          ))
                                   ) : (
                                          <li className="text-md text-gray-500 text-center py-4 col-span-4">
                                                 No Result available...
                                          </li>
                                   )}
                            </ul>


                     </div>
              </div>
       );
};

export default Vivahshulk;