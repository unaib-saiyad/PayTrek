const ExpenseSource = require('../../../models/ExpenseManagement/ExpenseSource');

const createExpenseSource = async (req, res) => {
  try {
    const data = req.body;
    data.user = req.user.id;
    const newExpense = new ExpenseSource(data);
    const saved = await newExpense.save();
    return res.status(201).json({status: true,  message: 'Expense source created', data: saved });
  } catch (err) {
    return res.status(500).json({status: false,  message: 'Server Error', error: err.message });
  }
};

module.exports = createExpenseSource;