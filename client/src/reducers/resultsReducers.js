export const resultsReducer = (results = null, action) => {
  switch (action.type) {
    case "SEARCH_RESULTS":
      return action.payload;
    case "SEARCH_RESULTS_ERROR":
      return ["error"];
    case "SEARCH_LOADING":
      return action.payload;
    default:
      return results;
  }
};
