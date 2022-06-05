import * as api_helpers from 'react_redux_api';

const modules = 'translates';

const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const GET_ALL_KEYS_REQUEST = `${modules}/GET_ALL_KEYS_REQUEST`;
export const GET_RECOMMENDED_TRANSLATE_REQUEST = `${modules}/GET_RECOMMENDED_TRANSLATE_REQUEST`;

export const GET_EXPORT_JSON_REQUEST = `${modules}/GET_EXPORT_JSON_REQUEST`;
export const POST_UPLOAD_LANG_JSON_REQUEST = `${modules}/POST_UPLOAD_LANG_JSON_REQUEST`;

export const POST_IMPORT_JSON_REQUEST = `${modules}/POST_IMPORT_JSON_REQUEST`;
export const GET_TRANSLATES_BY_KEY_REQUEST = `${modules}/GET_TRANSLATES_BY_KEY_REQUEST`;
export const SET_TRANSLATES_BY_KEY_REQUEST = `${modules}/SET_TRANSLATES_BY_KEY_REQUEST`;
export const DELETE_TRANSLATES_BY_KEY_AND_LANGUAGE_REQUEST = `${modules}/DELETE_TRANSLATES_BY_KEY_AND_LANGUAGE_REQUEST`;
export const DELETE_TRANSLATE_BY_KEY_REQUEST = `${modules}/DELETE_TRANSLATE_BY_KEY_REQUEST`;
export const DELETE_ALL_TRANSLATES_REQUEST = `${modules}/DELETE_ALL_TRANSLATES_REQUEST`;

export const getTranslatedListRequest = actionCreator(GET_ALL_KEYS_REQUEST);
export const getRecommendedTranslateRequest = actionCreator(
    GET_RECOMMENDED_TRANSLATE_REQUEST,
);

export const getExportJsonRequest = actionCreator(GET_EXPORT_JSON_REQUEST);

export const postUploadJsonByLangRequest = actionCreator(
    POST_UPLOAD_LANG_JSON_REQUEST,
);
export const postImportJsonRequest = actionCreator(POST_IMPORT_JSON_REQUEST);

export const getTranslatesByKeyRequest = actionCreator(
    GET_TRANSLATES_BY_KEY_REQUEST,
);
export const setTranslatesByKeyRequest = actionCreator(
    SET_TRANSLATES_BY_KEY_REQUEST,
);
export const deleteTranslatesByKeyAndLangRequest = actionCreator(
    DELETE_TRANSLATES_BY_KEY_AND_LANGUAGE_REQUEST,
);
export const deleteTranslateByKeyRequest = actionCreator(
    DELETE_TRANSLATE_BY_KEY_REQUEST,
);
export const deleteAllTranslatesAction = actionCreator(
    DELETE_ALL_TRANSLATES_REQUEST,
);

apiRoutes.add(GET_ALL_KEYS_REQUEST, ({ applicationId, ...params } = {}) => ({
    url: `/get-all-keys`,
    method: 'get',
    params: { ...params, applicationId },
}));

apiRoutes.add(
    GET_RECOMMENDED_TRANSLATE_REQUEST,
    ({ currentLang, text, translateToLang }) => ({
        url: `/get-recommended-translate`,
        method: 'get',
        params: {
            currentLang,
            text,
            translateToLang,
        },
    }),
);

apiRoutes.add(GET_EXPORT_JSON_REQUEST, () => ({
    url: `/export-json`,
    method: 'get',
    params: { applicationId: 'appID87b9abb0d07b' },
    // params,
}));
apiRoutes.add(POST_IMPORT_JSON_REQUEST, (data) => {
    return {
        url: `/import-json`,
        method: 'post',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
    };
});
apiRoutes.add(POST_UPLOAD_LANG_JSON_REQUEST, (data) => {
    return {
        url: `/import-lang-json`,
        method: 'post',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
    };
});

apiRoutes.add(GET_TRANSLATES_BY_KEY_REQUEST, ({ key, namespace = 'null' }) => ({
    url: `/get-translate`,
    method: 'get',
    params: { namespace, key, applicationId: 'appID87b9abb0d07b' },
}));

apiRoutes.add(
    SET_TRANSLATES_BY_KEY_REQUEST,
    ({ key, namespace = 'null', translates }) => ({
        url: `/set-translate`,
        method: 'PUT',
        data: { key, namespace, translates },
    }),
);

apiRoutes.add(
    DELETE_TRANSLATES_BY_KEY_AND_LANGUAGE_REQUEST,
    ({ key, namespace = 'null', language }) => {
        return {
            url: `/delete-translate`,
            method: 'DELETE',
            params: {
                key,
                namespace,
                language,
                applicationId: 'appID9e20e4908641',
            },
        };
    },
);

apiRoutes.add(
    DELETE_TRANSLATE_BY_KEY_REQUEST,
    ({ key, namespace = 'null' }) => ({
        url: `/delete-all-translates-by-key`,
        method: 'DELETE',
        params: { key, namespace, applicationId: 'appID9e20e4908641' },
    }),
);

apiRoutes.add(DELETE_ALL_TRANSLATES_REQUEST, () => ({
    url: `/delete-all-translates`,
    method: 'DELETE',
    params: { applicationId: 'appID9e20e4908641' },
}));

export const getTranslatedListSelector = apiSelector(GET_ALL_KEYS_REQUEST);
export const getTranslatesByKeySelector = apiSelector(
    GET_TRANSLATES_BY_KEY_REQUEST,
);
export const exportJSONSelector = apiSelector(GET_EXPORT_JSON_REQUEST);
export const getRecommenndedTranslateSelector = apiSelector(
    GET_RECOMMENDED_TRANSLATE_REQUEST,
);
