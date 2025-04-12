const ExpenseSource = require('../../../models/ExpenseManagement/ExpenseSource');

const updateExpenseSource = async (req, res) => {
    try {
      const updated = await ExpenseSource.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
      );
      if (!updated) return res.status(404).json({ message: 'Not found or unauthorized' });
      return res.status(200).json({ message: 'Updated', data: updated });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = updateExpenseSource;