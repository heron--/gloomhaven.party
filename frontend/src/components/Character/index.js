import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import '../FormControl/form-control.scss';

var styles = {
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
                    <SelectField
                        className="form-control"
                        errorStyle={styles.input.errorStyle}
                        errorText="This field is required"
                        hintStyle={styles.classSelect.hintStyle}
                        hintText="Class"
                        iconStyle={styles.classSelect.iconStyle}
                        labelStyle={styles.classSelect.labelStyle}
                        menuStyle={styles.classSelect.menuStyle}
                        onChange={this.handleChange}
                        style={styles.classSelect.style}
                        underlineStyle={styles.input.underlineStyle}
                        underlineFocusStyle={styles.input.underlineFocusStyle}
                        value={this.state.value}
                    >
                        {
                            characterClasses.map(c => <MenuItem key={ c.id } value={ c.id } primaryText={ c.name } />)
                        } 
                    </SelectField>
                    <TextField
                        className="form-control"
                        errorStyle={styles.input.errorStyle}
                        errorText="This field is required"
                        floatingLabelText="Name"
                        floatingLabelStyle={styles.input.floatingLabelStyle}
                        floatingLabelShrinkStyle={styles.input.floatingLabelShrinkStyle}
                        style={styles.input.style}
                        inputStyle={styles.input.inputStyle}
                        underlineStyle={styles.input.underlineStyle}
                        underlineFocusStyle={styles.input.underlineFocusStyle}
                    />
                    <h3>Level {this.state.levelSlider}</h3>
                    <Slider
                        defaultValue={1}
                        min={1}
                        max={9}
                        onChange={this.handleLevelSlider}
                        step={1}
                        value={this.state.levelSlider} />
                    <TextField
                        className="form-control"
                        floatingLabelText="Experience Notes"
                        floatingLabelStyle={styles.input.floatingLabelStyle}
                        floatingLabelShrinkStyle={styles.input.floatingLabelShrinkStyle}
                        style={styles.input.style}
                        inputStyle={styles.input.inputStyle}
                        underlineStyle={styles.input.underlineStyle}
                        underlineFocusStyle={styles.input.underlineFocusStyle}
                    />
                    <TextField
                        className="form-control"
                        floatingLabelText="Gold Notes"
                        floatingLabelStyle={styles.input.floatingLabelStyle}
                        floatingLabelShrinkStyle={styles.input.floatingLabelShrinkStyle}
                        style={styles.input.style}
                        inputStyle={styles.input.inputStyle}
                        underlineStyle={styles.input.underlineStyle}
                        underlineFocusStyle={styles.input.underlineFocusStyle}
                    />
                    <TextField
                        className="form-control"
                        floatingLabelText="Items"
                        floatingLabelStyle={styles.input.floatingLabelStyle}
                        floatingLabelShrinkStyle={styles.input.floatingLabelShrinkStyle}
                        multiLine={true}
                        rows={2}
                        rowsMax={4}
                        style={styles.input.style}
                        inputStyle={styles.input.inputStyle}
                        textareaStyle={styles.input.textareaStyle}
                        underlineStyle={styles.input.underlineStyle}
                        underlineFocusStyle={styles.input.underlineFocusStyle}
                    />
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
