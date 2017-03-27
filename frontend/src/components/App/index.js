import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { amber500, amber700, amber400 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { checkSession } from '~/api';
import { updateUser } from '~/actions';
import AppBar from '../AppBar';
import Login from '../Login';
import Profile from '../Profile';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: amber500,
        primary2Color: amber700,
        primary3Color: amber400,
    },
})

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    componentWillMount() {
        // Material UI Requirement 
        injectTapEventPlugin();

        const {
            updateUser
        } = this.props;

        checkSession() 
        .then(result => {

            const {
                user
            } = result.data;

            if(typeof user !== 'undefined') {
                updateUser(user); 
            }

        });
    }

    componentWillReceiveProps(nextProps) {

        console.log(nextProps)

        const {
            history
        } = this.props;

        const {
            user,
            location
        } = nextProps;

        if(location.pathname === '/') {

            if(user.email !== 'undefined') {
                if(user.firstSession !== 'undefined') {
                    if(user.firstSession) {
                        // Redirect to Tutorial 
                        history.push('/profile', {});
                    } else {
                        // Redirect to Profile
                        history.push('/profile', {});
                    }
                }
            }
        };
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="app">
                    <AppBar pathname={ this.props.location.pathname } />
                    <Route exact path="/" component={ Login } />
                    <Route path="/profile" component={ Profile } />
                </div>
            </MuiThemeProvider>
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
        updateUser: user => dispatch(updateUser(user))
    };
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export { ConnectedApp as default };
