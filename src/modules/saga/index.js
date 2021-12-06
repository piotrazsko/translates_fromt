import { all, put, select, delay, call } from 'redux-saga/effects';
import * as apiHelpers from 'api';
import { set, get } from 'lodash';
import history from 'store/history';
import { initModuleSaga } from '../init';
import { i18nextModuleSaga } from 'modules/i18next';
import { authSaga, authHashSelector } from 'modules/auth';
import { notificationSaga, showError, showSuccess } from 'modules/notification';
// const config = process.env.NODE_ENV === 'development' ? devConf : prodConf;
const {
    modules: { apiWatchRequest },
    axios: { init },
} = apiHelpers;

if (process.env.NODE_ENV == 'development') {
    // init('http://localhost:3001');
    init('https://translates.goman.live');
} else if (process.env.NODE_ENV == 'production') {
    init('https://translates.goman.live');
}

// TODO:  need refactoring

function* rootSaga(dispatch) {
    yield all([
        apiWatchRequest({
            additiveCallback: function*({ showLoaderFlag = true, ...data }) {
                //show loader
                if (showLoaderFlag) {
                    // yield put(showLoader());
                }

                // add credentials for  request
                const credentials = yield select(authHashSelector);
                if (credentials) {
                    set(data, 'headers.Authorization', `${credentials}`);
                }
                return data;
            },
            successCallback: function*(data) {
                // yield put(hideLoader());
                if (
                    data.config.method === 'put' ||
                    data.config.method === 'post' ||
                    data.config.method === 'delete'
                ) {
                    console.log(data);
                    const message = get(data, 'data.message');
                    if (message) {
                        yield put(showSuccess({ message }));
                    } else {
                        yield put(
                            showSuccess({ message: 'Successful operation.' }),
                        );
                    }
                }
            },
            failedCallback: function*(data) {
                const dataStatus = data.status;
                // redirect to login
                // yield put(hideLoader());
                switch (true) {
                    case dataStatus === 401:
                        yield call(history.push, '/login');
                        return;
                    case dataStatus === 500:
                        yield put(
                            showError({ message: 'Internal server error.' }),
                        );
                        return;
                    case dataStatus === 406: {
                        const message = get(
                            data,
                            'response.data.message',
                            'Internal server error.',
                        );
                        yield put(showError({ message }));
                        return;
                    }
                    case dataStatus === 403: {
                        const message = get(
                            data,
                            'response.data.message',
                            'Internal server error.',
                        );
                        yield put(showError({ message }));
                        return;
                    }
                    default: {
                        const error = get(data, 'response.data.error');
                        if (
                            typeof error === 'object' &&
                            error.type === 'popup'
                        ) {
                            yield put(showError({ message: error.message }));
                        }
                        return;
                    }
                }
            },
        }),
        initModuleSaga(dispatch),
        authSaga(dispatch),
        i18nextModuleSaga(dispatch),
        notificationSaga(dispatch),
    ]);
}

export default rootSaga;
