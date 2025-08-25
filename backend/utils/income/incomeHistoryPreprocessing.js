const dayjs = require("dayjs");
/**
 * Generate income history entries (fixed + manual overrides)
 *
 * @param {Object} incomeSource - income source
 *   { startDate, amount, type }  // type: "fixed" | "variable"
 * @param {Array} manualHistories - array of manual history entries
 *   [ { date: "2025-03-01", amount: 60000 }, ... ]
 * @returns {Array} processed histories month-wise
 */
const IncomeHistoryPreprocessor = (incomeSource, manualHistories)=> {
    if(!incomeSource) return [];

    manualHistoryMap = new Map();
    const format = 'YYYY-MM';
    let current = dayjs(incomeSource.startDate);
    const end = dayjs();
    let processedData = [];

    manualHistories.map(x => manualHistoryMap.set(dayjs(x.month).format(format), x));

    while (current.isBefore(end) || current.isSame(end, "month")) {
        if(manualHistoryMap.has(current.format(format))){
            processedData.push(manualHistoryMap.get(current.format(format)));
        }
        else{
            processedData.push({
                "incomeSource": incomeSource._id,
                "month": current,
                "adjustment": 0,
                "inHandAmount": incomeSource.amount
            });
        }

        current = current.add(1, "month");
    }

    return processedData;
}

module.exports = IncomeHistoryPreprocessor;