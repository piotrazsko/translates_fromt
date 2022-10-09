// import * as api_helpers from 'react_redux_api';

import { createAction } from 'redux-actions';

const modules = 'sidebar';

export const EXPAND_SIDEBAR = `${modules}/EXPAND_SIDEBAR`;
export const COLLAPSE_SIDEBAR = `${modules}/COLLAPSE_SIDEBAR`;

//actions
//
export const expandSidebarAction = createAction(EXPAND_SIDEBAR);
export const collapseSidebarAction = createAction(COLLAPSE_SIDEBAR);

const inititalData = true;

export const sidebarReducer = function (state = inititalData, action) {
    switch (action.type) {
        case EXPAND_SIDEBAR: {
            return true;
        }
        case COLLAPSE_SIDEBAR: {
            return false;
        }
        default:
            return state;
    }
};

export const sideBarSelector = (state) => state.sidebar;
