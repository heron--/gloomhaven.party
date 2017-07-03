export const devEndpoints = {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    getClasses: '/api/character/classes',
    checkSession: '/api/user/check-session',
    updateCharacter: '/api/character/',
    createCharacter: '/api/character/',
    fetchCharacters: '/api/character/list/'
};

const stageEndpoints = {
    login: 'https://stage.gloomhaven.party/api/auth/login',
    logout: 'https://stage.gloomhaven.party/api/auth/logout',
    getClasses: 'https://stage.gloomhaven.party/api/character/classes',
    checkSession: 'https://stage.gloomhaven.party/api/user/check-session',
    updateCharacter: 'https://stage.gloomhaven.party/api/character/',
    createCharacter: 'https://stage.gloomhaven.party/api/character/',
    fetchCharacters: 'https://stage.gloomhaven.party/api/character/list'
};

const prodEndpoints = {
    login: 'https://gloomhaven.party/api/auth/login',
    logout: 'https://gloomhaven.party/api/auth/logout',
    getClasses: 'https://gloomhaven.party/api/character/classes',
    checkSession: 'https://gloomhaven.party/api/user/check-session',
    updateCharacter: 'https://gloomhaven.party/api/character/',
    createCharacter: 'https://gloomhaven.party/api/character/',
    fetchCharacters: 'https://gloomhaven.party/api/character/list'
};

const exportEndpoints = window.location.hostname.indexOf('stage.gloomhaven') === -1 ? prodEndpoints : stageEndpoints;

export { exportEndpoints as endpoints };
