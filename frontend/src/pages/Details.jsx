import React, { useEffect, useState } from 'react'
import { uri } from '../backend/Uri';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Details = () => {
       const [users, setUsers] = useState([]);
       const [st, setSt] = useState(false);
       const [search, setSearch] = useState('');

       useEffect(() => {
              axios.get(`${uri}/all-users`)
                     .then(response => {
                            setUsers(response.data);
                            setSt(true);
                     })
                     .catch(error => console.error('Error fetching users:', error));
       }, []);
       let total = 0;
       users.map(itm => {
              total += itm.pujaChanda
       })
       let bhojantotal = 0;
       users.map(itm => {
              // console.log(itm.khanaChanda)
              bhojantotal += itm.khanaChanda
       })
       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-100 to-gray-50 flex flex-col items-center py-10 px-4">
                     {/* Heading */}
                     <h1 className="text-xl md:text-4xl font-extrabold text-orange-600 mb-8 relative animate-fade-in">
                            मां मथुरासिनी पूजा चंदा
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
                     </h1>
                     
                     


                     {/* User List or Loading */}
                     {st ? (
                            <ul className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 animate-fade-in delay-200">
                                   <li className="text-lg font-semibold text-gray-800 border-b-2 border-orange-200 pb-3 mb-4 flex justify-between">
                                          <span>नाम</span>
                                          <span className='ml-20'>पूजा</span>
                                          <span>भोजन</span>
                                   </li>
                                   {users.length > 0 ? (
                                          users.map((user, index) => (
                                                 <li
                                                        key={user?._id}
                                                        className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-orange-50 transition-all duration-200 "
                                                 >
                                                        <span className="text-md text-gray-700 w-[120px]">
                                                               {index + 1}. {user.name}
                                                        </span>
                                                        <span className="text-md text-gray-700 text-end">
                                                                {user.pujaChanda}
                                                        </span>
                                                        <span className="text-md text-gray-700">
                                                              {user.khanaChanda}
                                                        </span>
                                                       
                                                 </li>
                                          ))
                                   ) : (
                                          <li className="text-md text-gray-500 text-center py-4">कोई परिणाम नहीं मिला</li>
                                   )}
                                   <li className="text-lg font-semibold text-gray-800 border-b-2 border-orange-200 pb-3 my-4 flex justify-between">
                                          <span className='w-[100px]'>कुल</span>
                                          <span>₹ {total}</span>
                                          <span>₹ {bhojantotal}</span>
                                   </li>
                                   <span></span>
                                   <span className="font-bold text-gray-800 border-b-2 border-orange-200 pb-3 my-4 flex justify-between">₹ {bhojantotal+total}</span>
                            </ul>
                     ) : (
                            <div className="flex items-center justify-center text-lg font-semibold text-gray-600 animate-pulse">
                                   <svg className="animate-spin h-6 w-6 mr-3 text-orange-600" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                                   </svg>
                                   लोड हो रहा है...
                            </div>
                     )}
              </div>
       )
}

export default Details
