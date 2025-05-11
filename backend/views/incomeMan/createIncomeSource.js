const IncomeSource = require('../../models/incomeManagement/IncomeSource');

const createIncomeSource = async (req, res) => {
  try {
    const {
      name,
      amount,
      type,
      category,
      frequency,
      currency,
      startDate,
      endDate,
      isActive,
      taxable,
      notes
    } = req.body;

    if (!name || !amount || !startDate) {
      return res.status(400).json({status: false, message: "Please fill all required fields." });
    }

    const newIncomeSource = new IncomeSource({
      user: req.user.id, 
      name,
      amount,
      type: type || 'fixed',
      category,
      frequency: frequency || 'monthly',
      currency: currency || 'INR',
      startDate,
      endDate,
      isActive: isActive !== undefined ? isActive : true,
      taxable: taxable !== undefined ? taxable : true,
      notes
    });

    const savedIncome = await newIncomeSource.save();

    return res.status(201).json({
      status: true, 
      message: "Income source created successfully.",
      data: savedIncome
    });

  } catch (error) {
    console.error("Error in createIncomeSource:", error.message);
    return res.status(500).json({
      status: false,
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = createIncomeSource;
