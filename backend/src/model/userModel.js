
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
       name: { type: String, required: true },
       phone: { type: String,  },
       pujaChanda: { type: Number, default: 0 },
       khanaChanda: { type: Number, default: 0 },
       total: { type: Number, default: 0 },

       pujaPaid: { type: Boolean, default: false },
       khanaPaid: { type: Boolean, default: false },
       date: { type: String},
       
       role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export default mongoose.model('User', UserSchema);