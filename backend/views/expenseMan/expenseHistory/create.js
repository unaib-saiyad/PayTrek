const ExpenseHistory = require('../../../models/ExpenseManagement/ExpenseHistory');

const createExpenseHistory = async (req, res) => {
  try {
    const history = new ExpenseHistory(req.body);
    const saved = await history.save();
    return res.status(201).json({ status: true, message: 'History created', data: saved });
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
  }
};

module.exports = createExpenseHistory;