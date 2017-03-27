import React from 'react';
import { connect } from 'react-redux';

const Profile = ({
    user
}) => {
    return (
        <div>
            PROFILE!
            { `Email: ${ user.email }` }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

const ConnectedProfile = connect(mapStateToProps)(Profile);

export { ConnectedProfile as default };
