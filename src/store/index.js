import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import history from "./history";
import config from "config/dev";
import rootReducer from "../modules/reducers/index.js";

const createStoreApp = () => {
  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  /* ------------- Router Middleware ------------- */
  middleware.push(routerMiddleware(history));

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware));

  const composeEnhancers =
    (config.isActiveDevTool && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const store = createStore(rootReducer, composeEnhancers(...enhancers));

  // kick off root saga

  return { store };
};
export const { store } = createStoreApp();
