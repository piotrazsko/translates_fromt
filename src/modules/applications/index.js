import * as api_helpers from 'react_redux_api';

const modules = 'applications';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_ALL_APPLICATIONS_REQUEST = `${modules}/GET_ALL_APPLICATIONS_REQUEST`;

export const getApplicationsListRequest = actionCreator(
    GET_ALL_APPLICATIONS_REQUEST,
);

apiRoutes.add(GET_ALL_APPLICATIONS_REQUEST, ({ ...params } = {}) => ({
    url: `/applications`,
    method: 'get',
    params: { ...params },
}));

export const getApplicationsListSelector = apiSelector(
    GET_ALL_APPLICATIONS_REQUEST,
);
