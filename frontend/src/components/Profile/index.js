import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

const Profile = ({
	characterClasses,
    user
}) => {
    return (
		<Card style={{ maxWidth: '600px', margin: '10px auto' }}>
			<CardTitle title="My Profile" subtitle={ user.email } />
			<CardText>
				<h3>Spoilers</h3>
				<p style={{ marginBottom: '10px' }}>Check off which character classes you would not mind seeing throughout the system.</p>
				{
                    characterClasses.filter(c => c.spoiler).map(c => {

    					const labelName = <FontIcon className={ c.className } />

    					return (
    						<Checkbox
                                key={ c.id }
    							label={ labelName }
    						/>
    					)
    				})
                }
				<Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
				<RaisedButton label="Deactivate Account" />
			</CardText>
		</Card>
    );
};

function mapStateToProps(state) {
    return {
    	characterClasses: state.character.classes,
        user: state.user
    };
}

const ConnectedProfile = connect(mapStateToProps)(Profile);

export { ConnectedProfile as default };
