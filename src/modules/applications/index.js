import * as api_helpers from 'react_redux_api';

const modules = 'applications';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_ALL_APPLICATIONS_REQUEST = `${modules}/GET_ALL_APPLICATIONS_REQUEST`;
export const ADD_APPLICATION_REQUEST = `${modules}/ADD_APPLICATION_REQUEST`;
export const DELETE_APPLICATION_REQUEST = `${modules}/DELETE_APPLICATION_REQUEST`;

export const getApplicationsListRequest = actionCreator(
    GET_ALL_APPLICATIONS_REQUEST,
);
export const addApplicationRequest = actionCreator(ADD_APPLICATION_REQUEST);
export const deleteApplicationRequest = actionCreator(
    DELETE_APPLICATION_REQUEST,
);

apiRoutes.add(GET_ALL_APPLICATIONS_REQUEST, ({ ...params } = {}) => ({
    url: `/applications`,
    method: 'get',
    params: { ...params },
}));

apiRoutes.add(ADD_APPLICATION_REQUEST, ({ ...data } = {}) => ({
    url: `/set-application`,
    method: 'post',
    data: { ...data },
}));

apiRoutes.add(DELETE_APPLICATION_REQUEST, ({ applicationId } = {}) => ({
    url: `/delete-application`,
    method: 'delete',
    params: { applicationId },
}));

export const getApplicationsListSelector = apiSelector(
    GET_ALL_APPLICATIONS_REQUEST,
);
