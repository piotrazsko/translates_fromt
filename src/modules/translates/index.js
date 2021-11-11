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

export const getTranslatedListRequest = actionCreator(
  GET_LANGUAGES_LIST_REQUEST
);

apiRoutes.add(GET_LANGUAGES_LIST_REQUEST, ({ ...params }) => ({
  url: `/get-translates`,
  method: "get",
  params,
}));

export const getTranslatedListSelector = apiSelector(
  GET_LANGUAGES_LIST_REQUEST
);
