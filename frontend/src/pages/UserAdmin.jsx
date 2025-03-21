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
let count=1;
const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
 
  const getUser = () => {
       axios.get(`${uri}/all-users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }
   
  useEffect(() => {
    getUser()
  }, []);

  const createUser = async () => {
    await axios.post(`${uri}/create-user`, { name }).then(() => { getUser() 
       setName('')
    });
  };

  const filteredUsers = users.filter(user => {
    const userName = user.name.toLowerCase();
    const transliteratedName = transliterate(user.name).toLowerCase();
    const query = search.toLowerCase();
    return userName.includes(query) || transliteratedName.includes(query);
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-gray-50 flex flex-col items-center py-12 px-4">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-10 relative animate-fade-in">
        Admin Dashboard
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
      </h1>

      {/* Create User Section */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 mb-8 border border-gray-100 animate-fade-in delay-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create User</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-800 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={createUser}
            className="px-3 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            Create
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-3xl mb-8">
        <input
          type="text"
          placeholder="🔍 Search user by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-800 bg-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* User List */}
      <ul className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-6 border border-gray-100 animate-fade-in delay-300">
        <li className="font-bold text-lg text-gray-800 border-b-2 border-orange-200 pb-3 mb-4 flex justify-between">
          <span>Users</span>
          <span>Actions</span>
        </li>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user,idx) => (
            <li
              key={user._id}
              className="flex justify-between items-center py-3 border-b border-gray-100 hover:bg-orange-50 transition-all duration-200"
            >
              <span className="text-gray-800 font-medium">{idx+1}. {user?.name}</span>
              <Link
                to={`/update/${user._id}`}
                className="px-2 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
              >
                Update 
              </Link>
            </li>
          ))
        ) : (
          <li className="text-md text-gray-500 text-center py-4">No users found</li>
        )}
      </ul>
    </div>
  );
};

export default UserAdmin;