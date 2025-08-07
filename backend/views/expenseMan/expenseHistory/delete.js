const ExpenseHistory = require('../../../models/ExpenseManagement/ExpenseHistory');

const deleteExpenseHistory = async (req, res) => {
    try {
      const deleted = await ExpenseHistory.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({status: false, message: 'History not found' });
      return res.status(200).json({ status: true, message: 'Deleted' });
    } catch (err) {
      return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = deleteExpenseHistory;