import { devEndpoints, endpoints } from './endpoints';

export const login = (data) => {

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
    .catch(err => {
        console.error(err);
    });
};

export const checkSession = () => {
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
    .catch(err => {
        console.error(err);
    })
};
