export const devEndpoints = {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    getClasses: '/api/character/classes',
    checkSession: '/api/user/check-session'
};

const stageEndpoints = {
    login: 'http://stage.gloomhaven.party/api/auth/login',
    logout: 'http://stage.gloomhaven.party/api/auth/logout',
    getClasses: 'http://stage.gloomhaven.party/api/character/classes',
    checkSession: 'http://stage.gloomhaven.party/api/user/check-session'
};

const prodEndpoints = {
    login: 'http://gloomhaven.party/api/auth/login',
    logout: 'http://gloomhaven.party/api/auth/logout',
    getClasses: 'http://gloomhaven.party/api/character/classes',
    checkSession: 'http://gloomhaven.party/api/user/check-session'
};

const exportEndpoints = window.location.hostname.indexOf('stage.gloomhaven') === -1 ? prodEndpoints : stageEndpoints;

export { exportEndpoints as endpoints };
