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

const currentCharacter = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_CURRENT_CHARACTER':
            return Object.assign({}, state, action.values);

        default:
            return state;
    }
};

const userCharacter = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_CURRENT_CHARACTER':

            if(state.id === action.currentCharacter.id) {
                return Object.assign({}, state, action.values);
            }

            return state;

        default:
            return state;
    }
};

const character = (state = {}, action) => {
    switch(action.type) {
        case 'GET_CHARACTER_CLASSES':
            return Object.assign({}, state, {
                classes: action.classes
            });

        case 'LOGIN_SUCCESS':
        case 'CHECK_SESSION':
            return Object.assign({}, state, {
                userCharacters: action.userCharacters
            });

        case 'UPDATE_CURRENT_CHARACTER':
            return Object.assign({}, state, {
                userCharacters: state.userCharacters.map(uc => {
                    if(uc.id === action.currentCharacter.id) {
                        return userCharacter(uc, action);
                    } else {
                        return uc;
                    }
                }),
                currentCharacter: currentCharacter(state.currentCharacter, action)
            });

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user,
    character
});

export { rootReducer as default };
