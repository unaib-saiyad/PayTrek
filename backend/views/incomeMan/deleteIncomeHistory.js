const IncomeHistory = require('../../models/incomeManagement/IncomeHistory');

const deleteIncomeHistory = async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await IncomeHistory.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ status: false, message: 'Income history not found' });
      }
  
      return res.status(200).json({ status: true, message: 'Income history deleted' });
    } catch (err) {
      return res.status(500).json({ status: false, message: 'Server Error', error: err.message });
    }
  };
  
  module.exports = deleteIncomeHistory;
  