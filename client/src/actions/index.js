import history from "../history";
import { alphaVantage, finPrep, finHub, server } from "../api";

export const getUserInfo = (userObject = null) => {
  return {
    type: "GET_USER_INFO",
    payload: userObject,
  };
};

///////////////////////////////////////////
///////////////////////////////////////////

export const selectStock = (stock, price = null) => {
  if (!stock) return;
  localStorage.setItem("selectedStock", JSON.stringify({ stock, price }));
  history.push("/companyoverview");
  return {
    type: "SELECT_STOCK",
    payload: { stock, price },
  };
};

///////////////////////////////////////////
///////////////////////////////////////////

export const getToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
  return {
    type: "TOKEN",
    payload: token,
  };
};

////////////////////////////////////////////
///////////////////////////////////////////

export const signInWithToken = (token) => async (dispatch) => {
  const res = await server.get("/users/profile", {
    headers: { Authorization: "Bearer " + token },
  });
  await dispatch(getToken(token));
  await dispatch(getUserInfo(res.data));
  if (window.location.pathname === "/") history.push("/home");
};

///////////////////////////////////////////
///////////////////////////////////////////

export const logIn = (email, password) => async (dispatch) => {
  try {
    const res = await server.post("/users/login", {
      email: email,
      password: password,
    });
    const { user, token } = res.data;
    dispatch(getUserInfo(user));
    dispatch(getToken(token));
    history.push("/home");
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const createUser = (username, email, password) => async (dispatch) => {
  try {
    if (password.length < 7) throw new Error();

    const res = await server.post("/users/create", {
      username: username,
      email: email,
      password: password,
    });

    const { user, token } = res.data;

    await dispatch(getUserInfo(user));
    await dispatch(getToken(token));

    history.push("/home");
  } catch (error) {
    dispatch({ type: "CREATE_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const onLogout = () => async (dispatch, getState) => {
  try {
    if (!getState().token) throw new Error();
    await server.post(
      "/users/logout",
      {},
      {
        headers: { Authorization: "Bearer " + getState().token },
      }
    );

    dispatch({ type: "LOGOUT", payload: null });
    localStorage.clear();
    history.push("/");
  } catch (error) {
    dispatch({ type: "LOGOUT_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const getNews = () => async (dispatch) => {
  try {
    const news = await finHub.get(`/news?`);

    const businessNews = news.data.filter((item) => {
      return item.category === "business";
    });

    dispatch({ type: "NEWS_FEED", payload: businessNews });
  } catch (error) {
    dispatch({ type: "NEWS_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const getSectors = () => async (dispatch) => {
  try {
    const res = await finPrep.get(`/sectors-performance?`);

    dispatch({ type: "GET_SECTORS", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_SECTORS_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const getActives = () => async (dispatch) => {
  try {
    const res = await finPrep.get(`/actives?`);

    dispatch({ type: "GET_ACTIVES", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_ACTIVES_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const getCompany = () => async (dispatch, getState) => {
  try {
    const res = await alphaVantage.get("/query?", {
      params: {
        function: "OVERVIEW",
        symbol: getState().selectedStock.stock,
      },
    });

    if (res.data.Note) throw new Error("API call limit reached");

    dispatch({ type: "GET_COMPANY", payload: res.data });
  } catch (error) {
    dispatch({ type: "GET_COMPANY_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const saveStock = () => async (dispatch, getState) => {
  const { token, company, user } = getState();

  try {
    const res = await server.patch(
      "/users/update",
      { savedStocks: [...user.savedStocks, company.Symbol] },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    dispatch(getUserInfo(res.data));
  } catch (error) {
    dispatch({ type: "TOGGLE_STOCK_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const removeStock = () => async (dispatch, getState) => {
  const { user, token, company } = getState();

  let updated = user.savedStocks.filter((stock) => stock !== company.Symbol);

  try {
    const res = await server.patch(
      "/users/update",
      { savedStocks: updated },
      { headers: { Authorization: "Bearer " + token } }
    );

    dispatch(getUserInfo(res.data));
  } catch (error) {
    dispatch({ type: "TOGGLE_STOCK_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const orgSeriesData = (timeSeries) => {
  let lastPrice = Number(timeSeries[0][1]["5. adjusted close"]);
  let firstPrice = Number(
    timeSeries[timeSeries.length - 1][1]["5. adjusted close"]
  );

  let color = firstPrice < lastPrice ? "greenyellow" : "red";

  let coords = timeSeries.map((date, i) => {
    let x = new Date(date[0]);
    let y = Number(date[1]["5. adjusted close"]);
    return { x, y };
  });

  return {
    type: "SERIES_DATA",
    payload: { coords, color },
  };
};

///////////////////////////////////////////
///////////////////////////////////////////

export const getTimeSeries = () => async (dispatch, getState) => {
  const { selectedStock } = getState();

  try {
    const res = await alphaVantage.get("/query?", {
      params: {
        function: "TIME_SERIES_DAILY_ADJUSTED",
        symbol: selectedStock.stock,
      },
    });
    if (res.data.Note) throw new Error();

    let data = Object.entries(res.data["Time Series (Daily)"]);

    dispatch(orgSeriesData(data));
  } catch (error) {
    dispatch({ type: "SERIES_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const onUserUpdate = (updates) => async (dispatch, getState) => {
  const { token } = getState();
  console.log(`called`);
  throw new Error();

  delete updates.confirmPassword;

  try {
    const res = await server.patch("/users/update", updates, {
      headers: { Authorization: "Bearer " + token },
    });

    dispatch(getUserInfo(res.data));
    history.push("/users/profile");
  } catch (error) {
    dispatch({ type: "USER_UPDATE_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const onSearch = (term) => async (dispatch) => {
  dispatch({ type: "SEARCH_LOADING", payload: "loading" });
  try {
    const res = await alphaVantage.get("/query?", {
      params: { function: "SYMBOL_SEARCH", keywords: term },
    });

    dispatch({ type: "SEARCH_RESULTS", payload: res.data.bestMatches });
  } catch (error) {
    dispatch({ type: "SEARCH_RESULTS_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

export const deleteUser = () => async (dispatch, getState) => {
  const { token } = getState();

  try {
    await server.delete("/users/profile", {
      headers: { Authorization: "Bearer " + token },
    });

    localStorage.clear();
    history.push("/");
    dispatch({ type: "DELETE_USER", payload: {} });
  } catch (error) {
    dispatch({ type: "DELETE_USER_ERROR", payload: error });
  }
};

///////////////////////////////////////////
///////////////////////////////////////////

const orgGlobalData = (data) => {
  let obj = {};

  data.map((entry, i) => {
    return (obj[entry[0].split(" ")[1]] = entry[1]);
  });
  obj.price = Number(obj.price).toFixed(2);

  if (Number(obj.change.slice(0, -1)) < 0) {
    obj.color = "red";
  } else {
    obj.color = "greenyellow";
  }

  return {
    type: "GLOBAL_QUOTE",
    payload: obj,
  };
};

///////////////////////////////////////////
///////////////////////////////////////////

export const getGlobalQuote = (stock) => async (dispatch) => {
  try {
    const res = await alphaVantage.get("/query?", {
      params: { function: "GLOBAL_QUOTE", symbol: stock },
    });
    if (res.data.Note) throw new Error();

    const entries = Object.entries(res.data["Global Quote"]);

    dispatch(orgGlobalData(entries));
  } catch (error) {
    dispatch({
      type: "GLOBAL_QUOTE_ERROR",
      payload: { symbol: stock, e: "error" },
    });
  }
};
