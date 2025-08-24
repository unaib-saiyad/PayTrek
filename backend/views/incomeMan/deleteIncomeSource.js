const IncomeSource = require('../../models/incomeManagement/IncomeSource');
const IncomeHistory = require('../../models/incomeManagement/IncomeHistory');

const deleteIncomeSource = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await IncomeSource.findOneAndDelete({ _id: id, user: req.user.id });

    const histories = await IncomeHistory.deleteMany({incomeSource: id});

    if (!deleted) {
      return res.status(404).json({ status: false, message: "Income source not found or unauthorized" });
    }

    if(!histories.deletedCount){
      return res.status(200).json({ status: true, message: "Income source deleted successfully" });
    }

    return res.status(200).json({ status: true, message: "Income source and all its past histories are deleted successfully" });

  } catch (err) {
    return res.status(500).json({ status: false, message: "Server Error", error: err.message });
  }
};

module.exports = deleteIncomeSource;
