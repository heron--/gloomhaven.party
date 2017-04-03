import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialAppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { logoutRequest } from '~/actions';

class AppBar extends Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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

    handleLogout() {

        const {
            logout 
        } = this.props;

        logout();
        this.handleClose();
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
                    <Link to="/character">
                        <MenuItem onTouchTap={ this.handleClose }>Characters</MenuItem>
                    </Link>
                    <MenuItem onTouchTap={ this.handleClose }>Parties</MenuItem>
                    <Divider />
                    <Link to="/profile">
                        <MenuItem onTouchTap={ this.handleClose }>My Profile</MenuItem>
                    </Link>
                    <MenuItem onTouchTap={ this.handleClose }>Settings</MenuItem>
                    <MenuItem onTouchTap={ this.handleLogout }>Sign Out</MenuItem>
                </Drawer>
            </div>
        );

    }
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutRequest())
    }
}

const ConnectedAppBar = connect(mapStateToProps, mapDispatchToProps)(AppBar);

export { ConnectedAppBar as default };
