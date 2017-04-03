export function updateUser(user) {
    return {
        type: 'UPDATE_USER',
        user
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
