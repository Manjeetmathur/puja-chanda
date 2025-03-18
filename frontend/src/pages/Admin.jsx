import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { uri } from '../backend/Uri';

const Admin = () => {
       const [users, setUsers] = useState([]);
       const [name, setName] = useState('');
       const [search, setSearch] = useState('');

       useEffect(() => {
              axios.get(`${uri}/all-users`)
                     .then(response => setUsers(response.data))
                     .catch(error => console.error('Error fetching users:', error));
       }, []);

       const createUser = async () => {
              await axios.post(`${uri}/create-user`, { name }).then(() => { window.location.reload(); });
       };

       const filteredUsers = users.filter(user => 
              user.name.toLowerCase().includes(search.toLowerCase())
       );

       return (
              <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
                     <h1 className='text-2xl font-bold text-orange-600 mb-6'>Admin Dashboard</h1>
                     <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                            <h2 className='text-lg font-semibold text-gray-700 mb-3'>Create User</h2>
                            <div className="flex gap-3">
                                   <input 
                                          type="text" 
                                          placeholder='Enter name' 
                                          value={name} 
                                          onChange={(e) => setName(e.target.value)}
                                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                   />
                                   <button 
                                          onClick={createUser} 
                                          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
                                          Create
                                   </button>
                            </div>
                     </div>
                     <div className="w-full max-w-3xl mt-6">
                            <input 
                                   type="text" 
                                   placeholder='Search user by name' 
                                   value={search} 
                                   onChange={(e) => setSearch(e.target.value)}
                                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                     </div>
                     <ul className='w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6 border border-gray-200'>
                            <li className="font-bold text-lg text-gray-700 border-b pb-2 mb-3">Users</li>
                            {filteredUsers.map(user => (
                                   <div className="flex justify-between items-center border-b py-3" key={user._id}>
                                          <span className="text-gray-800 font-medium">{user?.name}</span>
                                          <Link 
                                                 to={`/update/${user._id}`} 
                                                 className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                                                 Update Info
                                          </Link>
                                   </div>
                            ))}
                     </ul>
              </div>
       );
};

export default Admin;
