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
                if(typeof res.data.user !== 'undefined') {

                    return res.data.user;

                }

                return {};
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
                if(typeof res.data.user !== 'undefined') {

                    return res.data.user;

                }

                return {};
            }

            return {};
        });
    }
};

export { API as default };

