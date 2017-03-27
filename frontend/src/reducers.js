import { combineReducers } from 'redux';

const user = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_USER':
            return Object.assign({}, state, action.user);
       
        default:
            return {};
    }
};

const rootReducer = combineReducers({
    user
});

export { rootReducer as default };
