import * as api_helpers from 'react_redux_api';

const modules = 'statistics';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_STATISTICS_BY_APP_REQUEST = `${modules}/GET_STATISTICS_BY_APP_REQUEST`;
export const GET_COMMON_STATISSTICS_REQUEST = `${modules}/GET_COMMON_STATISSTICS_REQUEST`;
export const GET_APPLICATIONS_STATISTICS_BY_APP_REQUEST = `${modules}/GET_APPLICATIONS_STATISTICS_BY_APP_REQUEST`;

export const getStatisticsByApplicationRequest = actionCreator(
    GET_STATISTICS_BY_APP_REQUEST,
);
export const getApplicationsStatisticsRequest = actionCreator(
    GET_APPLICATIONS_STATISTICS_BY_APP_REQUEST,
);

export const getCommonStatissticsRequset = actionCreator(
    GET_COMMON_STATISSTICS_REQUEST,
);

apiRoutes.add(GET_STATISTICS_BY_APP_REQUEST, ({ applicationId } = {}) => ({
    url: `/statistics/${applicationId}`,
    method: 'get',
}));

apiRoutes.add(GET_APPLICATIONS_STATISTICS_BY_APP_REQUEST, () => ({
    url: `/applications-statisctic`,
    method: 'get',
}));

apiRoutes.add(GET_COMMON_STATISSTICS_REQUEST, () => ({
    url: `/statistics`,
    method: 'get',
}));

export const getCommonStatisticsSelector = apiSelector(
    GET_COMMON_STATISSTICS_REQUEST,
);

export const getStatisticsByApplicationSelector = apiSelector(
    GET_STATISTICS_BY_APP_REQUEST,
);
export const getApplicationsStatisticsSelector = apiSelector(
    GET_APPLICATIONS_STATISTICS_BY_APP_REQUEST,
);
