import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
import FormControl from '~/components/FormControl';

const styles = {
    input:{
        errorStyle:{
            bottom: '15px',
            paddingLeft: '20px'
        },
        floatingLabelStyle:{
            marginTop: '-12px',
            paddingLeft: '20px',
        },
        floatingLabelShrinkStyle:{
            transform: 'scale(0.6) translate(13px, -30px)'
        },
        inputStyle:{
            backgroundColor: '#fff',
            fontFamily: '"Fjord One", serif',
            fontSize: '20px',
            marginTop: '0',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '12px',
        },
        style:{
            width: '100%'
        },
        textareaStyle:{
            marginTop: '20px'
        },
        underlineStyle:{
            bottom: '-2px',
            borderColor: 'transparent'
        },
        underlineFocusStyle:{
            right: '0',
            width: 'calc(100% - 12px)'
        }
    },
    classSelect:{
        hintStyle:{
            bottom: 'calc(50% - 12px)',
            fontFamily: '"Medula One", cursive',
            fontSize: '30px',
            paddingLeft: '20px',
            zIndex: '10'
        },
        iconStyle:{
            right: '-20px',
            top: '12px'
        },
        labelStyle:{
            fontFamily: '"Medula One", cursive',
            fontSize: '30px',
            top: '7px'
        },
        menuStyle:{
            backgroundColor: '#fff',
            boxSizing: 'border-box',
            fontFamily: '"Fjord One", serif',
            fontSize: '20px',
            marginTop: '0',
            paddingLeft: '20px',
            paddingRight: '20px',
        },
        style:{
            height: '72px',
            width: '100%'
        }
    },
    checkbox:{
        labelStyle:{
            fontFamily: '"Fjord One", serif',
        }
    }
};

class Character extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleLevelSlider = this.handleLevelSlider.bind(this);
        this.state = {
            levelSlider: 1,
            value: null,
        };
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    handleLevelSlider(event, value) {
        this.setState({levelSlider: value});
    }

    render() {
        const {
            characterClasses
        } = this.props;

        return (
            <Card style={{ maxWidth: '600px', margin: '10px auto' }}>
                <CardText>
                    <FormControl
                        type="select"
                        properties={{
                            required: true,
                            hintText: "Class",
                            handleOnChange: () => { },
                            currentValue: null,
                            menuItems: characterClasses.map(c => { return { value: c.id, primaryText: c.name } } )
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
                            labelText: "Items" 
                        }}
                    />
                    <div className="form-control form-control-checks">
                        <h3>Perks</h3>
                        <Checkbox
                            label="Remove two -1 cards"
                            labelStyle={styles.checkbox.labelStyle}
                        />
                        <Checkbox
                            label="Replace one -1 card with one +1 card"
                            labelStyle={styles.checkbox.labelStyle}
                        />
                        <Checkbox
                            label="Add two +1 cards"
                            labelStyle={styles.checkbox.labelStyle}
                        />
                        <Checkbox
                            label="Add two +1 cards"
                            labelStyle={styles.checkbox.labelStyle}
                        />
                        <Checkbox
                            label="Add one +3 card"
                            labelStyle={styles.checkbox.labelStyle}
                        />
                    </div>
                    <div className="form-control form-control-checks">
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
                </CardText>
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
