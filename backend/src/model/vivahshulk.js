
import mongoose from 'mongoose';

const VivahShulkSchema = new mongoose.Schema({
       name: { type: String, required: true },
       comment: { type: String,  },
       shulk: { type: Number, default: 0 },
       marriageDate: { type: String},
       date: { type: String},
       paid: { type: Boolean, default: false },

});

export default mongoose.model('Vivahshulk', VivahShulkSchema);