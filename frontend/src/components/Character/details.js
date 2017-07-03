import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateCurrentCharacter, resetCurrentCharacter, createCharacterRequest } from '~/actions';
import { Card, CardActions, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
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
    resetCharacter,
    currentCharacter,
    serverResponse,
    match,
    settings
}) => {

    const character = characters.filter(c => c.id === match.params.characterId)[0];

    const readOnly = [
        'classId'
    ];

    return (
        <CharacterDetailsWithRouter
            characterClasses={ characterClasses }
            readOnly={ readOnly }
            initValues={ character }
            detailType="edit"
            currentCharacter={ currentCharacter }
            updateCharacter={ updateCharacter }
            resetCharacter={ resetCharacter }
            createCharacter={ () => {} }
            serverResponse={ serverResponse }
            settings={ settings }
        />
    );
};

function mapStateToEditProps(state) {
    return {
        characters: state.character.userCharacters,
        characterClasses: state.character.classes,
        currentCharacter: state.character.currentCharacter,
        serverResponse: state.character.serverResponse,
        settings: state.user.settings
    };
}

function mapDispatchToEditProps(dispatch) {
    return {
        updateCharacter: (values, detailType, currentCharacter) => dispatch(updateCurrentCharacter(values, detailType, currentCharacter)),
        resetCharacter: (values, detailType) => dispatch(resetCurrentCharacter(values, detailType))
    };
}

export const CharacterDetailsEdit = connect(mapStateToEditProps, mapDispatchToEditProps)(_CharacterDetailsEdit);

const _CharacterDetailsCreate = ({
    characterClasses,
    currentCharacter,
    updateCharacter,
    createCharacter,
    resetCharacter,
    serverResponse,
    settings
}) => {

    const readOnly = [];

    const initialCharacter = {
        id: null,
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
        <CharacterDetailsWithRouter
            characterClasses={ characterClasses }
            readOnly={ readOnly }
            initValues={ initialCharacter }
            detailType="create"
            currentCharacter={ currentCharacter }
            updateCharacter={ updateCharacter }
            createCharacter={ createCharacter }
            resetCharacter={ resetCharacter }
            serverResponse={ serverResponse }
            settings={ settings }
        />
    );
}

function mapStateToCreateProps(state) {
    return {
        characterClasses: state.character.classes,
        currentCharacter: state.character.currentCharacter,
        serverResponse: state.character.serverResponse,
        settings: state.user.settings
    };
}

function mapDispatchToCreateProps(dispatch) {
    return {
        updateCharacter: (values, detailType, currentCharacter) => dispatch(updateCurrentCharacter(values, detailType, currentCharacter)),
        createCharacter: currentCharacter => dispatch(createCharacterRequest(currentCharacter)),
        resetCharacter: (values, detailType) => dispatch(resetCurrentCharacter(values, detailType))
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
            resetCharacter
        } = this.props;

        if(typeof initValues !== 'undefined') {
            resetCharacter(initValues, detailType);
        }
    }

    componentWillReceiveProps(nextProps) {

        const {
            history
        } = this.props;

        if(nextProps.serverResponse === 'CREATE_SUCCESS') {
            history.push('/character', {});
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
            createCharacter,
            currentCharacter,
            settings,
            detailType
        } = this.props;


        const currentCharacterClass = characterClasses.filter(c => c.id === currentCharacter.classId)[0];

        const characterClassMenuItems = characterClasses.map(c => {

            let primaryText;

            if(typeof settings.spoilers !== 'undefined') {
                primaryText = c.spoiler && settings.spoilers.indexOf(c.id) === -1 ? (<span style={{ position: "relative", bottom: "5px" }}>???</span>) : c.displayName;
            } else {
                primaryText = c.spoiler ? (<span style={{ position: "relative", bottom: "5px" }}>???</span>) : c.displayName;
            }

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
                    currentValue: checkExists(currentCharacter.classId, ''),
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
                    currentValue: checkExists(currentCharacter.name, ''),
                    handleOnChange: (e, v) => { this.handleChange('name', v) },
                }
            },
            {
                name: 'level',
                type: 'slider',
                properties: {
                    readOnly: readOnly.indexOf('level') !== -1,
                    labelText: `Level ${ checkExists(currentCharacter.level, 1) }`,
                    defaultValue: 1,
                    min: 1,
                    max: 9,
                    step: 1,
                    currentValue: checkExists(currentCharacter.level, 1),
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
                    currentValue: checkExists(currentCharacter.experienceNotes, ''),
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
                    currentValue: checkExists(currentCharacter.goldNotes, ''),
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
                    currentValue: checkExists(currentCharacter.items, ''),
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
                    currentValue: checkExists(currentCharacter.checks, 0),
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
                    currentValue: checkExists(currentCharacter.notes, ''),
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
                </CardText>

                <Divider />
                
                <DetailActions detailType={ detailType } createCharacter={ createCharacter } currentCharacter={ currentCharacter } />
            </Card>
        );

        function checkExists(value, defaultValue) {
            return typeof value === 'undefined' ? defaultValue : value;
        }
    } 
}

const DetailActions = ({
    detailType,
    createCharacter,
    currentCharacter
}) => {
    switch(detailType) {
        case 'edit':
            return <EditActions />;
        case 'create':
            return <CreateActions createCharacter={ createCharacter } currentCharacter={ currentCharacter } />;
        default:
            return null;
    } 
};

const CreateActions = ({
    createCharacter,
    currentCharacter
}) => {
    return (
        <CardText>
            <RaisedButton label="Finalize Creation" onTouchTap={ handleOnTouchTap } />
        </CardText>
    );

    function handleOnTouchTap() {
        createCharacter(currentCharacter);
    }
};

class EditActions extends Component {

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

        return (
            <div>
                <CardText>
                    <Toggle
                        label="Retired"
                        labelPosition="right"
                        labelStyle={styles.toggle.labelStyle}
                        trackStyle={styles.toggle.trackStyle}
                    /> 
                </CardText>
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

const CharacterDetailsWithRouter = withRouter(CharacterDetails);

