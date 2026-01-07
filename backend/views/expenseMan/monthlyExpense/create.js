const MonthlyExpense = require('../../../models/ExpenseManagement/MonthlyExpense');
const calculateTotal = require('../../../utils/expense/monthlyExpenseTotalAmount');

const createMonthlyExpense = async (req, res)=>{
    try{
        const { month, items = [], currency = "" } = req.body;
        if (!items.length) {
            return res.status(400).json({
              status: false,
              message: 'At least one expense item is required'
            });
          }
        const newExpense = new MonthlyExpense({
            user: req.user.id,
            month,
            currency,
            items,
            totalAmount: calculateTotal(items)
        });
        const saved = await newExpense.save();
    
        return res.status(201).json({ 
            status: true, 
            message: "Monthly Expense Created Successfully...", 
            data: saved 
        });
    }
    catch(err) {
        if (err.code === 11000) {
            return res.status(409).json({
              status: false,
              message: 'Monthly expense for this month already exists'
            });
        }
        return res.status(500).json({ 
            status: false, 
            message: "Internal Server Error!..."
        });
    }

}

module.exports = createMonthlyExpense;