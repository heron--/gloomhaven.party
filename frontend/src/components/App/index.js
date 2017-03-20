import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from '../Home';
import Login from '../Login';

class App extends Component {

    render() {

        return (
            <MuiThemeProvider>
                <Router>
                    <div>
                        <div className="app">
                        </div>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/Login" component={ Login } />
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    } 
}

export { App as default };
