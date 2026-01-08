const MonthlyExpense = require('../../../models/ExpenseManagement/MonthlyExpense');

const getMonthlyExpense = async (req, res) => {
  try {
    const { month } = req.params;

    const expense = await MonthlyExpense.findOne({
      user: req.user.id,
      month
    }).lean(); // faster, read-only

    if (!expense) {
      return res.status(404).json({
        status: false,
        message: 'No expense found for this month!...'
      });
    }

    return res.status(200).json({
      status: true,
      data: expense
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error!...'
    });
  }
};

const getAllMonthlyExpenses = async (req, res) => {
  try {
    const expenses = await MonthlyExpense.find({
      user: req.user.id
    })
      .sort({ month: -1 }) // latest first
      .select('month totalAmount currency createdAt')
      .lean();

    return res.status(200).json({
      status: true,
      count: expenses.length,
      data: expenses
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

/* Enhance Controller
const getAllMonthlyExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      year,
      page = 1,
      limit = 6,
      sort = 'desc',
      summary = false
    } = req.query;

    const query = { user: userId };

    // 🔹 Year filter (YYYY)
    if (year) {
      query.month = { $regex: `^${year}` };
    }

    const skip = (page - 1) * limit;

    // 🔹 Fetch paginated data
    const expenses = await MonthlyExpense.find(query)
      .sort({ month: sort === 'asc' ? 1 : -1 })
      .skip(Number(skip))
      .limit(Number(limit))
      .select('month totalAmount currency createdAt')
      .lean();

    // 🔹 Count for pagination
    const totalRecords = await MonthlyExpense.countDocuments(query);

    const response = {
      status: true,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit)
      },
      data: expenses
    };

    // 🔹 Optional summary (dashboard stats)
    if (summary === 'true') {
      const stats = await MonthlyExpense.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            totalSpent: { $sum: '$totalAmount' },
            avgMonthlySpend: { $avg: '$totalAmount' },
            highestMonthSpend: { $max: '$totalAmount' }
          }
        }
      ]);

      response.summary = stats[0] || {
        totalSpent: 0,
        avgMonthlySpend: 0,
        highestMonthSpend: 0
      };
    }

    return res.status(200).json(response);

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: err.message
    });
  }
};

*/

module.exports = { getMonthlyExpense, getAllMonthlyExpenses };
