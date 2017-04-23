import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import mainSaga from './sagas';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const settingsMiddleware = store => next => action => {

    if(action.type === 'UPDATE_USER_SETTINGS') {

        const storageKey = store.getState().user.settings.storageKey;
        const storeUpdate = {
            [action.key]: action.value
        };

        let currentStore;

        try {

            currentStore = JSON.parse(localStorage.getItem(storageKey));

        } catch(e) {

            console.error('Local storage parse error');
            currentStore = {};

        }

        if(typeof currentStore === 'undefined') {

            localStorage.setItem(storageKey, JSON.stringify(storeUpdate));

        } else {

            localStorage.setItem(storageKey, JSON.stringify(Object.assign({}, currentStore, storeUpdate)));

        }

        return next(Object.assign({}, action, {
            settings: Object.assign({}, currentStore, storeUpdate)
        }));
         
    }

    if(action.type === 'INIT_USER_SETTINGS') {
        const storageKey = store.getState().user.settings.storageKey;
        let currentStore;

        try {

            currentStore = JSON.parse(localStorage.getItem(storageKey));

        } catch(e) {
            
            console.error('Local storage parse error');
            currentStore = {};

        }

        return next(Object.assign({}, action, {
            settings: currentStore
        }));
    }

    return next(action); 
}

const initialState = {
    user: {
        email: '',
        initialCheck: false,
        settings: {
            'storageKey': 'gloomhaven.party'
        }
    },
    character: {
        classes: [],
        userCharacters: [],
        currentCharacter: {}
    }
};

const stores = {
    development: () => createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware, settingsMiddleware, logger)
    ),
    production: () => createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware, settingsMiddleware)
    )
};

export const store = stores[process.env.NODE_ENV]();

sagaMiddleware.run(mainSaga);

