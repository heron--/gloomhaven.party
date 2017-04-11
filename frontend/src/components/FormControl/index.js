import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import './form-control.scss';

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
        menuItemStyle:{
            fontFamily: '"Medula One", cursive',
            fontSize: '24px',
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

const FormControlText = ({
    labelText,
    required,
    textArea = {}
}) => {


    const requiredProps = {
        errorStyle: styles.input.errorStyle,
        errorText: "This field is required"
    };

    const props = Object.assign({}, required ? requiredProps : {}, {
        className: "form-control",
        floatingLabelText: labelText,
        floatingLabelStyle: styles.input.floatingLabelStyle,
        floatingLabelShrinkStyle: styles.input.floatingLabelShrinkStyle,
        style: styles.input.style,
        inputStyle: styles.input.inputStyle,
        underlineStyle: styles.input.underlineStyle,
        underlineFocusStyle: styles.input.underlineFocusStyle
    }, getTextAreaProps(textArea));

    return (
        <TextField { ...props } />
    );

    function getTextAreaProps(textArea) {
        if(Object.keys(textArea).length === 0 && textArea.constructor === Object) {
            return textArea;
        } else {
            return Object.assign({}, textArea, { textareaStyle: styles.input.textareaStyle });
        }
    }
}

const FormControlSelect = ({
    menuItems,
    required,
    hintText,
    handleOnChange,
    currentValue
}) => {

    const requiredProps = {
        errorStyle: styles.input.errorStyle,
        errorText: "This field is required"
    };

    const props = Object.assign({}, required ? requiredProps : { }, {
        className: "form-control",
        hintStyle: styles.classSelect.hintStyle,
        hintText: hintText,
        iconStyle: styles.classSelect.iconStyle,
        labelStyle: styles.classSelect.labelStyle,
        menuStyle: styles.classSelect.menuStyle,
        menuItemStyle: styles.classSelect.menuItemStyle,
        onChange: handleOnChange,
        style: styles.classSelect.style,
        underlineStyle: styles.input.underlineStyle,
        underlineFocusStyle: styles.input.underlineFocusStyle,
        value: currentValue
    });

    return (
        <SelectField { ...props }>
            {
                menuItems.map(m => <MenuItem key={ m.value } leftIcon={ <div className={ m.className }></div> } value={ m.value } primaryText={ m.primaryText } />)
            }
        </SelectField>
    ); 
};

const FormControlSlider = ({
    labelText,
    defaultValue,
    min,
    max,
    step,
    currentValue,
    handleOnChange
}) => {
    return (
        <div className="form-control form-control-container">
            <h3 style={{ paddingBottom: '10px' }}>{ labelText }</h3>
            <Slider
                defaultValue={ defaultValue }
                min={ min }
                max={ max }
                onChange={ handleOnChange }
                step={ step }
                sliderStyle={{ margin:'0' }}
                value={ currentValue }
            />
        </div> 
    );
}

class FormControl extends Component {
    render() {

        const controlTypes = {
            'text': FormControlText,
            'select': FormControlSelect,
            'slider': FormControlSlider
        };

        const {
            type,
            properties
        } = this.props;

        return React.createElement(controlTypes[type], properties);
    } 
}

export { FormControl as default };
