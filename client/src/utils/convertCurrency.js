// Sample static exchange rates (base: 1 INR)
const exchangeRates = {
    INR: { INR: 1, USD: 0.012, EUR: 0.011, AED: 0.044 },
    USD: { INR: 83.3, USD: 1, EUR: 0.92, AED: 3.67 },
    EUR: { INR: 90.4, USD: 1.09, EUR: 1, AED: 3.99 },
    AED: { INR: 22.7, USD: 0.27, EUR: 0.25, AED: 1 },
  };
  
  export function convertCurrency(amount, from, to) {
    if (!exchangeRates[from] || !exchangeRates[from][to]) {
      return amount;
    }
    return amount * exchangeRates[from][to];
  }
  