import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { amber500, amber700, amber400 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
        injectTapEventPlugin();
    }

    render() {

        console.log(this.props);

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

export { App as default };
