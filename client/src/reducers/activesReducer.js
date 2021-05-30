export const activesReducer = (gainers = null, action) => {
  switch (action.type) {
    case "GET_ACTIVES":
      return action.payload;
    case "GET_ACTIVES_ERROR":
      return ["error"];
    default:
      return gainers;
  }
};
