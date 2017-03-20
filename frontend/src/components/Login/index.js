import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { login } from '~/api';
import './login.scss';

class Login extends Component {

    constructor(props) {
        super(props);

        this.googleLoginConfig = {
            clientId: "704150624273-pq6qof275opu09jore9qsgio5l0cdn5g.apps.googleusercontent.com",
            buttonText: "Login",
            onSuccess: this.onGoogleSuccess,
            onFailure: this.onGoogleFailure
        };
    }

    onGoogleSuccess(res) {
        console.log(res);

        login({
            type: 'google',
            authData: res.tokenObj,
            profileDate: res.profileObj
        });
    }

    onGoogleFailure() {
        console.log('google fail');
    }

    render() {
        return (
            <div className="login splash-screen">
                <h1 className="logo">Gloomhaven.Party</h1>
                <GoogleLogin { ...this.googleLoginConfig } style={ { } }>
                    <div className="login__google-signin"></div>
                </GoogleLogin>
            </div>
        );
    }
}

export { Login as default };
