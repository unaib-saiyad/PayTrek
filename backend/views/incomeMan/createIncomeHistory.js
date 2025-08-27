const IncomeHistory = require('../../models/incomeManagement/IncomeHistory');
const dayjs = require('dayjs');

const createIncomeHistory = async (req, res) => {
  try {
    const { incomeSource, month, adjustment, reason, inHandAmount } = req.body;

    const date = dayjs(month); // any date user gives
    const startOfMonth = date.startOf("month").toDate(); // 2025-01-01T00:00:00
    const endOfMonth = date.endOf("month").toDate();     // 2025-01-31T23:59:59

    // Optional duplication check (same month for same incomeSource)
    const exists = await IncomeHistory.findOne({ incomeSource, month: { $gte: startOfMonth, $lte: endOfMonth } });
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