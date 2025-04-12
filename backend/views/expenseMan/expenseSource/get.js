const ExpenseSource = require('../../../models/ExpenseManagement/ExpenseSource');

const getExpenseSources = async (req, res) => {
    try {
      const sources = await ExpenseSource.find({ user: req.user.id });
      return res.status(200).json({ data: sources });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = getExpenseSources;