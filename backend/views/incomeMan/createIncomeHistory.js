const IncomeHistory = require('../../models/incomeManagement/IncomeHistory');

const createIncomeHistory = async (req, res) => {
  try {
    const { incomeSource, month, adjustment, reason, inHandAmount } = req.body;

    // Optional duplication check (same month for same incomeSource)
    const exists = await IncomeHistory.findOne({ incomeSource, month });
    if (exists) {
      return res.status(400).json({ status: false, message: `History already exists for ${month}.` });
    }

    const history = new IncomeHistory({ incomeSource, month, adjustment, reason, inHandAmount });
    await history.save();

    return res.status(201).json({ status: true, message: 'Income history created', data: history });
  } catch (err) {
    return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
  }
};

module.exports = createIncomeHistory;