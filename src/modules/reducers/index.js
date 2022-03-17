// import { routerReducer } from "react-router-redux";
// import { combineReducers } from "redux";
// import viewport from "modules/viewport";
// import webpReducer from "modules/webp";
// export default combineReducers({
//   router: routerReducer,
//   webp: webpReducer,
//   viewport,
// });

import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import { popupsReducer } from 'modules/popups';
import { createTransform } from 'redux-persist';
import localForage from 'localforage';
import * as apiHelpers from 'react_redux_api';
import viewport from 'modules/viewport';
import { i18nextReducer } from 'modules/i18next';
import { authReducer } from 'modules/auth';
import notificationsReducer from 'modules/notification';

const SetTransform = createTransform((inboundState) => {
    const { saveToPersist = true, ...state } = inboundState;
    return saveToPersist && { ...state };
});
const {
    modules: { apiDefaultReducer },
} = apiHelpers;

const persistConfig = {
    key: 'root',
    storage: localForage,
    version: 0,
    whitelist: ['auth'],
    // transforms: [SetTransform],
};

export default persistCombineReducers(persistConfig, {
    api: apiDefaultReducer,
    viewport,
    router: routerReducer,
    popups: popupsReducer,
    locale: i18nextReducer,
    auth: authReducer,
    notification: notificationsReducer,
});
