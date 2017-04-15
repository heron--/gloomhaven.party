import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import FormControl from '~/components/FormControl';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';

const styles = {
    card:{
        cardActionsStyle:{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between'
        }
    },
    checkbox:{
        labelStyle:{
            fontFamily: '"Fjord One", serif',
        }
    },
    toggle:{
        labelStyle:{
            fontFamily: '"Medula One", cursive',
            fontSize: '24px',
        },
        trackStyle:{
            backgroundColor: '#eee',
        }
    }
};

class Character extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleLevelSlider = this.handleLevelSlider.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.state = {
            levelSlider: 1,
            value: null,
            openDialog: false,
            openMenu: false,
            anchorOrigin: {
                horizontal: 'left',
                vertical: 'bottom',
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'bottom',
            },
            currentClass: null
        };
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    handleClassChange(event, index, currentClass) {
        this.setState({ currentClass });
    }

    handleLevelSlider(event, value) {
        this.setState({levelSlider: value});
    }

    handleOpen() {
        this.setState({
            openDialog: true,
            openMenu: false
        });
    }

    handleClose() {
        this.setState({openDialog: false});
    }

    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            openMenu: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            openMenu: false,
        });
    }

    setAnchor(positionElement, position) {
        const {anchorOrigin} = this.state;
        anchorOrigin[positionElement] = position;

        this.setState({
            anchorOrigin: anchorOrigin,
        });
    }

    setTarget(positionElement, position) {
        const {targetOrigin} = this.state;
        targetOrigin[positionElement] = position;

        this.setState({
            targetOrigin: targetOrigin,
        });
    }

    render() {

        const {
            characterClasses
        } = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        const currentCharacterClass = characterClasses.filter(c => c.id === this.state.currentClass)[0];
        console.log(currentCharacterClass)

        const characterClassMenuItems = characterClasses.map(c => {
            const primaryText = c.spoiler ? '???' : c.displayName;

            return {
                value: c.id,
                className: c.className,
                primaryText
            }
        });

        return (
            <Card style={{ maxWidth: '600px', margin: '10px auto' }}>
                <CardText>
                    <FormControl
                        type="select"
                        properties={{
                            required: true,
                            hintText: "Class",
                            handleOnChange: this.handleClassChange,
                            currentValue: this.state.currentClass,
                            menuItems: characterClassMenuItems 
                        }}
                    />
                    <FormControl
                        type="text"
                        properties={{
                            required: true,
                            labelText: "Name" 
                        }}
                    />
                    <FormControl
                        type="slider"
                        properties={{
                            labelText: `Level ${ this.state.levelSlider }`,
                            defaultValue: 1,
                            min: 1,
                            max: 9,
                            step: 1,
                            currentValue: this.state.levelSlider,
                            handleOnChange: this.handleLevelSlider  
                        }}
                    />
                    <FormControl
                        type="text"
                        properties={{
                            required: false, 
                            labelText: "Experience Notes" 
                        }}
                    />
                    <FormControl
                        type="text"
                        properties={{
                            required: false, 
                            labelText: "Gold Notes" 
                        }}
                    />
                    <FormControl
                        type="text"
                        properties={{
                            required: false, 
                            labelText: "Items",
                            textArea: {
                                multiLine: true,
                                rows: 2,
                                rowsMax: 4
                            }
                        }}
                    />
                    <FormControl
                        type="perks"
                        properties={{
                            perks: typeof currentCharacterClass !== 'undefined' ? currentCharacterClass.perks : [],
                            handleOnChange: () => {}
                        }}
                    />
                    <div className="form-control form-control-container">
                        <h3>Checks</h3>
                        <div className="checks-container">
                            <FontIcon
                                className="gloomhaven-icon-general-check"
                            />
                            <Checkbox />
                            <Checkbox />
                            <Checkbox />
                        </div>
                        <div className="checks-container">
                            <FontIcon
                                className="gloomhaven-icon-general-check"
                            />
                            <Checkbox />
                            <Checkbox />
                            <Checkbox />
                        </div>
                        <div className="checks-container">
                            <FontIcon
                                className="gloomhaven-icon-general-check"
                            />
                            <Checkbox />
                            <Checkbox />
                            <Checkbox />
                        </div>
                        <div className="checks-container">
                            <FontIcon
                                className="gloomhaven-icon-general-check"
                            />
                            <Checkbox />
                            <Checkbox />
                            <Checkbox />
                        </div>
                        <div className="checks-container">
                            <FontIcon
                                className="gloomhaven-icon-general-check"
                            />
                            <Checkbox />
                            <Checkbox />
                            <Checkbox />
                        </div>
                        <div className="checks-container">
                            <FontIcon
                                className="gloomhaven-icon-general-check"
                            />
                            <Checkbox />
                            <Checkbox />
                            <Checkbox />
                        </div>
                    </div>
                    <FormControl
                        type="text"
                        properties={{
                            required: false, 
                            labelText: "Notes",
                            textArea: {
                                multiLine: true,
                                rows: 2,
                                rowsMax: 4
                            } 
                        }}
                    />
                    <Toggle
                        label="Retired"
                        labelPosition="right"
                        labelStyle={styles.toggle.labelStyle}
                        trackStyle={styles.toggle.trackStyle}
                    />
                </CardText>
                <Divider />
                <CardActions style={styles.card.cardActionsStyle}>
                    <div>
                        <IconButton
                            onTouchTap={this.handleTouchTap}
                            tooltip="More Actions"
                            tooltipPosition="top-center"
                        >
                            <NavigationMoreVert />
                        </IconButton>
                        <Popover
                            open={this.state.openMenu}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={this.state.anchorOrigin}
                            targetOrigin={this.state.targetOrigin}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu>
                                <MenuItem
                                    primaryText="Delete Character"
                                    onTouchTap={this.handleOpen}
                                />
                            </Menu>
                        </Popover>
                    </div>
                    <FlatButton
                        label="Create Character"
                        primary={true}
                    />
                </CardActions>
                <Dialog
                    title="Delete this character"
                    actions={actions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleClose}
                >
                    This character will disappear from your characters list and all associated parties.
                </Dialog>
            </Card>
        );
    } 
}

function mapStateToProps(state) {
    return {
        characterClasses: state.character.classes
    };
}

const ConnectedCharacter = connect(mapStateToProps)(Character);

export { ConnectedCharacter as default };
