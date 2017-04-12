import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const Profile = ({
    user
}) => {
    return (
		<Card style={{ maxWidth: '600px', margin: '10px auto' }}>
			<CardTitle title="My Profile" subtitle={ user.email } />
			<CardText>
				<h3>Spoilers</h3>
				<p style={{ marginBottom: '10px' }}>Check off which character classes you would not mind seeing throughout the system.</p>
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-07" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-08" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-09" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-10" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-11" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-12" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-13" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-14" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-15" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-16" />} />
				<Checkbox label={<FontIcon className="gloomhaven-icon-class-17" />} />
				<Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
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
