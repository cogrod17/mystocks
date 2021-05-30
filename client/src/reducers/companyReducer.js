export const companyReducer = (company = null, action) => {
  switch (action.type) {
    case "GET_COMPANY":
      return action.payload;
    case "GET_COMPANY_ERROR":
      return ["error"];
    default:
      return company;
  }
};
