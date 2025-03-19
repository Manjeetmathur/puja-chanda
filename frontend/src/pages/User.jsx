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
       const [st, setst] = useState(false);
       const [search, setSearch] = useState('');
       
       useEffect(() => {
              axios.get(`${uri}/all-users`)
                     .then(response => {
                            setUsers(response.data);
                            setst(true);
                     })
                     .catch(error => console.error('Error fetching users:', error));
       }, []);

       const filteredUsers = users.filter(user => {
              const userName = user.name.toLowerCase();
              const transliteratedName = transliterate(user.name).toLowerCase();
              const query = search.toLowerCase();
              return userName.includes(query) || transliteratedName.includes(query);
       });

       return (
              <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
                     <h1 className='text-2xl font-extrabold text-orange-600 mb-5'>मां मथुरासिनी पूजा चंदा</h1>
                     <div className="w-full max-w-2xl mb-4">
                            <input 
                                   type="text" 
                                   placeholder='अपना नाम खोजें' 
                                   value={search} 
                                   onChange={(e) => setSearch(e.target.value)}
                                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                     </div>
                     {st ? (
                            <ul className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-5'>
                                   <li className='text-lg font-semibold border-b pb-2 mb-3'>नाम</li>
                                   {filteredUsers.map((user, index) => (
                                          <div key={user?._id} className="flex justify-between items-center py-2 border-b">
                                                 <li className='text-md text-gray-700'>{index + 1}. {user.name}</li>
                                                 <Link to={`/user/${user._id}`} className='text-blue-500 hover:underline'>See Details ➡</Link>
                                          </div>
                                   ))}
                            </ul>
                     ) : (
                            <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Loading...</div>
                     )}
              </div>
       );
};

export default User;
