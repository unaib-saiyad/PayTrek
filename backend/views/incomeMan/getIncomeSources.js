const IncomeSource = require('../../models/incomeManagement/IncomeSource');

const getIncomeSources = async (req, res) => {
  try {
    const sources = await IncomeSource.find({ user: req.user.id });
    return res.status(200).json({ data: sources });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = getIncomeSources;
