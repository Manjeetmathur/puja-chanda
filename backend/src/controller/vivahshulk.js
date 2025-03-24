import VivahShulk from '../model/vivahshulk.js';


// Create a new user
export const createUser = async (req, res) => {
       try {
              const { name, shulk,comment ,marriageDate} = req.body;
              const newUser = new VivahShulk({ name, comment: comment || '',shulk:shulk||0,marriageDate });
              await newUser.save();
              // console.log(newUser)
              res.status(201).json({ message: 'User created successfully', user: newUser });
       } catch (error) {
              res.json({ message: error.message });
       }
};
export const Paid = async (req, res) => {
       try {
              
              const {date,id} = req.body
              // console.log(date)
              const user = await VivahShulk.findById(id);
              if (!user) return res.status(404).json({ message: 'User not found' });
              if(user.paid){
                     user.paid = !user.paid;
                     user.date = ""
              }else{
                     user.paid = !user.paid;
                     user.date = date
              }
              
             
              await user.save();
              res.json({ message: 'Payment status toggled', user });
       } catch (error) {
              res.json({ message: error.message });
       }
};
// export const date = async (req, res) => {
//        try {
              
//               const {date,id} = req.body
//               // console.log(date)
//               const user = await VivahShulk.findById(id);
//               if (!user) return res.status(404).json({ message: 'User not found' });
//               if(user.paid){
//                      user.paid = !user.paid;
//                      user.date = ""
//               }else{
//                      user.paid = !user.paid;
//                      user.date = date
//               }
              
             
//               await user.save();
//               res.json({ message: 'Payment status toggled', user });
//        } catch (error) {
//               res.json({ message: error.message });
//        }
// };

// Get user details
export const getUserDetails = async (req, res) => {
       try {
              const user = await VivahShulk.find();
              if (!user) return res.status(404).json({ message: 'User not found' });
              // console.log(user)
              res.json(user);
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};

export const deleteUser = async (req, res) => {
       const {id} = req.query
       try {
              await VivahShulk.findByIdAndDelete(id);
              res.json({ message: 'User deleted' });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};

