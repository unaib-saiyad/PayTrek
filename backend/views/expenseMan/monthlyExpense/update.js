const monthlyExpense = require('../../../models/ExpenseManagement/MonthlyExpense');
const calculateTotal = require('../../../utils/expense/monthlyExpenseTotalAmount');

const updateMonthlyExpense = async (req, res) => {
    try{
        const { currency, items = [] } = req.body;
        if(items && !items.length){
            return res.status(400).json({
                status: false,
                message: 'At least one expense item is required!...'
              });
        }
        const updatedData = {};

        if(currency){
            updatedData.currency = currency;
        }
        updatedData.items = items;
        updatedData.totalAmount = calculateTotal(items);

        const updatedExpense = await monthlyExpense.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: updatedData },
            { new: true }
        );
        if(!updatedExpense){
            return res.status(404).json({
                status: false,
                message: "No Expense Found!...",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Expense Updated Successfully...",
            expense: updatedExpense,
        });

    }
    catch(err){
        res.status(500).json({
            status: false,
            message: "Internal Server Error!..."
        });
    }
}

module.exports = updateMonthlyExpense;