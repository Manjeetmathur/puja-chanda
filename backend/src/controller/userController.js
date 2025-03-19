import User from '../model/userModel.js';


// Create a new user
export const createUser = async (req, res) => {
       try {
              const { name, phone } = req.body;
              const newUser = new User({ name, phone: phone || '' });
              await newUser.save();
              res.status(201).json({ message: 'User created successfully', user: newUser });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};

// Get user details
export const getUserDetails = async (req, res) => {
       const { id } = req.query
       try {
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              res.json(user);
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};


// Contribute amount
export const pujaChanda = async (req, res) => {
       try {
              const { amount } = req.body;
              const { id } = req.query;
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              user.pujaChanda = amount;
              await user.save();
              res.json({ message: 'Contribution updated', user });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const pichhlapujaChanda = async (req, res) => {
       try {
              const { amount } = req.body;
              const { id } = req.query;
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              user.pichhlapujaChanda = amount;
              await user.save();
              res.json({ message: 'Contribution updated', user });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const khanaChanda = async (req, res) => {
       try {
              const { amount } = req.body;
              const { id } = req.query;
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              user.khanaChanda = amount;
              await user.save();
              res.json({ message: 'Contribution updated', user });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const total = async (req, res) => {
       try {
              const { id } = req.query;
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              const amount = user.pujaChanda + user.khanaChanda
              user.total = amount;
              await user.save();
              res.json({ message: 'Contribution updated', user });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const date = async (req, res) => {
       try {
              const { id } = req.query;
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              const { date } = req.body
              user.date = date;
              await user.save();
              res.json({ message: 'Contribution updated', user });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const phone = async (req, res) => {
       try {
              const { id } = req.query;
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              const { phone } = req.body
              user.phone = phone;
              await user.save();
              res.json({ message: 'Contribution updated', user });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};

// Pay Chanda

export const pujaPaid = async (req, res) => {
       try {
              const { id } = req.query;
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              user.pujaPaid = !user.pujaPaid;
              await user.save();
              res.json({ message: 'Payment status toggled', user });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const khanPaid = async (req, res) => {
       try {
              const { id } = req.query;
              const user = await User.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              user.khanaPaid = !user.khanaPaid;
              await user.save();
              res.json({ message: 'Payment status toggled', user });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const getAllUsers = async (req, res) => {
       try {
              const users = await User.find();
              res.json(users);
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const deleteUser = async (req, res) => {
       try {
              await User.findByIdAndDelete(req.params.id);
              res.json({ message: 'User deleted' });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
