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
              return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Loading...</div>;
       }

       return (
              <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
                     <h1 className='text-3xl font-extrabold text-orange-600 mb-5'>आपकी जानकारी</h1>
                     <ul className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-5'>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'>नाम :</h1>
                                   <span className='text-md text-gray-700'>{user.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'>फोन नंबर :</h1>
                                   <span className='text-md text-gray-700'>{user.phone}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'>पिछला पूजा चंदा (2024)
                                          :</h1>
                                   <span className='text-md text-gray-700'>₹{user.pichhlapujaChanda}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'> पूजा चंदा (2025)
                                          :</h1>
                                   <span className='text-md text-gray-700'>₹{user.pujaChanda}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'> खाना चंदा (2025)
                                          :</h1>
                                   <span className='text-md text-gray-700'>₹{user.khanaChanda}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'> कुल चंदा
                                          :</h1>
                                   <span className='text-md text-gray-700'>₹{user.total}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'>Paid पूजा :</h1>
                                   <span className='text-md text-gray-700'>{user.pujaPaid ? "हां" : "नहीं"}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'>Paid खाना :</h1>
                                   <span className='text-md text-gray-700'>{user.khanaPaid ? "हां" : "नहीं"}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'>Paid दिनांक :</h1>
                                   <span className='text-md text-gray-700'>{user.date} </span>
                            </div>

                            {user.pujaChanda == 0 && <div className="mt-5 text-center">
                                   <p className='text-xl text-blue-700 my-5'>इस वर्ष मां मथुरासिनी पूजा का चंदा  ₹275 रखा गया है </p>
                                   <p className='text-xl text-blue-700 my-5'>🙏🏻  कृपया पिछले वर्ष के चंदे में कम से कम ₹20 बढ़ाकर इस वर्ष का चंदा दें</p>
                                   <p className='text-xl text-blue-700 my-5'>और सामूहिक भोजन में बड़ों के प्रति व्यक्ति ₹70 और बच्चों के लिए ₹40 की राशि तय की गई</p>
                                   <Link to={`/pay/${user._id}`} className='text-white bg-green-500 px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition'>चंदा जमा करें ➡</Link>
                                   
                            </div>
                            }
                     </ul>
              </div>
       );
};

export default UserDetails;