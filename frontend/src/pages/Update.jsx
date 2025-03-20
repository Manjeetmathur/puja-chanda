import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { uri } from '../backend/Uri';

const Update = () => {
       const [user, setUser] = useState(null);
       const { id } = useParams();
       const [phoneNo, setPhoneNo] = useState('');
       const [comment, setcomment] = useState('');
       const [khanaChanda, setKhanaChanda] = useState('');
       const [pujaChanda, setPujaChanda] = useState('');
       const [pichhlapujaChanda, setPichhlaPujaChanda] = useState('');
       const [date, setDate] = useState('');
       const navigate = useNavigate()

       const updateChange = () => {
              axios.get(`${uri}/id?id=${id}`)
                     .then(response => setUser(response.data))
                     .catch(error => console.error('Error fetching user:', error));
       };

       useEffect(() => {
              {
                     updateChange()
               };
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

       const togglepuja = () => {
              axios.post(`${uri}/paypuja/id?id=${user._id}`).then(() => {
                     updateChange()

              });
       };
       const togglekhana = () => {
              axios.post(`${uri}/paykhana/id?id=${user._id}`).then(() => {
                     updateChange()

              });
       };
       const Phone = () => {
              axios.post(`${uri}/phone/id?id=${user._id}`, { phone: phoneNo }).then(() => {
                     updateChange()
                     setPhoneNo('')
              });
       };
       const doComment = () => {
              axios.post(`${uri}/comment/id?id=${user._id}`, { comment }).then(() => {
                     updateChange()
                     setcomment('')
              });
       };
       const khana = () => {
              axios.post(`${uri}/khana/id?id=${user._id}`, { amount: khanaChanda }).then(() => {
                     total();
                     {
                            updateChange()
                            setKhanaChanda('')
                     };
              });
       };
       const pichhlapuja = () => {
              axios.post(`${uri}/pichhlapuja/id?id=${user._id}`, { amount: pichhlapujaChanda }).then(() => {
                     total();
                     {
                            updateChange()
                            setPichhlaPujaChanda('')
                     };
              });
       };
       const puja = () => {
              axios.post(`${uri}/puja/id?id=${user._id}`, { amount: pujaChanda }).then(() => {
                     total();
                     {
                            updateChange()
                            setPujaChanda("")
                     };
              });
       };
       const updatedate = () => {
              axios.post(`${uri}/date/id?id=${user._id}`, { date }).then(() => {
                     updateChange()
                     setDate('')
              });
       };
       const deleteuser = () => {
              axios.delete(`${uri}/deleteuser/id?id=${user._id}`).then(() => { navigate("/admin")
              });
       };
       const total = () => {
              axios.post(`${uri}/total/id?id=${user._id}`).then(() => {
                     updateChange()

              });
       };

       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-50 flex flex-col items-center py-12 px-4">
                     {/* Heading */}
                     <h1 className="text-2xl md:text-4xl font-extrabold text-orange-600 mb-12 relative animate-fade-in">
                            जानकारी अपडेट करें
                            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
                     </h1>

                     {/* User Details Card */}
                     <ul className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 mb-10 border border-gray-100 animate-fade-in delay-200">
                            <h1 className='text-end my-1 ml-4 text-lg font-semibold text-red-700' onClick={deleteuser}>🗑️ Delete</h1>
                            {[
                                   { label: "नाम", value: user.name },
                                   { label: "फोन नंबर", value: user.phone || "__" },
                                   { label: "पिछला पूजा चंदा", value: `₹${user.pichhlapujaChanda}` },
                                   { label: "पूजा चंदा", value: `₹${user.pujaChanda}` },
                                   { label: "खाना चंदा", value: `₹${user.khanaChanda}` },
                                   { label: "कुल चंदा", value: `₹${user.total}` },
                                   { label: "Paid पूजा", value: user.pujaPaid ? "हां" : "नहीं" },
                                   { label: "Paid खाना", value: user.khanaPaid ? "हां" : "नहीं" },
                                   { label: "दिनांक", value: user.date || "__" },
                                   { label: "टिप्पाणी", value: user.comment || "__" },
                            ].map((item, index) => (
                                   <li key={index} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                                          <span className="font-semibold text-gray-800 text-lg">{item.label} :</span>
                                          <span className={`text-md ${item.label.includes("Paid") ? (item.value === "हां" ? "text-green-600 font-semibold" : "text-red-400 font-semibold") : "text-gray-700"}`}>
                                                 {item.value}
                                          </span>
                                   </li>
                            ))}
                     </ul>

                     {/* Update Section */}
                     <div className="w-full max-w-lg space-y-8">
                            {/* Toggle Buttons */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                   {[
                                          { label: "Puja", handler: togglepuja, paid: user.pujaPaid },
                                          { label: "Khana", handler: togglekhana, paid: user.khanaPaid },
                                   ].map((item, index) => (
                                          <div key={index} className="flex justify-between items-center bg-white shadow-md p-5 rounded-lg border border-gray-100">
                                                 <h2 className="text-lg font-semibold text-gray-700">{item.label}</h2>
                                                 <button
                                                        onClick={item.handler}
                                                        className={`px-5 py-2 font-medium rounded-full shadow-sm transition-all duration-300 text-white ${item.paid ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                                 >
                                                        {item.paid ? '❌ Unpaid' : '✅ Paid'}
                                                 </button>
                                          </div>
                                   ))}
                            </div>

                            {/* Input Fields */}
                            <div className="space-y-6">
                                   {[
                                          { label: "Phone", value: phoneNo, setValue: setPhoneNo, handler: Phone },
                                          { label: "comment", value: comment, setValue: setcomment, handler: doComment },
                                          { label: "Pichhla Puja Chanda", value: pichhlapujaChanda, setValue: setPichhlaPujaChanda, handler: pichhlapuja },
                                          { label: "Puja Chanda", value: pujaChanda, setValue: setPujaChanda, handler: puja },
                                          { label: "Khana Chanda", value: khanaChanda, setValue: setKhanaChanda, handler: khana },
                                          { label: "Date", value: date, setValue: setDate, handler: updatedate },
                                   ].map((item, index) => (
                                          <div key={index} className="">
                                                 <h1 className='my-3 ml-4 text-lg font-semibold text-orange-400'>{item.label}</h1>
                                                 <div key={index} className="flex  justify-between gap-3">

                                                        <input
                                                               type="text"
                                                               placeholder={`Update ${item.label}`}
                                                               value={item.value}
                                                               onChange={(e) => item.setValue(e.target.value)}
                                                               className="w-full p-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                                                        />
                                                        <button
                                                               onClick={item.handler}
                                                               className="w-[100px] bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transform transition-all duration-300"
                                                        >
                                                               Update
                                                        </button>
                                                 </div>
                                          </div>
                                   ))}
                            </div>
                     </div>
              </div>
       );
};

export default Update;