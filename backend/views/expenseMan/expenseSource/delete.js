const ExpenseSource = require('../../../models/ExpenseManagement/ExpenseSource');
const ExpenseHistory = require('../../../models/ExpenseManagement/ExpenseHistory');

const deleteExpenseSource = async (req, res) => {
    try {
      const deleted = await ExpenseSource.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!deleted) return res.status(404).json({ status: false, message: 'Not found or unauthorized' });
      
      const expenseHistories = await ExpenseHistory.deleteMany({expenseSource: req.params.id});
      if (expenseHistories.deletedCount) return res.status(200).json({ status: true, message: 'Expense Source with all histories deleted successfully!' });

      return res.status(200).json({ status: true, message: 'Expense Source Deleted successfully!' });
    } catch (err) {
      return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = deleteExpenseSource;