// Update user payment status
import User from "../model/userModel.js";

// import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({ name, phone, role: 'admin' });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { name, phone } = req.body;
    console.log(phone,)
    const admin = await User.findOne({ phone, role: 'admin' });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.json({ admin, msg: "login" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updatePhoneNumber= async (req, res) => {
  try {
    const { id } = req.params;
    const {phone} = req.body
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.phone = phone;
    await user.save();
    res.json({ message: 'Payment status toggled', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

