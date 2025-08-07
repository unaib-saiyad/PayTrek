const ExpenseHistory = require('../../../models/ExpenseManagement/ExpenseHistory');

const updateExpenseHistory = async (req, res) => {
    try {
      const updated = await ExpenseHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ status: false, message: 'History not found' });
      return res.status(200).json({ status: true, message: 'Updated', data: updated });
    } catch (err) {
      return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = updateExpenseHistory;