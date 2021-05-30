export const userReducer = (userObject = {}, action) => {
  switch (action.type) {
    case "GET_USER_INFO":
      return action.payload;
    case "LOGOUT":
      return {};
    case "DELETE_USER":
      return action.payload;
    default:
      return userObject;
  }
};
