import * as api_helpers from "api";
import { createAction } from "redux-actions";
import { call, put, takeEvery, select, all } from "redux-saga/effects";
import { INIT_DATA } from "modules/init";

const modules = "languages";
const {
  helpers: { actionCreator, apiSelector },
  modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_LANGUAGES_LIST_REQUEST = `${modules}/GET_LANGUAGES_LIST_REQUEST`;
export const GET_TRANSLATES_BY_KEY_REQUEST = `${modules}/GET_TRANSLATES_BY_KEY_REQUEST`;

export const getTranslatedListRequest = actionCreator(
  GET_LANGUAGES_LIST_REQUEST
);
export const getTranslatesByKeyRequest = actionCreator(
  GET_TRANSLATES_BY_KEY_REQUEST
);

apiRoutes.add(GET_LANGUAGES_LIST_REQUEST, ({ ...params }) => ({
  url: `/get-translates`,
  method: "get",
  params,
}));

apiRoutes.add(
  GET_TRANSLATES_BY_KEY_REQUEST,
  ({ key, apiKey = "test", namespace = "null" }) => ({
    url: `/get-translate`,
    method: "get",
    params: { apiKey, namespace, key },
  })
);

export const getTranslatedListSelector = apiSelector(
  GET_LANGUAGES_LIST_REQUEST
);
export const getTranslatesByKeySelector = apiSelector(
  GET_TRANSLATES_BY_KEY_REQUEST
);
