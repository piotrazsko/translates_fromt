import * as api_helpers from 'react_redux_api';

const modules = 'plans';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_PLANS_REQUEST = `${modules}/GET_PLANS_REQUEST`;
export const UPDATE_USER_PLAN_REQUEST = `${modules}/UPDATE_USER_PLAN_REQUEST`;

export const getPlansRequest = actionCreator(GET_PLANS_REQUEST);
export const updateUserPlanRequest = actionCreator(UPDATE_USER_PLAN_REQUEST);

apiRoutes.add(GET_PLANS_REQUEST, ({ applicationId } = {}) => ({
    url: `/plans`,
    method: 'get',
}));

apiRoutes.add(UPDATE_USER_PLAN_REQUEST, ({ planId } = {}) => ({
    url: `/plans`,
    method: 'PATCH',
    data: { planId },
}));

export const getPlansSelector = apiSelector(GET_PLANS_REQUEST);
