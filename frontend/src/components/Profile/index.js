import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            openDialog: false
        };
    }

    handleOpen() {
        this.setState({
            openDialog: true
        });
    }

    handleClose() {
        this.setState({openDialog: false});
    }

    render() {

        const {
        	characterClasses,
            user
        } = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Deactivate"
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

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
    				<RaisedButton label="Deactivate Account" onTouchTap={this.handleOpen} />
                    <Dialog
                        title="Deactivate your account"
                        actions={actions}
                        modal={false}
                        open={this.state.openDialog}
                        onRequestClose={this.handleClose}
                    >
                        Your account will be deactivated.  All characters and parties you have created will disappear throughout the system.
                    </Dialog>
    			</CardText>
    		</Card>
        );

    }

}

function mapStateToProps(state) {
    return {
    	characterClasses: state.character.classes,
        user: state.user
    };
}

const ConnectedProfile = connect(mapStateToProps)(Profile);

export { ConnectedProfile as default };
