import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { login } from '~/api';
import './login.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.onGoogleSuccess = this.onGoogleSuccess.bind(this);

        this.googleLoginConfig = {
            clientId: "704150624273-pq6qof275opu09jore9qsgio5l0cdn5g.apps.googleusercontent.com",
            buttonText: "Login with Google",
            onSuccess: this.onGoogleSuccess,
            onFailure: this.onGoogleFailure
        };
    }

    onGoogleSuccess(res) {

        const {
            history 
        } = this.props;

        login({
            type: 'google',
            authData: res.tokenObj,
            profileDate: res.profileObj
        })
        .then(result => {

            const {
                user
            } = result.data;

            if(typeof user.firstSession !== 'undefined') {
                if(user.firstSession) {
                    // Redirect to Tutorial 
                } else {
                    // Redirect to Profile
                    history.push('/profile', {});
                }
            }

        });
    }

    onGoogleFailure() {
        console.log('google failure');
    }

    render() {
        return (
            <div className="login splash-screen">
                <h1 className="logo">Gloomhaven.Party</h1>
                <GoogleLogin { ...this.googleLoginConfig } style={ {} } className="login__google-signin-container">
                    <div className="login__google-signin"></div>
                </GoogleLogin>
            </div>
        );
    }
}

export { Login as default };
