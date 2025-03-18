import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { phone } from '../../../backend/src/controller/userController';
import { uri } from '../backend/Uri';

const Update = () => {
       const [user, setUser] = useState(null);
       const { id } = useParams();
       const [phoneNo, setPhoneNo] = useState('');
       const [khanaChanda, setKhanaChanda] = useState('');
       const [pujaChanda, setPujaChanda] = useState('');
       const [date, setDate] = useState('');

       useEffect(() => {
              axios.get(`${uri}/id?id=${id}`)
                     .then(response => setUser(response.data))
                     .catch(error => console.error('Error fetching user:', error));
       }, [id]);

       if (!user) {
              return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Loading...</div>;
       }

       const togglepuja = () => {
              axios.post(`${uri}/paypuja/id?id=${user._id}`)
                     .then(() => window.location.reload())
                     .catch(error => console.error('Error updating payment:', error));
       };
       const togglekhana = () => {
              axios.post(`${uri}/paykhana/id?id=${user._id}`)
                     .then(() => window.location.reload())
                     .catch(error => console.error('Error updating payment:', error));
       };
       const Phone = () => {
              axios.post(`${uri}/phone/id?id=${user._id}`, { phone: phoneNo })
                     .then(() => {
                            setUser({ ...user, phoneNo: user.phone })
                            window.location.reload()
                     })
                     .catch(error => console.error('Error updating payment:', error));
       };
       const khana = () => {
              axios.post(`${uri}/khana/id?id=${user._id}`, { amount: khanaChanda })
                     .then(() => {
                            setUser({ ...user, phoneNo: user.phone })
                            window.location.reload()
                     })
                     .catch(error => console.error('Error updating payment:', error));
       };
       const puja = () => {
              axios.post(`${uri}/puja/id?id=${user._id}`, { amount: pujaChanda })
                     .then(() => {
                            setUser({ ...user, phoneNo: user.phone })
                            window.location.reload()
                     })
                     .catch(error => console.error('Error updating payment:', error));
       };
       const updatedate = () => {
              axios.post(`${uri}/date/id?id=${user._id}`, { date })
                     .then(() => {
                            setUser({ ...user, phoneNo: user.phone })
                            window.location.reload()
                     })
                     .catch(error => console.error('Error updating payment:', error));
       };
       useEffect(async()=>{
              await axios.post(`${uri}/user/total/id?id=${user._id}`)
       },[khanaChanda,pujaChanda])
       console.log(phoneNo)
       return (
              <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
                     <h1 className='text-2xl font-bold text-orange-600 mb-6'>आपकी जानकारी</h1>
                     <ul className='w-full max-w-2xl bg-white shadow-xl rounded-lg p-6 border border-gray-200'>
                            {[
                                   { label: "नाम", value: user.name },
                                   { label: "फोन नंबर", value: user.phone },
                                   { label: "पूजा चंदा", value: `₹${user.pujaChanda}` },
                                   { label: "खाना चंदा", value: `₹${user.khanaChanda}` },
                                   { label: "कुल चंदा", value: `₹${user.total}` },
                                   { label: "Paid पूजा", value: user.pujaPaid ? "हां" : "नहीं" },
                                   { label: "Paid खाना", value: user.khanaPaid ? "हां" : "नहीं" },
                                   { label: "दिनांक", value: user.date  }
                            ].map((item, index) => (
                                   <div key={index} className="flex justify-between items-center py-3 border-b border-gray-300">
                                          <h1 className='font-semibold text-gray-800'>{item.label} :</h1>
                                          <span className='text-md text-gray-700'>{item.value}</span>
                                   </div>
                            ))}
                     </ul>
                     <div className="mt-6 flex flex-col gap-6 w-full max-w-md">
                            {[{ label: "Puja", handler: togglepuja, paid: user.pujaPaid },
                            { label: "Khana", handler: togglekhana, paid: user.khanaPaid }].map((item, index) => (
                                   <div key={index} className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg border border-gray-300">
                                          <h1 className="text-lg font-semibold text-gray-700">{item.label}</h1>
                                          <button
                                                 onClick={item.handler}
                                                 className={`px-5 py-2 font-medium rounded-lg transition-all text-white ${item.paid ? 'bg-red-600 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}>
                                                 {item.paid ? '❌ Unpaid' : '✅ Paid'}
                                          </button>
                                   </div>
                            ))}
                            {[{ label: "Phone", value: phoneNo, setValue: setPhoneNo, handler: Phone }, { label: "Khana", value: khanaChanda, setValue: setKhanaChanda, handler: khana }, { label: "Puja", value: pujaChanda, setValue: setPujaChanda, handler: puja }, { label: "Date", value: date, setValue: setDate, handler: updatedate }].map((item, index) => (
                                   <div key={index} className="flex flex-col gap-2">
                                          <input type="text" placeholder={item.label} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                                 value={item.value}
                                                 onChange={(e) => item.setValue(e.target.value)}
                                          />
                                          <button onClick={item.handler} className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                                          >Update</button>
                                   </div>
                            ))}
                     </div>
              </div>
       );
};

export default Update;
