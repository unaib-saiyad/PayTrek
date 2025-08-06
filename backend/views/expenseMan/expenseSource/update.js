const ExpenseSource = require('../../../models/ExpenseManagement/ExpenseSource');

const updateExpenseSource = async (req, res) => {
    try {
      const updated = await ExpenseSource.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
      );
      if (!updated) return res.status(404).json({ status: false, message: 'Not found or unauthorized' });
      return res.status(200).json({ status: true, message: 'Updated', data: updated });
    } catch (err) {
      return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = updateExpenseSource;