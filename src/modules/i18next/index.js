import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import get from 'lodash/get';
import { createAction } from 'redux-actions';
import moment from 'moment';
import * as locales from 'date-fns/locale';

import {
    all,
    put,
    fork,
    select,
    call,
    takeLatest,
    delay,
} from 'redux-saga/effects';
import * as api_helpers from 'api';
import { INIT_DATA, reInitDataAction } from '../init';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const modules = 'translate';

export const GET_TRANSLATE_REQUEST = `${modules}/GET_TRANSLATE_REQUEST`;
export const SAVE_SELECTED_LOCALE_ACTION = `${modules}/SAVE_SELECTED_LOCALE_ACTION`;
export const GET_TRANSLATE_SUCCESS = `${modules}/GET_TRANSLATE_SUCCESS`;

export const getTranslateAction = actionCreator(GET_TRANSLATE_REQUEST);
export const saveLocaleAction = createAction(SAVE_SELECTED_LOCALE_ACTION);

export const DEFAULT_LANG = 'en';

const apiRoutes = new ApiRoutes();

i18next
    // .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: DEFAULT_LANG,
        compatibilityJSON: 'v1',
        debug: false,
        saveMissing: true,
        // defaultNS: 'default',
        resources: {},
    });

i18next.on('loaded', function(loaded) {
    console.log('loaded', loaded);
});

apiRoutes.add(GET_TRANSLATE_REQUEST, ({ locale }) => {
    return {
        url: `/get-translates`,
        method: 'GET',
        params: {
            language: locale,
            apiKey: 'test',
        },
        showLoaderFlag: false,
    };
});

// reducers
const initialState = { lang: DEFAULT_LANG };

export const i18nextReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_SELECTED_LOCALE_ACTION: {
            const { payload } = action;

            return { ...state, lang: payload };
        }

        // Default
        default: {
            return state;
        }
    }
};

//sagas
const getTranslateSaga = function*() {
    const locale = yield select(localeSelector);
    i18next.changeLanguage(locale);
    yield put(
        getTranslateAction(
            { locale },
            {
                onSuccess: () => {},
            },
        ),
    );
};

const getTranslateByActionSaga = function*(dispatch, action) {
    const { payload: locale } = action;
    i18next.changeLanguage(locale);
    yield put(
        getTranslateAction(
            { locale },
            {
                onSuccess: () => {},
            },
        ),
    );
};

const getTranslateSuccessSaga = function*() {
    const { loaded, ...translates } = yield select(getTranslatesSelector);
    const locale = yield select(localeSelector);
    i18next.addResourceBundle(locale, 'translation', translates[locale]);
    i18next.changeLanguage(locale);
    yield put(reInitDataAction());
};

export const i18nextModuleSaga = function*(dispatch) {
    yield all([
        takeLatest([INIT_DATA], getTranslateSaga, dispatch),
        takeLatest([GET_TRANSLATE_SUCCESS], getTranslateSuccessSaga, dispatch),
        takeLatest(
            [SAVE_SELECTED_LOCALE_ACTION],
            getTranslateByActionSaga,
            dispatch,
        ),
        takeLatest(
            [SAVE_SELECTED_LOCALE_ACTION, GET_TRANSLATE_SUCCESS],
            dispatch,
        ),
    ]);
};

//selectors
export const getTranslatesSelector = apiSelector(GET_TRANSLATE_REQUEST);
export const localeSelector = (state) => get(state, 'locale.lang');

export default i18next;
