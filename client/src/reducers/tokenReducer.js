export const tokenReducer = (token = null, action) => {
  switch (action.type) {
    case "TOKEN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return token;
  }
};
