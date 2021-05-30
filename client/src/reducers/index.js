import { combineReducers } from "redux";
import { stockReducer } from "./stockReducer";
import { tokenReducer } from "./tokenReducer";
import { userReducer } from "./userReducer";
import { errorReducer } from "./errorReducer";
import { newsReducer } from "./newsReducer";
import { sectorsReducer } from "./sectorsReducer";
import { activesReducer } from "./activesReducer";
import { companyReducer } from "./companyReducer";
import { seriesReducer } from "./seriesReducer";
import { resultsReducer } from "./resultsReducers";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  token: tokenReducer,
  selectedStock: stockReducer,
  user: userReducer,
  error: errorReducer,
  newsFeed: newsReducer,
  sectors: sectorsReducer,
  actives: activesReducer,
  company: companyReducer,
  seriesData: seriesReducer,
  searchResults: resultsReducer,
  form: formReducer,
});
