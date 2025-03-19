import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import User from './pages/User';
import UserDetails from './pages/UserDetails';
import Pay from './pages/Pay';
import Update from './pages/Update';
import Prarthana from './pages/Prarthana';
function App() {

  return (
    <div className="p">

      
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/prarthana" element={<Prarthana />} />
          <Route path="/user" element={<User />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/pay/:id" element={<Pay/>} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
