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
                                   <h1 className='font-bold text-gray-800'> पूजा चंदा
                                    :</h1>
                                   <span className='text-md text-gray-700'>₹{user.pujaChanda}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b">
                                   <h1 className='font-bold text-gray-800'> खाना चंदा
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
                            <div className="mt-5 text-center">
                                   <Link to={`/pay/${user._id}`} className='text-white bg-green-500 px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition'>चंदा जमा करें ➡</Link>
                            </div>
                     </ul>
              </div>
       );
};

export default UserDetails;