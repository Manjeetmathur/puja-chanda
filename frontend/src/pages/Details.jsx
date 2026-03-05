import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { uri } from '../backend/Uri';
import axios from 'axios';

const AVAILABLE_YEARS = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

const Details = () => {
       const [searchParams, setSearchParams] = useSearchParams();
       const yearFromUrl = searchParams.get('year');
       const initialYear = yearFromUrl && AVAILABLE_YEARS.includes(yearFromUrl) ? yearFromUrl : "2025";
       const [users, setUsers] = useState([]);
       const [st, setSt] = useState(false);
       const [selectedYear, setSelectedYear] = useState(initialYear);

       useEffect(() => {
              setSelectedYear(initialYear);
       }, [initialYear]);

       useEffect(() => {
              setSt(false);
              axios.get(`${uri}/all-users`, { params: { year: selectedYear } })
                     .then(response => {
                            setUsers(response.data);
                            setSt(true);
                     })
                     .catch(error => console.error('Error fetching users:', error));
       }, [selectedYear]);

       const total = users.reduce((sum, u) => sum + (Number(u.pujaChanda) || 0), 0);
       const bhojantotal = users.reduce((sum, u) => sum + (Number(u.khanaChanda) || 0), 0);
       const grandTotal = total + bhojantotal;

       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-100 to-gray-50 flex flex-col items-center pb-10 pt-4 px-4">
                    
                     {/* Year selector - same as User.jsx, totals from year table */}
                     <div className="w-full max-w-lg mb-4 flex items-center justify-center gap-3">
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

                     {st ? (
                            <ul className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 animate-fade-in delay-200">
                                   <li className="text-lg font-semibold text-gray-800 border-b-2 border-orange-200 pb-3 mb-4 flex justify-between">
                                          <span>नाम</span>
                                          <span className="ml-20">पूजा</span>
                                          <span>भोजन</span>
                                   </li>
                                   {users.length > 0 ? (
                                          users.map((user, index) => (
                                                 <li
                                                        key={user?._id}
                                                        className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-orange-50 transition-all duration-200"
                                                 >
                                                        <span className={`${(Number(user.pujaChanda) || 0) === 0 ? "text-yellow-500" : "text-blue-500"} text-md w-[120px]`}>
                                                               {index + 1}. {user.name}
                                                        </span>
                                                        <span className={`${(Number(user.pujaChanda) || 0) === 0 ? "text-yellow-500" : "text-blue-500"} text-md`}>
                                                                {user.pujaChanda ?? 0}
                                                        </span>
                                                        <span className={`${(Number(user.khanaChanda) || 0) === 0 ? "text-yellow-500" : "text-blue-500"} text-md`}>
                                                              {user.khanaChanda ?? 0}
                                                        </span>
                                                 </li>
                                          ))
                                   ) : (
                                          <li className="text-md text-gray-500 text-center py-4">कोई परिणाम नहीं मिला</li>
                                   )}
                                   <li className="text-lg font-semibold text-gray-800 border-b-2 border-orange-200 pb-3 my-4 flex justify-between">
                                          <span className="w-[100px]">कुल</span>
                                          <span>₹ {total}</span>
                                          <span>₹ {bhojantotal}</span>
                                   </li>
                                   <li className="font-bold text-gray-800 border-b-2 border-orange-200 pb-3 my-4">
                                          कुल योग: ₹ {grandTotal}
                                   </li>
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

export default Details;
