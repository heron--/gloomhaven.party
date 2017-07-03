import { call, fork, put, takeLatest } from 'redux-saga/effects';
import API from './api';

function* loginRequest(action) {

    try {

        const loginRequestBody = {
            type: 'google',
            authData: action.tokenObj,
            profileData: action.profileObj
        };

        const data = yield call(API.login, loginRequestBody);

        const user = typeof data.user !== 'undefined' ? data.user : {};
        const userCharacters = typeof data.userCharacters !== 'undefined' ? data.userCharacters : [];

        yield put({
            type: 'LOGIN_SUCCESS',
            user,
            userCharacters
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

function* characterListRequest(action) {
    try {

        const data = yield call(API.getCharacterList, { userEmail: action.userEmail });

        const characters = typeof data.userCharacters !== 'undefined' ? data.userCharacters : [];

        yield put({
            type: 'FETCH_CHARACTER_LIST_SUCCESS',
            characters
        });

    } catch(e) {
        yield put({
            type: 'FETCH_CHARACTER_LIST_ERROR'
        });
    }
}

function* checkSession() {
    try {

        const data = yield call(API.checkSession);

        const user = typeof data.user !== 'undefined' ? data.user : {};
        const userCharacters = typeof data.userCharacters !== 'undefined' ? data.userCharacters : [];

        yield put({
            type: 'CHECK_SESSION',
            user: Object.assign({}, user, {
                initialCheck: true
            }),
            userCharacters
        });

    } catch(e) {

        yield put({
            type: 'CHECK_SESSION_FAILURE',
            message: e.message
        });

    }
}

function* characterUpdate(action) {
    
    if(action.detailType === 'create') {
        return;
    }

    try {

        const {
            values: updateValues,
            currentCharacter
        } = action;

        if(typeof updateValues.id === 'undefined' && currentCharacter.id === 'undefined') {
            throw new Error('Character id not defined');
        }

        const character = yield call(API.updateCharacter, Object.assign({}, currentCharacter, updateValues));

        yield put({
            type: 'UPDATE_CHARACTER_REQUEST_SUCCESS',
            character
        });

    } catch(e) {

        yield put({
            type: 'UPDATE_CHARACTER_REQUEST_FAILURE',
            message: e.message
        });

    }
}

function* characterCreate(action) {
    try {

        const {
            currentCharacter
        } = action;

        const character = yield call(API.createCharacter, currentCharacter);

        yield put({
            type: 'CREATE_CHARACTER_REQUEST_SUCCESS',
            character
        });

    } catch(e) {

        yield put({
            type: 'CREATE_CHARACTER_REQUEST_FAILURE',
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

function* watchUpdateCharacter() {
    yield takeLatest('UPDATE_CURRENT_CHARACTER', characterUpdate);
}

function* watchCreateCharacter() {
    yield takeLatest('CREATE_CHARACTER_REQUEST', characterCreate);
}

function* watchCharacterRequest() {
    yield takeLatest('FETCH_CHARACTER_LIST', characterListRequest) ;
}

function* mainSaga() {

    yield [
        fork(checkSession),
        fork(getAllCharacterClasses),
        fork(watchLoginRequest),
        fork(watchLogoutRequest),
        fork(watchUpdateCharacter),
        fork(watchCreateCharacter),
        fork(watchCharacterRequest)
    ];
}

export default mainSaga;
