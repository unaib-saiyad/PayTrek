const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncomeHistorySchema = new Schema({
  incomeSource: { type: Schema.Types.ObjectId, ref: 'IncomeSource', required: true },
  month: { type: Schema.Types.Date, required: true },         // Format: 'YYYY-MM'
  adjustment: { type: Number, default: 0 },        // + or -
  reason: { type: String },
  inHandAmount: { type: Number },                  // Final income received
}, { timestamps: true });

module.exports = mongoose.model('IncomeHistory', IncomeHistorySchema);
