import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentCharacter } from '~/actions';
import { Card, CardActions, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
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

const _CharacterDetailsEdit = ({
    characters,
    characterClasses,
    updateCharacter,
    currentCharacter,
    match
}) => {

    const character = characters.filter(c => c.id === match.params.characterId)[0];

    const readOnly = [
        'classId'
    ];

    return (
        <CharacterDetails
            characterClasses={ characterClasses }
            readOnly={ readOnly }
            initValues={ character }
            detailType="edit"
            currentCharacter={ currentCharacter }
            updateCharacter={ updateCharacter }
        />
    );
};

function mapStateToEditProps(state) {
    return {
        characters: state.character.userCharacters,
        characterClasses: state.character.classes,
        currentCharacter: state.character.currentCharacter
    };
}

function mapDispatchToEditProps(dispatch) {
    return {
        updateCharacter: (values, detailType) => dispatch(updateCurrentCharacter(values, detailType))
    };
}

export const CharacterDetailsEdit = connect(mapStateToEditProps, mapDispatchToEditProps)(_CharacterDetailsEdit);

class CharacterDetails extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const {
            initValues,
            detailType,
            updateCharacter
        } = this.props;

        if(typeof initValues !== 'undefined') {
            updateCharacter(initValues, detailType);
        }
    }

    handleChange(name, value) {
        const {
            updateCharacter,
            detailType
        } = this.props;

        updateCharacter({[name]: value}, detailType)
    }

    render() {

        const {
            characterClasses,
            readOnly,
            currentCharacter
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


        const currentCharacterClass = characterClasses.filter(c => c.id === currentCharacter.classId)[0];

        const characterClassMenuItems = characterClasses.map(c => {
            const primaryText = c.spoiler ? '???' : c.displayName;

            return {
                value: c.id,
                className: c.className,
                primaryText
            }
        });

        const formControls = [
            {
                name: 'classId',
                type: 'select',
                properties: {
                    readOnly: readOnly.indexOf('classId') !== -1,
                    required: true,
                    hintText: 'Class',
                    handleOnChange: (e,i,v) => { this.handleChange('classId', v) },
                    currentValue: checkExists(currentCharacter.classId, 'string'),
                    menuItems: characterClassMenuItems 
                }
            },
            {
                name: 'name',
                type: 'text',
                properties: {
                    readOnly: readOnly.indexOf('name') !== -1,
                    required: true,
                    labelText: 'Name',
                    currentValue: checkExists(currentCharacter.name, 'string'),
                    handleOnChange: (e, v) => { this.handleChange('name', v) },
                }
            },
            {
                name: 'level',
                type: 'slider',
                properties: {
                    readOnly: readOnly.indexOf('level') !== -1,
                    labelText: `Level ${ currentCharacter.level }`,
                    defaultValue: 1,
                    min: 1,
                    max: 9,
                    step: 1,
                    currentValue: currentCharacter.level,
                    handleOnChange: (e, v) => { this.handleChange('level', v) }  
                }
            },
            {
                name: 'experienceNotes',
                type: 'text',
                properties: {
                    readOnly: readOnly.indexOf('experienceNotes') !== -1,
                    required: false, 
                    labelText: 'Experience Notes',
                    currentValue: checkExists(currentCharacter.experienceNotes, 'string'),
                    handleOnChange: (e, v) => { this.handleChange('experienceNotes', v) },
                }
            },
            {
                name: 'goldNotes',
                type: 'text',
                properties: {
                    readOnly: readOnly.indexOf('goldNotes') !== -1,
                    required: false, 
                    labelText: 'Gold Notes',
                    currentValue: checkExists(currentCharacter.goldNotes, 'string'),
                    handleOnChange: (e, v) => { this.handleChange('goldNotes', v) },
                }
            },
            {
                name: 'items',
                type: 'text',
                properties: {
                    readOnly: readOnly.indexOf('items') !== -1,
                    required: false, 
                    labelText: "Items",
                    currentValue: checkExists(currentCharacter.items, 'string'),
                    handleOnChange: (e, v) => { this.handleChange('items', v) },
                    textArea: {
                        multiLine: true,
                        rows: 2,
                        rowsMax: 4
                    }
                }
            },
            {
                name: 'perks',
                type: 'perks',
                properties: {
                    readOnly: readOnly.indexOf('perks') !== -1,
                    perks: typeof currentCharacterClass !== 'undefined' ? currentCharacterClass.perks : [],
                    handleOnChange: () => {}
                }
            },
            {
                name: 'checks',
                type: 'checks',
                properties: {
                    readOnly: readOnly.indexOf('checks') !== -1,
                    currentValue: checkExists(currentCharacter.checks, 'number'),
                    handleOnChange: () => { }
                }
            },
            {
                name: 'notes',
                type: 'text',
                properties: {
                    readOnly: readOnly.indexOf('notes') !== -1,
                    required: false, 
                    labelText: 'Notes',
                    currentValue: checkExists(currentCharacter.notes, 'string'),
                    handleOnChange: (e, v) => { this.handleChange('notes', v) },
                    textArea: {
                        multiLine: true,
                        rows: 2,
                        rowsMax: 4
                    } 
                }  
            }
        ];

        return (
            <Card style={{ maxWidth: '600px', margin: '10px auto' }}>

                <CardText>
                    {
                        formControls.map(f => <FormControl key={ f.name } { ...f } />)
                    }
                    <Toggle
                        label="Retired"
                        labelPosition="right"
                        labelStyle={styles.toggle.labelStyle}
                        trackStyle={styles.toggle.trackStyle}
                    />
                </CardText>

                <Divider />
                
                <DetailActions actions={ actions }/>
            </Card>
        );

        function checkExists(value, type) {
            switch(type) {
                case 'string':
                    return typeof value === 'undefined' ? '' : value;
                case 'number':
                    return 1;
                default:
                    return value;
            }
        }
    } 
}

class DetailActions extends Component {

    constructor(props) {
        super(props);
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
            }
        };
    }


    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            openMenu: true,
            anchorEl: event.currentTarget,
        });
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
            actions
        } = this.props;

        return (
            <div>
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
                        type="submit"
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
            </div>
        );
    }    
}
