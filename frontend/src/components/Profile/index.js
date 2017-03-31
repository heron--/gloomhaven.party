import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const Profile = ({
    user
}) => {
    return (
		<Card>
			<CardTitle title="My Profile" subtitle={ user.email } />
			<CardText>
				<RaisedButton label="Deactivate Account" />
			</CardText>
		</Card>
    );
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

const ConnectedProfile = connect(mapStateToProps)(Profile);

export { ConnectedProfile as default };
