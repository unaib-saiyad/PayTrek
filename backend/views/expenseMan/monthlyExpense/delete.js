const monthlyExpense = require('../../../models/ExpenseManagement/MonthlyExpense');

const deleteMonthlyExpense = async (req, res) =>{
    try{
        const deleted = await monthlyExpense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if(!deleted){
            return res.status(404).json({
                status: false,
                message: "No Expense Found!..."
            });
        }
        return res.status(200).json({ 
            status: true,
            message: "Expense Deleted Successfully..."
        });
    }
    catch(err){
        return res.status(500).json({
            status: false,
            message: "Internal Server Error!...",
        })
    }
}

module.exports = deleteMonthlyExpense;