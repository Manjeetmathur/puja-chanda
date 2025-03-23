import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { vivahshulk } from '../backend/Uri';
import VivahShulkDetails from './Admin/Vivahshulk/VivahShulkdetails';

const Vivah = () => {
       const [users, setUser] = useState([]);

       const getUser = () => {
              axios.get(`${vivahshulk}/get-users`)
                     .then(response => setUser(response.data))
                     .catch(error => console.error('Error fetching users:', error.message));
       };

       useEffect(() => {
              getUser();
       }, []);

       let totalAmount = 0;
       users?.forEach((e) => { totalAmount += e.amount || 0; });

       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50 flex flex-col items-center py-6 px-2 sm:px-4">
                     <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-600 mb-8 relative animate-fade-in">
                            विवाह शुल्क विवरण
                            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 sm:w-36 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
                     </h1>

                     <div className="">
                            <ul className="space-y-4">

                                   {/* User Items */}
                                   {users?.length > 0 ? (
                                          users.map((user, index) => (

                                                 <VivahShulkDetails user={user} />

                                          ))
                                   ) : (
                                          <li className="text-xs sm:text-md text-gray-500 text-center py-6 sm:py-8">
                                                 कोई परिणाम उपलब्ध नहीं...
                                          </li>
                                   )}
                            </ul>

                            
                     </div>
              </div>
       );
};

export default Vivah;