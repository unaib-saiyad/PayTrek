const IncomeHistory = require('../../models/incomeManagement/IncomeHistory');
const IncomeSource = require('../../models/incomeManagement/IncomeSource');
const IncomeHistoryPreprocessor = require('../../utils/income/incomeHistoryPreprocessing');

const mongoose = require('mongoose');

const getIncomeHistory = async (req, res) => {
  const { incomeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(incomeId)) {
    return res.status(400).json({ status: false, message: "Invalid income source ID" });
  }

  try {
    const income = await IncomeSource.findById(incomeId);
    if (!income) {
      return res.status(403).json({ status: false, message: "Invalid Income Id" });
    }
    if(income.user != req.user.id){
      return res.status(403).json({ status: false, message: "Access denied" });
    }

    const history = await IncomeHistory.find({ incomeSource: incomeId }).sort({ createdAt: -1 });

    const preprocessedData = IncomeHistoryPreprocessor(income, history);

    return res.status(200).json({ status: true, data: preprocessedData });
  } catch (err) {
    console.error("Error fetching income history:", err);
    return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
  }
};

module.exports = getIncomeHistory;
