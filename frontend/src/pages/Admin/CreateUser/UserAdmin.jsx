import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { uri } from '../../../backend/Uri';

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

const UserAdmin = () => {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  const getUser = () => {
    axios.get(`${uri}/all-users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getUser()
  }, [])

  const createUser = async () => {
    if (!name.trim()) return;

    await axios.post(`${uri}/create-user`, { name });
    setName('')
    getUser()
  }

  const filteredUsers = users?.filter(user => {
    const userName = user.name.toLowerCase()
    const transliteratedName = transliterate(user.name).toLowerCase()
    const query = search.toLowerCase()

    return userName.includes(query) || transliteratedName.includes(query)
  })

  return (

    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 sm:p-6 p-2">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto mb-0 text-center">

        <h1 className="text-xl font-extrabold text-orange-600 tracking-wide">
          🙏 User Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage users and update records
        </p>

      </div>


      {/* CREATE USER CARD */}

      <div className="bg-white rounded-2xl my-3 p-2 ">

        <h2 className="text-md font-semibold mb-4 text-gray-700">
          Create New User
        </h2>

        <div className="flex flex-row gap-3">

          <input
            type="text"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <button
            onClick={createUser}
            className="w-fit bg-orange-500 text-white px-2 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Create
          </button>

        </div>

      </div>


      {/* SEARCH */}

      <div className="max-w-4xl mx-auto mb-6">

        <input
          type="text"
          placeholder="🔍 Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        />

      </div>


      {/* USER TABLE */}

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>

              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length > 0 ? (

              filteredUsers.map((user, idx) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-orange-50 transition"
                >

                  <td className="p-3 font-semibold">
                    {idx + 1}
                  </td>

                  <td className="p-3 text-gray-700 font-medium">
                    {user.name}
                  </td>

                  <td className="p-3 text-center">

                    <Link
                      to={`/update/${user._id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
                    >

                      Update

                    </Link>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="3" className="text-center p-6 text-gray-400">
                  No users found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default UserAdmin;