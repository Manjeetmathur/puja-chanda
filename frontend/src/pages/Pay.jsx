import React, { useEffect } from 'react';
import p1 from "../assets/p2.jpg";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { uri } from '../backend/Uri';
const Pay = () => {
       const [user, setUser] = useState(null);
       const { id } = useParams();

       useEffect(() => {
              axios.get(`${uri}/id?id=${id}`)
                     .then(response => setUser(response.data))
                     .catch(error => console.error('Error fetching user:', error));
       }, [id]);

       if (!user) {
              return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Loading...</div>;
       }
       const sendSSt = () => {
              const phoneNumber = '6287773228';
              const message = encodeURIComponent(`नाम : ${user?.name}, Payment Screenshot`);
              window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            };

       return (
              <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
                     <h1 className='text-3xl font-extrabold text-orange-600 mb-5'>Scan to Pay</h1>
                     <img src={p1} alt="QR Code" className='h-[300px] w-64 rounded-lg shadow-lg mb-5 border border-gray-300' />
                     <h1 className='text-xl font-semibold text-gray-700'>  या... UPI से करें</h1>
                     <h1 className='text-lg font-medium text-gray-600 mb-5'>UPI ID: <span className='text-blue-600 font-bold'>6287773228-2@ybl</span></h1>
                     <button
                            onClick={sendSSt}
                            className='bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition'>
                            Screenshot 📷 WhatsApp में भेजने किए click करें ➡
                     </button>
              </div>
       );
};

export default Pay;