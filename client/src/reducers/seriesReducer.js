export const seriesReducer = (seriesData = null, action) => {
  switch (action.type) {
    case "SERIES_DATA":
      return action.payload;
    case "SERIES_ERROR":
      return ["error"];
    default:
      return seriesData;
  }
};
