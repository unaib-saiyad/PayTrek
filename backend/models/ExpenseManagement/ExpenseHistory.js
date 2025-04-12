const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseHistorySchema = new Schema({
    expenseSource: { type: Schema.Types.ObjectId, ref: 'ExpenseSource', required: true },
    month: { type: String, required: true }, // Format: YYYY-MM
    actualAmount: { type: Number, required: true },
    adjustment: { type: Number, default: 0 },
    reason: { type: String },
    notes: { type: String }
  }, { timestamps: true });
  
  module.exports = mongoose.model('ExpenseHistory', ExpenseHistorySchema);