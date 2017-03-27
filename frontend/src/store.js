import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger();

const initialState = {
    user: {}
};

function configureStore(initalState) {
    const devStore = createStore(
        rootReducer,
        initalState,
        applyMiddleware(logger)
    );

    const prodStore = createStore(
        rootReducer,
        initalState
    );

    return process.env.NODE_ENV === 'development' ? devStore : prodStore;
}

export const store = configureStore(initialState);
