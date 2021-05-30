export const stockReducer = (selectedStock = null, action) => {
  let selectedStockMemory = JSON.parse(localStorage.getItem("selectedStock"));

  switch (action.type) {
    case "SELECT_STOCK":
      return action.payload;
    case "LOGOUT":
      return action.payload;
    default:
      if (selectedStockMemory) {
        return selectedStockMemory;
      } else {
        return selectedStock;
      }
  }
};
