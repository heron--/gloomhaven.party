import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import '../FormControl/form-control.scss';

var styles = {
    input:{
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
    }
};

class Character extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: null,
        };
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        const {
            characterClasses
        } = this.props;

        return (
            <Card>
                <CardHeader
                    title="My Character Name"
                    subtitle="My Character Class"
                    avatar="images/jsa-128.jpg"
                />
                <CardText>
                    <SelectField
                        className="form-control"
                        hintStyle={styles.classSelect.hintStyle}
                        hintText="Class"
                        iconStyle={styles.classSelect.iconStyle}
                        labelStyle={styles.classSelect.labelStyle}
                        menuStyle={styles.classSelect.menuStyle}
                        onChange={this.handleChange}
                        style={styles.classSelect.style}
                        underlineStyle={styles.input.underlineStyle}
                        value={this.state.value}
                    >
                        {
                            characterClasses.map(c => <MenuItem key={ c.id } value={ c.id } primaryText={ c.name } />)
                        } 
                    </SelectField>
                    <TextField
                        className="form-control"
                        hintText="Hint Text"
                        floatingLabelText="Name"
                        floatingLabelStyle={styles.input.floatingLabelStyle}
                        floatingLabelShrinkStyle={styles.input.floatingLabelShrinkStyle}
                        style={styles.input.style}
                        inputStyle={styles.input.inputStyle}
                        underlineStyle={styles.input.underlineStyle}
                        underlineFocusStyle={styles.input.underlineFocusStyle}
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
