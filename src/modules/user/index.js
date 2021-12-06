import * as api_helpers from 'api';
import { createAction } from 'redux-actions';
import { call, put, takeEvery, select, all } from 'redux-saga/effects';
const modules = 'user';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_USER_REQUEST = `${modules}/GET_USER_REQUEST`;

export const getUserRequst = actionCreator(GET_USER_REQUEST);

apiRoutes.add(GET_USER_REQUEST, () => {
    return {
        url: `/user`,
        method: 'GET',
    };
});
export const getUserSelector = apiSelector(GET_USER_REQUEST);
