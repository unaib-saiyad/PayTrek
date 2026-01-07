
const calculateTotal = (items = []) => {
    return items.reduce(
      (sum, item) => sum + (item.actualAmount || 0),
      0
    );
}

module.exports = calculateTotal;