import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { uri } from "../backend/Uri";

const AVAILABLE_YEARS = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];

const transliterate = (hindiText) => {
       const map = {
              'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
              'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ट': 't', 'ठ': 'th',
              'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n', 'प': 'p', 'फ': 'ph',
              'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
              'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au'
       };
       return hindiText.split('').map(char => map[char] || char).join('');
};

const User = () => {

       const [users, setUsers] = useState([]);
       const [st, setSt] = useState(false);
       const [search, setSearch] = useState('');
       const year = new Date().getFullYear();
       const [selectedYear, setSelectedYear] = useState(year);

       useEffect(() => {
              setSt(false);
              axios.get(`${uri}/all-users`, { params: { year: selectedYear } })
                     .then(res => {
                            setUsers(res.data);
                            setSt(true);
                     })
                     .catch(err => console.error(err));
       }, [selectedYear]);

       const filteredUsers = users.filter(user => {
              const name = user.name.toLowerCase();
              const translit = transliterate(user.name).toLowerCase();
              const q = search.toLowerCase();
              return name.includes(q) || translit.includes(q);
       });

       const total = users.reduce((sum, u) => sum + (Number(u.pujaChanda) || 0), 0);
       const bhojanTotal = users.reduce((sum, u) => sum + (Number(u.khanaChanda) || 0), 0);
       const grandTotal = total + bhojanTotal;

       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-100 to-gray-50 flex flex-col items-center pb-6 ">

                     
                     <div className="w-full p-2">

                            {/* Year selector + Totals from year table */}
                            <div className="w-full max-w-xl mb-4 flex flex-row items-center justify-between gap-3">
                                   <select
                                          value={selectedYear}
                                          onChange={(e) => setSelectedYear(e.target.value)}
                                          className="border border-gray-300 rounded-lg px-3 py-2 bg-white font-medium text-orange-600 mt-3"
                                   >
                                          {AVAILABLE_YEARS.map((y) => (
                                                 <option key={y} value={y}>{y}</option>
                                          ))}
                                   </select>
                                   <div className="mt-3 flex justify-center">
                                          <Link
                                                 to={`/details?year=${selectedYear}`}
                                                 className="inline-block bg-orange-500 text-white px-6 py-1.5 rounded-lg font-semibold hover:bg-orange-600 transition"
                                          >
                                                 View details
                                          </Link>
                                   </div>
                            </div>
                            <div className="w-full max-w-xl mb-6 overflow-x-auto">
                                   <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">

                                          <thead className="bg-white text-gray-700 border-b border-orange-600">
                                                 <tr>
                                                        <th className="px-3 py-2 text-center font-semibold">पूजा</th>
                                                        <th className="px-3 py-2 text-center font-semibold">भोजन</th>
                                                        <th className="px-3 py-2 text-center font-semibold">कुल</th>
                                                 </tr>
                                          </thead>

                                          <tbody>
                                                 <tr className="bg-white text-center font-semibold">
                                                        <td className="px-3 py-2 text-orange-600">₹ {total}</td>
                                                        <td className="px-3 py-2 text-orange-600">₹ {bhojanTotal}</td>
                                                        <td className="px-3 py-2 text-orange-700 text-base">₹ {grandTotal}</td>
                                                 </tr>
                                          </tbody>

                                   </table>
                                  

                            </div>

                            {/* Search */}
                            <div className="w-full max-w-xl mb-6 border-2 border-orange-500  rounded-lg">
                                   <input
                                          type="text"
                                          placeholder="🔍 अपना नाम खोजें"
                                          value={search}
                                          onChange={(e) => setSearch(e.target.value)}
                                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
                                   />
                            </div>

                            {/* User List */}
                            {st ? (
                                   <div className="w-full max-w-xl bg-white shadow rounded-lg">

                                          {/* Header */}
                                          <div className="flex justify-between px-4 py-3 border-b font-semibold text-sm text-gray-700">
                                                 <span>नाम</span>
                                                 <span>विवरण</span>
                                          </div>

                                          {filteredUsers.length > 0 ? (
                                                 filteredUsers.map((user, index) => (
                                                        <div
                                                               key={user._id}
                                                               className="flex justify-between items-center px-4 py-3 border-b hover:bg-orange-50 text-sm"
                                                        >

                                                               <Link to={`/user/${user._id}`}>
                                                                      <span className={`${user.pujaChanda === 0 ? "text-yellow-500" : "text-blue-600"
                                                                             }`}>
                                                                             {index + 1}. {user.name}
                                                                      </span>
                                                               </Link>

                                                               <Link
                                                                      to={`/user/${user._id}`}
                                                                      className="text-xs bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                                                               >
                                                                      Details
                                                               </Link>

                                                        </div>
                                                 ))
                                          ) : (
                                                 <div className="text-center py-6 text-gray-500 text-sm">
                                                        कोई परिणाम नहीं मिला
                                                 </div>
                                          )}

                                   </div>
                            ) : (
                                   <div className="flex items-center justify-center gap-3 text-gray-600 animate-pulse text-center">
                                          <div className="w-5 h-5 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                          लोड हो रहा है...
                                   </div>
                            )}

                     </div>
              </div>
       );
};

export default User;