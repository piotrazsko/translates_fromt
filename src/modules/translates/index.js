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
export const SET_TRANSLATES_BY_KEY_REQUEST = `${modules}/SET_TRANSLATES_BY_KEY_REQUEST`;
export const DELETE_TRANSLATES_BY_KEY_AND_LANGUAGE_REQUEST = `${modules}/DELETE_TRANSLATES_BY_KEY_AND_LANGUAGE_REQUEST`;
export const DELETE_TRANSLATE_BY_KEY_REQUEST = `${modules}/DELETE_TRANSLATE_BY_KEY_REQUEST`;

export const getTranslatedListRequest = actionCreator(
  GET_LANGUAGES_LIST_REQUEST
);
export const getTranslatesByKeyRequest = actionCreator(
  GET_TRANSLATES_BY_KEY_REQUEST
);
export const setTranslatesByKeyRequest = actionCreator(
  SET_TRANSLATES_BY_KEY_REQUEST
);
export const deleteTranslatesByKeyAndLangRequest = actionCreator(
  DELETE_TRANSLATES_BY_KEY_AND_LANGUAGE_REQUEST
);
export const deleteTranslateByKeyRequest = actionCreator(
  DELETE_TRANSLATE_BY_KEY_REQUEST
);

apiRoutes.add(GET_LANGUAGES_LIST_REQUEST, ({ ...params }) => ({
  url: `/get-all-keys`,
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
apiRoutes.add(
  SET_TRANSLATES_BY_KEY_REQUEST,
  ({ key, apiKey = "test", namespace = "null", translates }) => ({
    url: `/set-translate`,
    method: "PUT",
    data: { key, apiKey, namespace, translates },
  })
);

apiRoutes.add(
  DELETE_TRANSLATES_BY_KEY_AND_LANGUAGE_REQUEST,
  ({ key, apiKey = "test", namespace = "null", language }) => {
    return {
      url: `/delete-translates`,
      method: "DELETE",
      params: { key, apiKey, namespace, language },
    };
  }
);

apiRoutes.add(
  DELETE_TRANSLATE_BY_KEY_REQUEST,
  ({ key, apiKey = "test", namespace = "null" }) => ({
    url: `/delete-all-translates`,
    method: "DELETE",
    params: { key, apiKey, namespace },
  })
);

export const getTranslatedListSelector = apiSelector(
  GET_LANGUAGES_LIST_REQUEST
);
export const getTranslatesByKeySelector = apiSelector(
  GET_TRANSLATES_BY_KEY_REQUEST
);
