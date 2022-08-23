import * as api_helpers from 'react_redux_api';

const modules = 'statistics';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_STATISTICS_BY_APP_REQUEST = `${modules}/GET_STATISTICS_BY_APP_REQUEST`;

export const getStatisticsByApplicationRequest = actionCreator(
    GET_STATISTICS_BY_APP_REQUEST,
);

apiRoutes.add(GET_STATISTICS_BY_APP_REQUEST, ({ applicationId } = {}) => ({
    url: `/statistics/${applicationId}`,
    method: 'get',
}));

export const getStatisticsByApplicationSelector = apiSelector(
    GET_STATISTICS_BY_APP_REQUEST,
);