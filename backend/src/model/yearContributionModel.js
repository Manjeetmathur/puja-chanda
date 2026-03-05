import mongoose from 'mongoose';

/**
 * Year contribution: one document per user per year.
 * Stores puja chanda, khana chanda, dinank (date), paid flags, comment.
 */
const YearContributionSchema = new mongoose.Schema({
       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
       year: { type: String, required: true },
       pujaChanda: { type: Number, default: 0 },
       khanaChanda: { type: Number, default: 0 },
       date: { type: String, default: '' },
       pujaPaid: { type: Boolean, default: false },
       khanaPaid: { type: Boolean, default: false },
       comment: { type: String, default: '' }
}, { timestamps: true });

YearContributionSchema.index({ user: 1, year: 1 }, { unique: true });

export default mongoose.model('YearContribution', YearContributionSchema);
