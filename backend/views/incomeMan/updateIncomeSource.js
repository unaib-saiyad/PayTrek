const IncomeSource = require('../../models/incomeManagement/IncomeSource');

const updateIncomeSource = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const source = await IncomeSource.findOneAndUpdate(
      { _id: id, user: req.user.id }, 
      { $set: updates },
      { new: true }
    );

    if (!source) {
      return res.status(404).json({status: false, message: "Income source not found or unauthorized" });
    }

    return res.status(200).json({
      status: true,
      message: "Income source updated successfully",
      data: source
    });

  } catch (err) {
    return res.status(500).json({status: false, message: "Server Error", error: err.message });
  }
};

module.exports = updateIncomeSource;
