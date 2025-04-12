const ExpenseHistory = require('../../../models/ExpenseManagement/ExpenseHistory');

const getExpenseHistory = async (req, res) => {
    try {
      const logs = await ExpenseHistory.find({ expenseSource: req.params.expenseSource });
      return res.status(200).json({ data: logs });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = getExpenseHistory;