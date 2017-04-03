import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { loginRequest } from '~/actions';
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
            loginRequest
        } = this.props;

        loginRequest(res.tokenObj, res.profileObj);

    }

    onGoogleFailure() {
        console.log('google failure');
    }

    render() {

        const {
            user
        } = this.props;

        return (
            <div className="login splash-screen">
                <h1 className="logo">Gloomhaven.Party</h1>
                {
                    user.email.length === 0 ?
                    <GoogleLogin { ...this.googleLoginConfig } style={ {} } className="login__google-signin-container">
                        <div className="login__google-signin"></div>
                    </GoogleLogin> : null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginRequest: (tokenObj, profileObj) => dispatch(loginRequest(tokenObj, profileObj))
    }
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export { ConnectedLogin as default };
