import { combineReducers } from "redux";
import { stockReducer } from "./stockReducer";
import { tokenReducer } from "./tokenReducer";
import { userReducer } from "./userReducer";
import { newsReducer } from "./newsReducer";
import { sectorsReducer } from "./sectorsReducer";
import { activesReducer } from "./activesReducer";
import { companyReducer } from "./companyReducer";
import { seriesReducer } from "./seriesReducer";
import { resultsReducer } from "./resultsReducers";
import { globalQuoteReducer } from "./globalQuoteReducer";
import { modalReducer } from "./modalReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  token: tokenReducer,
  selectedStock: stockReducer,
  user: userReducer,
  newsFeed: newsReducer,
  sectors: sectorsReducer,
  actives: activesReducer,
  company: companyReducer,
  seriesData: seriesReducer,
  searchResults: resultsReducer,
  globalQuotes: globalQuoteReducer,
  modal: modalReducer,
  form: formReducer,
});
