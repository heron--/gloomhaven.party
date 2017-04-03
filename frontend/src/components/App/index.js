import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { amber500, amber700, amber400 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CircularProgress from 'material-ui/CircularProgress';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from '../AppBar';
import Login from '../Login';
import Profile from '../Profile';
import Character from '../Character';
import './app.scss';

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
    }

    componentWillReceiveProps(nextProps) {

        const {
            history
        } = this.props;

        const {
            user,
            location
        } = nextProps;

        if(location.pathname === '/') {

            if(typeof location.state !== 'undefined') {
                if(typeof location.state.initLogout !== 'undefined') {

                }
            }

            if(user.email.length > 0) {
                if(typeof user.firstSession !== 'undefined') {
                    if(user.firstSession) {
                        // Redirect to Tutorial 
                        history.push('/profile', {});
                    } else {
                        // Redirect to Profile
                        history.push('/profile', {});
                    }
                } else {
                    history.push('/profile', {});
                }
            }
        }

        if(user.email.length === 0 && location.pathname !== '/') {
            history.push('/', {});
        }
    }

    render() {

        const {
            user
        } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="app">
                    <AppBar pathname={ this.props.location.pathname } />
                    {
                        // Not loading login until we've checked for a session
                        user.initialCheck ? (
                            <div>
                                <Route exact path="/" component={ Login } />  
                                <AuthedRoute user={ user } path="/profile" component={ Profile } />
                                <AuthedRoute user={ user } path="/character" component={ Character } />
                            </div>
                        ) : (
                            <div className="app-progress">
                                <CircularProgress className="app-progress__circle"/>
                            </div>
                        )
                    }
                </div>
            </MuiThemeProvider>
        );
    } 
}

const AuthedRoute = ({
    user,
    component,
    ...rest
}) => {
    return (
        <Route { ...rest } render={props => (

            user.email.length > 0 ? (

                React.createElement(component, props)

            ) : (

                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }}/>

            )
        )}/>
    ); 
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

const ConnectedApp = connect(mapStateToProps)(App)

export { ConnectedApp as default };
