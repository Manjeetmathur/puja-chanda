import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { uri } from '../backend/Uri';

const User = () => {
       const [users, setUsers] = useState([]);

       useEffect(() => {
              axios.get(`${uri}/all-users`)
                     .then(response => setUsers(response.data))
                     .catch(error => console.error('Error fetching users:', error));
       }, []);

       return (
              <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
                     <h1 className='text-2xl font-extrabold text-orange-600 mb-5'>मां मथुरासिनी पूजा चंदा</h1>
                     <ul className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-5'>
                            <li className='text-lg font-semibold border-b pb-2 mb-3'>नाम</li>
                            {users.map(user => (
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