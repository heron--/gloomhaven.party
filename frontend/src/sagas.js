import { call, fork, put, takeLatest } from 'redux-saga/effects';
import API from './api';

function* loginRequest(action) {

    try {

        const loginRequestBody = {
            type: 'google',
            authData: action.tokenObj,
            profileDate: action.profileObj
        };

        const user = yield call(API.login, loginRequestBody);

        yield put({
            type: 'LOGIN_SUCCESS',
            user
        });

    } catch(e) {

        yield put({
            type: 'LOGIN_FAILURE',
            message: e.message
        });

    }

}

function* logoutRequest(action) {
    try {

        yield call(API.logout);

        yield put({
            type: 'LOGOUT_SUCCESS'
        });

    } catch(e) {

        yield put({
            type: 'LOGOUT_FAILURE',
            message: e.message
        });

    }
}

function* checkSession() {
    try {

        const user = yield call(API.checkSession);

        yield put({
            type: 'CHECK_SESSION',
            user: Object.assign({}, user, {
                initialCheck: true
            })
        });

    } catch(e) {

        yield put({
            type: 'CHECK_SESSION_FAILURE',
            message: e.message
        });

    }
}

function* getAllCharacterClasses() {
    try {

        const classes = yield call(API.getCharacterClasses);

        yield put({
            type: 'GET_CHARACTER_CLASSES',
            classes
        });

    } catch(e) {

        yield put({
            type: 'GET_CHARACTER_CLASSES_FAILURE',
            message: e.message
        });

    }
}

function* watchLoginRequest() {
    yield takeLatest('LOGIN_REQUEST', loginRequest);
}

function* watchLogoutRequest() {
    yield takeLatest('LOGOUT_REQUEST', logoutRequest);
}

function* mainSaga() {

    yield [
        fork(checkSession),
        fork(getAllCharacterClasses),
        fork(watchLoginRequest),
        fork(watchLogoutRequest)
    ];
}

export default mainSaga;
