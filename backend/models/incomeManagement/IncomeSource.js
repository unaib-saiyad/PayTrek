const mongoose = require('mongoose');
const {Schema} = mongoose;

const IncomeSourceSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['fixed', 'variable'], default: 'fixed' },
    category: { type: String, required: true },
    frequency: { type: String, enum: ['monthly', 'weekly', 'bi-weekly', 'quarterly'], default: 'monthly' },
    currency: { type: String, default: 'INR' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true },
    taxable: { type: Boolean, default: true },
    notes: { type: String }
  }, { timestamps: true });


module.exports = mongoose.model('IncomeSource', IncomeSourceSchema);