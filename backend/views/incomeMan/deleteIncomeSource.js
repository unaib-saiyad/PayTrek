const IncomeSource = require('../../models/incomeManagement/IncomeSource');

const deleteIncomeSource = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await IncomeSource.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deleted) {
      return res.status(404).json({ message: "Income source not found or unauthorized" });
    }

    return res.status(200).json({ message: "Income source deleted successfully" });

  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = deleteIncomeSource;
