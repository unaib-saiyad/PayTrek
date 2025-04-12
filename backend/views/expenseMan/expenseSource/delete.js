const ExpenseSource = require('../../../models/ExpenseManagement/ExpenseSource');

const deleteExpenseSource = async (req, res) => {
    try {
      const deleted = await ExpenseSource.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!deleted) return res.status(404).json({ message: 'Not found or unauthorized' });
      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = deleteExpenseSource;