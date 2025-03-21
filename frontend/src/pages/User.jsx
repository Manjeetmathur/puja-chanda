import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { uri } from '../backend/Uri';

const transliterate = (hindiText) => {
       const map = {
              'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
              'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ट': 't', 'ठ': 'th',
              'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'ph',
              'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's',
              'ह': 'h', 'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'
       };
       return hindiText.split('').map(char => map[char] || char).join('');
};

const User = () => {
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

       const filteredUsers = users.filter(user => {
              const userName = user.name.toLowerCase();
              const transliteratedName = transliterate(user.name).toLowerCase();
              const query = search.toLowerCase();
              return userName.includes(query) || transliteratedName.includes(query);
       });

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
                     <div className="flex gap-5 items-center justify-center mb-5">
                            <h1 className="text-lg md:text-4xl font-extrabold text-orange-600  relative animate-fade-in">
                                   💰 कुल पूजा चंदा : ₹ {total}
                            </h1>
                            <Link
                                   to={`/details`}
                                   className="text-blue-500 text-sm font-medium hover:text-orange-800 hover:underline transition-all duration-200  border-2 rounded-xl px-2"
                            >
                                   Details ➡
                            </Link>
                     </div>
                     <div className="flex gap-3 items-center justify-center mb-5">
                            <h1 className="text-lg md:text-4xl font-extrabold text-orange-600 m relative animate-fade-in">
                                   💰 कुल भोजन चंदा : ₹ {bhojantotal}

                            </h1>
                            <Link
                                   to={`/details`}
                                   className="text-blue-500 text-sm font-medium hover:text-orange-800 hover:underline transition-all duration-200  border-2 rounded-xl px-2"
                            >
                                   Details ➡
                            </Link>
                     </div>

                     <h1 className="text-lg md:text-4xl font-extrabold text-orange-600 mb-8 relative animate-fade-in">
                            💰 कुल चंदा : ₹ {total + bhojantotal}

                     </h1>

                     {/* Search Bar */}
                     <div className="w-full max-w-lg mb-8">
                            <input
                                   type="text"
                                   placeholder="🔍 अपना नाम खोजें"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                                   className="w-full p-3 border bg-white border-gray-700 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                            />
                     </div>

                     {/* User List or Loading */}
                     {st ? (
                            <ul className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 animate-fade-in delay-200">
                                   <li className="text-lg font-semibold text-gray-800 border-b-2 border-orange-200 pb-3 mb-4 flex justify-between">
                                          <span>नाम</span>
                                          <span>विवरण</span>
                                   </li>
                                   {filteredUsers.length > 0 ? (
                                          filteredUsers.map((user, index) => (
                                                 <li
                                                        key={user?._id}
                                                        className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-orange-50 transition-all duration-200"
                                                 >
                                                        <Link to={`/user/${user._id}`}>
                                                               <span className={` ${user.pujaChanda === 0 && 'text-yellow-400' }  text-md text-blue-500 w-[120px]`}>
                                                                      {index + 1}. {user.name}
                                                               </span>
                                                        </Link>
                                                        <Link
                                                               to={`/user/${user._id}`}
                                                               className="text-blue-600 font-medium hover:text-orange-800 hover:underline transition-all duration-200"
                                                        >
                                                               Details ➡
                                                        </Link>
                                                 </li>
                                          ))
                                   ) : (
                                          <li className="text-md text-gray-500 text-center py-4">कोई परिणाम नहीं मिला</li>
                                   )}
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
       );
};

export default User;