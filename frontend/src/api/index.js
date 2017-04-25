import { devEndpoints, endpoints } from './endpoints';

const API = {
    login: data => {

        const loginEndpoint = __DEV__ ? devEndpoints.login : endpoints.login;

        const loginConfig = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include'
        };


        return fetch(loginEndpoint, loginConfig) 
        .then(res => res.json()) 
        .then(res => {
            if(typeof res.data !== 'undefined') {

                return res.data;

            }

            return {};
        });
    },
    logout: () => {

        const logoutEndpoint = __DEV__ ? devEndpoints.logout : endpoints.logout;

        const logoutConfig = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "GET",
            credentials: 'include'
        };


        return fetch(logoutEndpoint, logoutConfig) 
        .then(res => res.json());
    },
    getCharacterClasses: () => {
        const getClassesEndpoint = __DEV__ ? devEndpoints.getClasses : endpoints.getClasses;

        const getClassesConfig = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "GET",
            credentials: 'include'
        };

        return fetch(getClassesEndpoint, getClassesConfig)
        .then(res => res.json())
        .then(res => {
            if(typeof res.data !== 'undefined') {
                return res.data;
            }

            return [];
        });
    },
    checkSession: () => {
        const sessionEndpoint = __DEV__ ? devEndpoints.checkSession : endpoints.checkSession;

        const sessionConfig = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "GET",
            credentials: 'include'
        };

        return fetch(sessionEndpoint, sessionConfig)
        .then(res => res.json())
        .then(res => {

            if(typeof res.data !== 'undefined') {
                return res.data;
            }

            return {};
        });
    },
    updateCharacter: character => {

        const updateEndpoint = __DEV__ ? devEndpoints.updateCharacter + character.id : endpoints.checkSession + character.id;

        const updateConfig = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({character}),
            credentials: 'include'
        };

        return fetch(updateEndpoint, updateConfig)
        .then(res => res.json())
        .then(res => {
            
            if(typeof res.data !== 'undefined') {
                return res.data;
            }

            return {};
        })

    } 
};

export { API as default };

