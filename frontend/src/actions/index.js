export function updateUserSettings(key, value) {
    return {
        type: 'UPDATE_USER_SETTINGS',
        key,
        value
    };
}

export function initializeUserSettings() {
    return {
        type: 'INIT_USER_SETTINGS'
    } 
}

export function updateUser(user, userCharacters) {
    return {
        type: 'UPDATE_USER',
        user,
        userCharacters
    };
}

export function updateCurrentCharacter(values, detailType, currentCharacter) {
    return {
        type: 'UPDATE_CURRENT_CHARACTER',
        values,
        detailType,
        currentCharacter
    };
}

export function resetCurrentCharacter(values, detailType) {
    return {
        type: 'RESET_CURRENT_CHARACTER',
        values,
        detailType
    }
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
