import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';

const AppBar = ({
    pathname
}) => {

    const defaultProps = {
        title: "Gloomhaven.Party",
        iconClassNameRight: "muidocs-icon-navigation-expand-more"
    };

    return (
        <MaterialAppBar { ...getProps(defaultProps, pathname) } />
    );

    function getProps(defaultProps, pathname) {
        switch(pathname) {
            case '/':            
                return Object.assign({}, defaultProps, {
                    // New props here
                });
            default: 
                return defaultProps;
        }
    }
};

export { AppBar as default };
