import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { uri } from '../backend/Uri';

const User = () => {
       const [users, setUsers] = useState([]);
       const [search, setSearch] = useState('');

       useEffect(() => {
              axios.get(`${uri}/all-users`)
                     .then(response => setUsers(response.data))
                     .catch(error => console.error('Error fetching users:', error));
       }, []);

       const filteredUsers = users.filter(user => 
              user.name.toLowerCase().includes(search.toLowerCase())
       );

       return (
              <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
                     <h1 className='text-2xl font-extrabold text-orange-600 mb-5'>मां मथुरासिनी पूजा चंदा</h1>
                     <div className="w-full max-w-2xl mb-4">
                            <input 
                                   type="text" 
                                   placeholder='यूजर खोजें' 
                                   value={search} 
                                   onChange={(e) => setSearch(e.target.value)}
                                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                     </div>
                     <ul className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-5'>
                            <li className='text-lg font-semibold border-b pb-2 mb-3'>नाम</li>
                            {filteredUsers.map(user => (
                                   <div key={user._id} className="flex justify-between items-center py-2 border-b">
                                          <li className='text-md text-gray-700'>{user.name}</li>
                                          <Link to={`/user/${user._id}`} className='text-blue-500 hover:underline'>See Details ➡</Link>
                                   </div>
                            ))}
                     </ul>
              </div>
       );
};

export default User;
