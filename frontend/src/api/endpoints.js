export const devEndpoints = {
    login: '/api/auth/login'
};

const stageEndpoints = {
    login: 'http://stage.gloomhaven.party/api/auth/login'
};

const prodEndpoints = {
    login: 'http://gloomhaven.party/api/auth/login'
};

const exportEndpoints = window.location.hostname.indexOf('stage.gloomhaven') === -1 ? prodEndpoints : stageEndpoints;

export { exportEndpoints as endpoints };
