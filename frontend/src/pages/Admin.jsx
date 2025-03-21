import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import p1 from '../assets/p1.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.jpg';
import p6 from '../assets/p6.jpg';
import p7 from '../assets/p7.jpg';
import p8 from '../assets/p8.jpg';
import p9 from '../assets/p10.jpg';
import p10 from '../assets/p9.jpg';
import { uri } from '../backend/Uri';

const Admin = () => {
       const [currentImage, setCurrentImage] = useState(0);
       const images = [p1, p4, p5, p6, p7, p8, p10, p9];

       useEffect(() => {

              // Image rotation every 3 seconds
              const interval = setInterval(() => {
                     setCurrentImage((prev) => (prev + 1) % images.length);
              }, 2000);

              return () => clearInterval(interval); // Cleanup on unmount
       }, [images.length]);

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
                            className="inline-block w-[255px]  mb-5 mx-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 text-center"
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
                            className="inline-block w-[255px]  mb-5 mx-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 text-center"
                     >
                            खर्चे की जानकारी <span className="ml-2">➜</span>
                     </Link>
                    

                    
              </div>
       );
};

export default Admin;