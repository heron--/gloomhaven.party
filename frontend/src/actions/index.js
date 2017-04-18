export function updateUser(user, userCharacters) {
    return {
        type: 'UPDATE_USER',
        user,
        userCharacters
    };
}

export function updateCurrentCharacter(values, detailType) {
    return {
        type: 'UPDATE_CURRENT_CHARACTER',
        values,
        detailType
    };
}

export function loginRequest(tokenObj, profileObj) {
    return {
        type: 'LOGIN_REQUEST',
        tokenObj,
        profileObj
    };
}

export function logoutRequest() {
    return {
        type: 'LOGOUT_REQUEST'
    };
}
