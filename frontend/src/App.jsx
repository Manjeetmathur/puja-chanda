import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import User from './pages/User';
import UserDetails from './pages/UserDetails';
import Pay from './pages/Pay';
import Update from './pages/Update';
import Prarthana from './pages/Prarthana';
import Details from './pages/Details';
import Expense from './pages/Expense ';
import UserAdmin from './pages/UserAdmin';
import ExpenseAdmin from './pages/CreateExpenseAdmin';
function App() {

  return (
    <div className="p">


      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user-admin" element={<UserAdmin />} />
          <Route path="/expense-admin" element={<ExpenseAdmin />} />
          <Route path="/prarthana" element={<Prarthana />} />
          <Route path="/user" element={<User />} />
          <Route path="/expense" element={<Expense/>} />
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
