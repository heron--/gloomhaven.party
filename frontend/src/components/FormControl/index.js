import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import 'form-control.scss';

var style = {
    textFieldStyle:{
        width: '100%'
    },
    inputStyle:{
        backgroundColor: '#fff',
        marginTop: '0',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
};

class FormControl extends Component {
    render() {
        const {
            characterClasses
        } = this.props;

        return (
            <TextField
                className="form-control"
                hintText={hintText}
                floatingLabelText={floatingLabelText}
                style={style.textFieldStyle}
                inputStyle={style.inputStyle}
            />
        );
    } 
}

const ConnectedFormControl = connect(mapStateToProps)(Character);

export { ConnectedFormControl as default };
