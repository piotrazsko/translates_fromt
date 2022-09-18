import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';
import get from 'lodash/get';
import { getViewport as defaultStateView } from 'app/utils/dom';

const defaultState = defaultStateView();
const modules = 'viewport';
const CHANGE_VIEWPORT = `${modules}/CHANGE_VIEWPORT`;
export const changeViewport = createAction(CHANGE_VIEWPORT);

//reducer
export default handleActions(
    {
        [changeViewport](state, action) {
            return action.payload;
        },
    },
    defaultState
);
//selectors
export const getViewport = state => get(state, 'viewport');
export const getIsHighHeight = state => get(state, 'viewport.isHigh');
