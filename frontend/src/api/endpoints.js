export const devEndpoints = {
    login: '/api/auth/login',
    checkSession: '/api/user/check-session'
};

const stageEndpoints = {
    login: 'http://stage.gloomhaven.party/api/auth/login',
    checkSession: 'http://stage.gloomhaven.party/api/user/check-session'
};

const prodEndpoints = {
    login: 'http://gloomhaven.party/api/auth/login',
    checkSession: 'http://gloomhaven.party/api/user/check-session'
};

const exportEndpoints = window.location.hostname.indexOf('stage.gloomhaven') === -1 ? prodEndpoints : stageEndpoints;

export { exportEndpoints as endpoints };
