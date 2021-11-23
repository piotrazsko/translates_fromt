import * as api_helpers from 'api';
import { createAction } from 'redux-actions';
import { call, put, takeEvery, select, all } from 'redux-saga/effects';
const modules = 'auth';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const LOGIN_USER_REQUEST = `${modules}/LOGIN_USER_REQUEST`;

export const RESET_PASSWORD_REQUEST = `${modules}/RESET_PASSWORD_REQUEST`;
export const RESET_PASSWORD_SUCCESS = `${modules}/RESET_PASSWORD_SUCCESS`;

export const CHANGE_PASSWORD_REQUEST = `${modules}/CHANGE_PASSWORD_REQUEST`;
export const CHANGE_PASSWORD_SUCCESS = `${modules}/CHANGE_PASSWORD_SUCCESS`;

export const LOGIN_USER_SUCCESS = `${modules}/LOGIN_USER_SUCCESS`;
export const LOGIN_USER_FAILED = `${modules}/LOGIN_USER_FAILED`;
export const REGISTER_USER_REQUEST = `${modules}/REGISTER_USER_REQUEST`;
export const REGISTER_USER_SUCCESS = `${modules}/REGISTER_USER_SUCCESS`;
export const LOGOUT_USER_REQUEST = `${modules}/LOGOUT_USER_REQUEST`;
export const LOGOUT_USER_SUCCESS = `${modules}/LOGOUT_USER_SUCCESS`;
export const LOGOUT_USER = `${modules}/LOGOUT_USER`;

export const UPDATE_USER_REQUEST = `${modules}/UPDATE_USER_REQUEST`;
export const UPDATE_USER_SUCCESS = `${modules}/UPDATE_USER_SUCCESS`;

export const loginRequest = actionCreator(LOGIN_USER_REQUEST, {
    preventFailure: false,
});
export const resetPasswordRequest = actionCreator(RESET_PASSWORD_REQUEST, {
    preventFailure: false,
});
export const registerRequest = actionCreator(REGISTER_USER_REQUEST);
export const logoutRequest = actionCreator(LOGOUT_USER_REQUEST);
export const changePasswordRequest = actionCreator(CHANGE_PASSWORD_REQUEST);

export const updateUserRequest = actionCreator(UPDATE_USER_REQUEST);

export const logoutAction = createAction(LOGOUT_USER);

apiRoutes.add(LOGIN_USER_REQUEST, ({ ...data }) => ({
    url: `/login`,
    method: 'post',
    data,
}));

apiRoutes.add(UPDATE_USER_REQUEST, ({ ...data }) => ({
    url: `/update-user`,
    method: 'patch',
    data,
}));

apiRoutes.add(RESET_PASSWORD_REQUEST, ({ ...data }) => ({
    url: `/reset-password`,
    method: 'post',
    data,
}));

apiRoutes.add(CHANGE_PASSWORD_REQUEST, ({ ...data }) => ({
    url: `/change-password`,
    method: 'post',
    data,
}));

apiRoutes.add(REGISTER_USER_REQUEST, ({ ...data }) => ({
    url: `/register`,
    method: 'post',
    data,
}));

apiRoutes.add(LOGOUT_USER_REQUEST, () => ({
    url: `/logout`,
    method: 'get',
}));

const initialState = {};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS: {
            const {
                response: { data },
            } = action;
            return { ...state, ...data };
        }
        case REGISTER_USER_SUCCESS: {
            const {
                response: { data },
            } = action;
            return { ...state, ...data };
        }
        case UPDATE_USER_SUCCESS: {
            const {
                response: { data },
            } = action;
            return { ...state, ...data };
        }
        case LOGOUT_USER_SUCCESS:
            return { ...initialState };
        case LOGIN_USER_FAILED: {
            return { ...initialState };
        }
        default:
            return state;
    }
};

export function* logoutSaga() {
    yield put(logoutRequest());
}

export function* authSaga(dispatch) {
    yield all([takeEvery(LOGOUT_USER, logoutSaga)]);
}

export const userDataSelector = (state) => state.auth;
export const userIsAuthSelector = (state) => state.auth.hash;
export const authHashSelector = (state) => state.auth.token;

export const loginUserSelector = apiSelector(LOGIN_USER_REQUEST);
export const registerUserSelector = apiSelector(LOGIN_USER_REQUEST);
export const Selector = apiSelector(LOGIN_USER_REQUEST);
export const updateUserSelector = apiSelector(LOGIN_USER_REQUEST);
