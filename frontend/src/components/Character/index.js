import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import '../FormControl/form-control.scss';

var styles = {
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
    textFieldStyle:{
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
};

class Character extends Component {
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
                <TextField
                    className="form-control"
                    hintText="Hint Text"
                    floatingLabelText="Character Name"
                    floatingLabelStyle={styles.floatingLabelStyle}
                    floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                    style={styles.textFieldStyle}
                    inputStyle={styles.inputStyle}
                    underlineStyle={styles.underlineStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                />
            </CardText>
                <select>
                    {
                        characterClasses.map(c => <option key={ c.id } value={ c.id }>{ c.name }</option>)
                    } 
                </select>
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
