const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSourceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, enum: ['fixed', 'variable'], default: 'variable' },
  frequency: { type: String, enum: ['once', 'rarely', 'monthly', 'weekly', 'bi-weekly', 'quarterly'], default: 'monthly' },
  currency: { type: String, default: 'INR' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isRecurring: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ExpenseSource', ExpenseSourceSchema);