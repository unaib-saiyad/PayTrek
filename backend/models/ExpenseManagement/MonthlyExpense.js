const mongoose = require('mongoose');
const { Schema } = mongoose;

const MonthlyExpenseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  
    month: {
      type: String, // YYYY-MM
      required: true,
      index: true
    },
  
    totalAmount: {
      type: Number,
      default: 0
    },
  
    currency: { 
      type: String, 
      default: 'INR' 
    },

    items: [
      {
        expenseSource: {
          type: Schema.Types.ObjectId,
          ref: 'ExpenseSource'
        },
  
        name: { type: String, required: true },
        category: { type: String, required: true },
  
        plannedAmount: { type: Number }, // from ExpenseSource
        actualAmount: { type: Number, required: true },
  
        type: {
          type: String,
          enum: ['fixed', 'variable'],
          default: 'variable'
        },
  
        notes: { type: String },
      }
    ]
  }, { timestamps: true });
  
  // creating index for fast performance and unique entries for user and month combine
  MonthlyExpenseSchema.index({ user: 1, month: 1 }, { unique: true }); 
  
  module.exports = mongoose.model('MonthlyExpense', MonthlyExpenseSchema);
  