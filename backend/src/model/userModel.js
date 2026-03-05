import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
       name: { type: String, required: true },
       phone: { type: String, default: '' },
       role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

export default mongoose.model('User', UserSchema);
