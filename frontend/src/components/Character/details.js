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
    match,
    settings
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
            settings={ settings }
        />
    );
};

function mapStateToEditProps(state) {
    return {
        characters: state.character.userCharacters,
        characterClasses: state.character.classes,
        currentCharacter: state.character.currentCharacter,
        settings: state.user.settings
    };
}

function mapDispatchToEditProps(dispatch) {
    return {
        updateCharacter: (values, detailType, currentCharacter) => dispatch(updateCurrentCharacter(values, detailType, currentCharacter))
    };
}

export const CharacterDetailsEdit = connect(mapStateToEditProps, mapDispatchToEditProps)(_CharacterDetailsEdit);

const _CharacterDetailsCreate = ({
    characterClasses,
    currentCharacter,
    updateCharacter,
    settings
}) => {

    const readOnly = [];

    const initialCharacter = {
        checks: 0,
        classId: null,
        experienceNotes: '',
        goldNotes: '',
        items: '',
        level: 1,
        name: '',
        notes: '',
        perks: [],
        retired: 0
    };

    return (
        <CharacterDetails
            characterClasses={ characterClasses }
            readOnly={ readOnly }
            initValues={ initialCharacter }
            detailType="create"
            currentCharacter={ currentCharacter }
            updateCharacter={ updateCharacter }
            settings={ settings }
        />
    );
}

function mapStateToCreateProps(state) {
    return {
        characterClasses: state.character.classes,
        currentCharacter: state.character.currentCharacter,
        settings: state.user.settings
    };
}

function mapDispatchToCreateProps(dispatch) {
    return {
        updateCharacter: (values, detailType, currentCharacter) => dispatch(updateCurrentCharacter(values, detailType, currentCharacter))
    };
}

export const CharacterDetailsCreate = connect(mapStateToCreateProps, mapDispatchToCreateProps)(_CharacterDetailsCreate);

class CharacterDetails extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const {
            initValues,
            detailType,
            updateCharacter,
            currentCharacter
        } = this.props;

        if(typeof initValues !== 'undefined') {
            updateCharacter(initValues, detailType, currentCharacter);
        }
    }

    handleChange(name, value) {
        const {
            updateCharacter,
            detailType,
            currentCharacter
        } = this.props;

        updateCharacter({[name]: value}, detailType, currentCharacter)
    }

    render() {

        const {
            characterClasses,
            readOnly,
            currentCharacter,
            settings
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

            const primaryText = c.spoiler && settings.spoilers.indexOf(c.id) === -1 ? (<span style={{ position: "relative", bottom: "5px" }}>???</span>) : c.displayName;

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
                    labelText: `Level ${ checkExists(currentCharacter.level, 'number') }`,
                    defaultValue: 1,
                    min: 1,
                    max: 9,
                    step: 1,
                    currentValue: checkExists(currentCharacter.level, 'number'),
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
                    handleOnChange: (e, v) => { this.handleChange('items', v); },
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
                    characterPerks: currentCharacter.perks,
                    handleOnChange: perks => { this.handleChange('perks', perks) }
                }
            },
            {
                name: 'checks',
                type: 'checks',
                properties: {
                    readOnly: readOnly.indexOf('checks') !== -1,
                    currentValue: checkExists(currentCharacter.checks, 'number'),
                    handleOnChange: v => { this.handleChange('checks', v); }
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
                    return typeof value === 'undefined' ? 1 : value;
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
