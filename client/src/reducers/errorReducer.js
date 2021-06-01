export const errorReducer = (error = null, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { from: "login", msg: "incorrect username or password" };
    case "CREATE_ERROR":
      return {
        from: "create",
        msg:
          "Could not create account.  Is your password at least 7 characters long?",
      };
    case "TOGGLE_STOCK_ERROR":
      return { from: "AddRemoveButton", msg: "Cannot perform action" };
    case "DELETE_USER_ERROR":
      return { from: "delete", msg: "Cannot delete" };
    default:
      return error;
  }
};
