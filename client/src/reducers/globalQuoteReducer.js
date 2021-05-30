export const globalQuoteReducer = (globalQuotes = [], action) => {
  switch (action.type) {
    case "GLOBAL_QUOTE":
      return [...globalQuotes, action.payload];
    case "GLOBAL_QUOTE_ERROR":
      return [...globalQuotes, action.payload];
    default:
      return globalQuotes;
  }
};
