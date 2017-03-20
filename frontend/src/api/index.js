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

    fetch(loginEndpoint, loginConfig) 
    .then(res => res.json()) 
    .then(res => {
        console.log(res); 
    })
    .catch(err => {
        console.error(err);
    });
};
