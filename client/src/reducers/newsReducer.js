export const newsReducer = (news = null, action) => {
  switch (action.type) {
    case "NEWS_FEED":
      return action.payload;
    case "NEWS_ERROR":
      return ["error"];
    default:
      return news;
  }
};
