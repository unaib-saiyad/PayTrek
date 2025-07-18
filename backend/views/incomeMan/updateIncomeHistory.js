const IncomeHistory = require('../../models/incomeManagement/IncomeHistory');

const updateIncomeHistory = async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
  
      const updated = await IncomeHistory.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) {
        return res.status(404).json({status: false, message: 'Income history not found' });
      }
  
      return res.status(200).json({ status: true, message: 'Income history updated', data: updated });
    } catch (err) {
      return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = updateIncomeHistory;