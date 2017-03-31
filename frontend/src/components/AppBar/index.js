import React, { Component } from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

class AppBar extends Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false 
        };
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    getProps(defaultProps, pathname) {
        switch(pathname) {
            case '/':            
                return Object.assign({}, defaultProps, {
                    // New props here
                });
            default: 
                return defaultProps;
        }
    }

    render() {
        const {
            pathname
        } = this.props;

        const defaultProps = {
            title: "Gloomhaven.Party",
            iconClassNameRight: "muidocs-icon-navigation-expand-more",
            onLeftIconButtonTouchTap: this.handleToggle
        };

        return (
            <div>
                <MaterialAppBar { ...this.getProps(defaultProps, pathname) } />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem onTouchTap={this.handleClose}>Characters</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Parties</MenuItem>
                    <Divider />
                    <Link to={`/profile`}>
                        <MenuItem onTouchTap={this.handleClose}>My Profile</MenuItem>
                    </Link>
                    <MenuItem onTouchTap={this.handleClose}>Settings</MenuItem>
                    <Link to={`/api/auth/logout`}>
                        <MenuItem onTouchTap={this.handleClose}>Sign Out</MenuItem>
                    </Link>
                </Drawer>
            </div>
        );

    }
};

export { AppBar as default };
