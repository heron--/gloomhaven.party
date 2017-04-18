import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import mainSaga from './sagas';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const initialState = {
    user: {
        email: '',
        initialCheck: false
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
        applyMiddleware(sagaMiddleware, logger)
    ),
    production: () => createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
    )
}

export const store = stores[process.env.NODE_ENV]();

sagaMiddleware.run(mainSaga);

