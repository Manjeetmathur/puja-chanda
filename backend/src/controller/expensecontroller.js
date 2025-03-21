import expense from '../model/expenseModel.js';


// Create a new user
export const createexpense = async (req, res) => {
       try {
              const { title,date,user,amount,message } = req.body;
              const newexpense = new expense({ title, date: date+'/3/25' || '' ,user:user||"",amount,message:message|| ""});
              await newexpense.save();
              res.status(201).json({ message: 'User created successfully', expense: newexpense });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};
export const getexpense = async (req, res) => {
       try {
              const expenses =await expense.find()
              res.status(201).json({ message: 'User created successfully', expenses });
       } catch (error) {
              res.status(500).json({ message: error.message });
       }
};

// Get user details
export const deleteExpense = async (req, res) => {
       const { id } = req.query
       // console.log(id)
       try {
               await expense.findByIdAndDelete(id);
res.json("deleted")
              
       } catch (error) {
              res.json({ message: error.message });
       }
};
