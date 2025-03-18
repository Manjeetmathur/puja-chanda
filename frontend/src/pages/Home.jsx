import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import p1 from '../assets/p1.jpg';
import { uri } from '../backend/Uri';

const Home = () => {
       const [users, setUsers] = useState([]);

       useEffect(() => {
              axios.get(`${uri}/all-users`)
                     .then(response => setUsers(response.data))
                     .catch(error => console.error('Error fetching users:', error));
       }, []);

       return (
              <div className="  flex flex-col items-center ">
                     <div className="flex flex-col items-center text-center my-5">
                            <h1 className='text-3xl font-extrabold text-orange-600 mb-3'>जय मां मथुरासिनी</h1>
                            <img src={p1} alt="Maa Mathurasini" className='h-[350px] rounded-lg shadow-lg' />
                            <h1 className='text-xl font-semibold my-5 text-pink-600'>माहुरी नवयुवक समिति चंदौरी</h1>
                     </div>
                     <div className="flex justify-center items-center my-3">
                            <h1 className='text-3xl'>👇 </h1>
                            <p className='text-xl text-green-800'>चंदा की जानकारी लें
                            </p>
                     </div>
                     <Link className='text-lg font-medium text-white bg-green-500 px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition' to={"/user"}>मां मथुरासिनी पूजा चंदा ➡</Link>
              </div>
       );
};

export default Home;