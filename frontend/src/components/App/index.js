import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { amber500, amber700, amber400 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Home from '../Home';
import Login from '../Login';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: amber500,
        primary2Color: amber700,
        primary3Color: amber400,
    },
})

class App extends Component {

    componentWillMount() {
        injectTapEventPlugin();
    }

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router>
                    <div>
                        <div className="app">
                            <AppBar
                                title="Gloomhaven.Party"
                                iconClassNameRight="muidocs-icon-navigation-expand-more"
                                onLeftIconButtonTouchTap={this.handleToggle}
                            />
                            <Drawer
                                docked={false}
                                open={this.state.open}
                                onRequestChange={(open) => this.setState({open})}
                            >
                                <MenuItem onTouchTap={this.handleClose}>Characters</MenuItem>
                                <MenuItem onTouchTap={this.handleClose}>Parties</MenuItem>
                                <Divider />
                                <MenuItem onTouchTap={this.handleClose}>Settings</MenuItem>
                            </Drawer>
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
