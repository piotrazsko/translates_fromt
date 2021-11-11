import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import viewport from "modules/viewport";
import webpReducer from "modules/webp";
export default combineReducers({
  router: routerReducer,
  webp: webpReducer,
  viewport,
});
