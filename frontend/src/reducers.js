import { combineReducers } from 'redux';

const user = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_USER':
        case 'LOGIN_SUCCESS':
        case 'CHECK_SESSION':
            return Object.assign({}, state, action.user);

        case 'LOGOUT_SUCCESS':
            return Object.assign({}, state, {
                email: ''
            });

        case 'LOGOUT_REQUEST':
        case 'LOGIN_REQUEST':
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user
});

export { rootReducer as default };
