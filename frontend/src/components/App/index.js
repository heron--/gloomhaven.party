import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';

class App extends Component {

    render() {

        return (
            <Router>
                <div>
                    <div className="app">
                        gloomhaven.party
                    </div>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/Login" component={ Login } />
                </div>
            </Router>
        );
    } 
}

export { App as default };
