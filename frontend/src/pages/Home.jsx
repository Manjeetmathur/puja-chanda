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

const Home = () => {
       const [users, setUsers] = useState([]);
       const [currentImage, setCurrentImage] = useState(0);
       const images = [p1, p4, p5, p6, p7, p8, p10, p9];
     
       useEffect(() => {
              // Fetch users
              axios.get(`${uri}/all-users`)
                     .then(response => setUsers(response.data))
                     .catch(error => console.error('Error fetching users:', error));

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
                     <section className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                                   {/* Text Content */}
                                   <div className="lg:w-1/2 text-center lg:text-left space-y-8">
                                          <h2 className="text-2xl lg:text-3xl font-semibold text-pink-600 animate-slide-up relative inline-block border-b-2 pb-2">
                                                 माहुरी वैश्य मंडल चंदौरी

                                          </h2>


                                          <p className="text-gray-600 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in delay-200">
                                                 मां मथुरासिनी पूजा के लिए अपना योगदान दें और हमारी सांस्कृतिक विरासत को संजोए रखने में सहयोग करें।
                                          </p>
                                          <Link
                                                 to="/user"
                                                 className="lg:inline-block mt-6 px-10 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 hidden"
                                          >
                                                 चंदे की जानकारी <span className="ml-2">➜</span>
                                          </Link>
                                   </div>

                                   {/* Image Carousel */}
                                   <div className="lg:w-1/2 flex justify-center relative ">
                                          <div className="relative w-[290px] sm:w-[400px] p-6 h-[320px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                                                 {images.map((img, index) => (
                                                        <img
                                                               key={index}
                                                               src={img}
                                                               alt={`Maa Mathurasini ${index + 1}`}
                                                               className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 
                                                                       ease-in-out  ${index === currentImage
                                                                             ? 'opacity-100 scale-105'
                                                                             : 'opacity-0 scale-100'
                                                                      }`}
                                                        />
                                                 ))}
                                                 {/* Overlay Gradient */}
                                                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                                                 {/* Decorative Badge */}
                                                 <div className="absolute bottom-6 left-6 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                                                        मां का आशीर्वाद
                                                 </div>
                                          </div>
                                   </div>
                                   <Link
                                          to="/user"
                                          className="inline-block mt-6 px-10 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300 lg:hidden "
                                   >
                                          चंदे की जानकारी<span className="ml-2">➜</span>
                                   </Link>

                            </div>

                     </section>
                     <Link
                            to="/prarthana"
                            className="inline-block w-[255px]  mb-5 mx-auto px-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white text-xl font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300"
                     >
                            मां मथुरासिनी प्रार्थना <span className="ml-2">➜</span>
                     </Link>
                   
                     {/* Footer Section */}
                     <footer className="w-full bg-gray-800 text-white py-4">
                            <div className="container mx-auto px-4 text-center">
                                   <p className="text-sm">© 2025 माहुरी वैश्य मंडल चंदौरी | All rights reserved</p>
                            </div>
                            <p className="text-[10px] text-center mt-3">Developed by Manjeet Mathur</p>
                     </footer>

                     {/* Background Decorations */}
                     <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full opacity-20 -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
                     <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full opacity-20 -z-10 transform translate-x-1/4 translate-y-1/4"></div>
              </div>
       );
};

export default Home;