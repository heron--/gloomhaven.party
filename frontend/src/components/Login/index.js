import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { loginRequest } from '~/actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import './login.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            openDialog: false,
            openLoginSnackbar: false,
        };

        this.onGoogleSuccess = this.onGoogleSuccess.bind(this);

        this.googleLoginConfig = {
            clientId: "704150624273-pq6qof275opu09jore9qsgio5l0cdn5g.apps.googleusercontent.com",
            buttonText: "Login with Google",
            onSuccess: this.onGoogleSuccess,
            onFailure: this.onGoogleFailure
        };
    }

    handleOpen() {
        this.setState({
            openDialog: true
        });
    }

    handleClose() {
        this.setState({openDialog: false});
    }

    handleRequestClose() {
        this.setState({
            openSnackbar: false,
        });
    };

    onGoogleSuccess(res) {

        const {
            loginRequest
        } = this.props;

        this.setState({
            openLoginSnackbar: true,
        });

        loginRequest(res.tokenObj, res.profileObj);

    }

    onGoogleFailure() {
        console.log('google failure');
    }

    render() {

        const {
            user
        } = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Deactivate"
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div className="login splash-screen">
                <h1 className="logo">Gloomhaven.Party</h1>
                {
                    user.email.length === 0 ?
                    <GoogleLogin { ...this.googleLoginConfig } style={ {} } className="login__google-signin-container">
                        <div className="login__google-signin"></div>
                    </GoogleLogin> : null
                }
                <Dialog
                    title="Reactivate your account"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}
                >
                    Your account will be reactivated.  All characters and parties you have created will return throughout the system.
                </Dialog>
                <Snackbar
                    open={this.state.openLoginSnackbar}
                    message="You have successfully logged in"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
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
