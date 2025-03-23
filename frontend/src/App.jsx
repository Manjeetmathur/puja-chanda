import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin/Admin';
import User from './pages/User';
import UserDetails from './pages/UserDetails';
import Pay from './pages/Pay';
import Update from './pages/Admin/CreateUser/Update';
import Prarthana from './pages/Prarthana';
import Details from './pages/Details';
import Expense from './pages/Expense';
import UserAdmin from './pages/Admin/CreateUser/UserAdmin';
import ExpenseAdmin from './pages/Admin/CreateExpanse/CreateExpenseAdmin';
import Vivahshulk from './pages/Admin/Vivahshulk/Vivahshulk';
import VivahShulkDetails from './pages/Admin/Vivahshulk/VivahShulkdetails';
import Vivah from './pages/Vivah';
function App() {

  return (
    <div className="p">


      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user-admin" element={<UserAdmin />} />
          <Route path="/expense-admin" element={<ExpenseAdmin />} />
          <Route path="/vivah-admin" element={<Vivahshulk />} />
          <Route path="/prarthana" element={<Prarthana />} />
          <Route path="/user" element={<User />} />
          <Route path="/expense" element={<Expense/>} />
          <Route path="/vivah-shulk-details" element={<Vivah/>} />
          <Route path="/details" element={<Details />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/pay/:id" element={<Pay />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
