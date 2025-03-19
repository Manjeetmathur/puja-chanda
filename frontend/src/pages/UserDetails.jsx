import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { uri } from '../backend/Uri';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${uri}/id?id=${id}`)
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600 animate-pulse">
        <svg className="animate-spin h-6 w-6 mr-3 text-orange-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
        </svg>
        लोड हो रहा है...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-gray-50 flex flex-col items-center py-10 px-4">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-8 relative animate-fade-in">
        आपकी जानकारी
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
      </h1>

      {/* User Details Card */}
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-6 animate-fade-in delay-200">
        <ul className="space-y-4">
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">नाम :</span>
            <span className="text-md text-gray-700">{user.name}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">फोन नंबर :</span>
            <span className="text-md text-gray-700">{user.phone}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">पिछला पूजा चंदा (2024) :</span>
            <span className="text-md text-gray-700">₹{user.pichhlapujaChanda}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">पूजा चंदा (2025) :</span>
            <span className="text-md text-gray-700">₹{user.pujaChanda}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">खाना चंदा (2025) :</span>
            <span className="text-md text-gray-700">₹{user.khanaChanda}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">कुल चंदा :</span>
            <span className="text-md text-gray-700 font-semibold">₹{user.total}</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">पूजा Paid :</span>
            <span className={`text-md ${user.pujaPaid ? 'text-green-600' : 'text-red-600'}`}>
              {user.pujaPaid ? "☑ हां" : "❌ नहीं"}
            </span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">खाना Paid :</span>
            <span className={`text-md ${user.khanaPaid ? 'text-green-600' : 'text-red-600'}`}>
              {user.khanaPaid ? "☑ हां" : "❌ नहीं"}
            </span>
          </li>
          <li className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">Paid दिनांक :</span>
            <span className="text-md text-gray-700">{user.date || "N/A"}</span>
          </li>
        </ul>

        {/* Conditional Payment Info */}
        {!user.pujaPaid  && !user.khanaPaid &&
          <div className="mt-8 text-center space-y-4">
            <p className="text-lg text-blue-700 font-medium">
              इस वर्ष मां मथुरासिनी पूजा का चंदा ₹275 रखा गया है
            </p>
            <p className="text-lg text-blue-700 font-medium">
              🙏🏻 कृपया पिछले वर्ष के चंदे में कम से कम ₹20 बढ़ाकर इस वर्ष का चंदा दें
            </p>
            <p className="text-lg text-blue-700 font-medium">
              और सामूहिक भोजन में बड़ों के प्रति व्यक्ति ₹70 और बच्चों के लिए ₹40 की राशि तय की गई
            </p>
            <Link
              to={`/pay/${user._id}`}
              className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
            >
              चंदा जमा करें ➡
            </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default UserDetails;