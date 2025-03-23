import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { uri } from '../../backend/Uri';

const Admin = () => {

       

       return (
              <div className="relative min-h-screen bg-orange-100 flex flex-col overflow-hidden">
                     {/* Header Section */}
                     <header className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white py-6 shadow-lg">
                            <div className="container mx-auto px-4 flex justify-center items-center">🙏
                                   <h1 className="text-3xl font-extrabold tracking-wider drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
                                          जय मां मथुरासिनी
                                   </h1>
                                   🙏
                            </div>
                     </header>

                     {/* Hero Section */}
                    
                     <Link
                            to="/user-admin"
                            className="bg-gradient-to-r mt-36 from-green-600 to-teal-600 text-white text-xl font-semibold rounded-full w-[250px] text-center p-2 flex  justify-center items-center mx-auto mb-4"
                     >
                            Create-Update-User<span className="ml-2">➜</span>
                     </Link>

                     <Link
                            to="/user"
                            className="inline-block w-[255px]  mb-15 mx-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 text-center"
                     >
                            
                            चंदे की जानकारी <span className="ml-2">➜</span>
                     </Link>
                     <Link
                            to="/expense-admin"
                            className="inline-block w-[255px]  mb-5 mx-auto px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 text-center"
                     >
                            ख़र्च लिखें
                            <span className="ml-2">➜</span>
                     </Link>
                     <Link
                            to="/expense"
                            className="inline-block w-[255px]  mb-15 mx-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 text-center"
                     >
                            खर्चे की जानकारी <span className="ml-2">➜</span>
                     </Link>
                    
                     <Link
                            to="/vivah-admin"
                            className="inline-block w-[255px]  mb-5 mx-auto px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 text-center"
                     >
                            विवाह शुल्क लिखें <span className="ml-2">➜</span>
                     </Link>
                     <Link
                            to="/vivah-shulk-details"
                            className="inline-block w-[255px]  mb-15 mx-auto px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 text-center"
                     >
                            विवाह शुल्क की जानकारी 
                     </Link>
                    

                    
              </div>
       );
};

export default Admin;