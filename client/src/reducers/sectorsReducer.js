export const sectorsReducer = (sectors = null, action) => {
  switch (action.type) {
    case "GET_SECTORS":
      return action.payload;
    case "GET_SECTORS_ERROR":
      return ["error"];
    default:
      return sectors;
  }
};
