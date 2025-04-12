const IncomeHistory = require('../../models/incomeManagement/IncomeHistory');

const getIncomeHistory = async (req, res) => {
    try {
      const incomeSource = req.params.incomeSource;
      const history = await IncomeHistory.find({ incomeSource });
      return res.status(200).json({ data: history });
    } catch (err) {
      return res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = getIncomeHistory;