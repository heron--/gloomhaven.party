import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
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
        underlineDisabledStyle:{
            display: 'none'
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

const FormControlPerks = ({
    handleOnChange,
    perks
}) => {
    return (
        <div className="form-control form-control-container">
            <h3>Perks</h3>
            {
                perks.map(p => <Checkbox key={ p.id } label={ getLabel(p.description) } labelStyle={ styles.checkbox.labelStyle } />)
            }
        </div>
    );

    function getLabel(description) {

        // This function looks for certain patterns in the description and replaces them with corresponding React Components

        const replacementComponents = {
            'ROLLING MODIFIER': {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-condition-rolling-modifier"
                },
                children: null
            },
            'AIR': {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-element-air"
                },
                children: null
            },
            'DARK': {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-element-dark"
                },
                children: null
            },
            'EARTH': {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-element-earth"
                },
                children: null
            },
            'FIRE': {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-element-fire"
                },
                children: null
            },
            'ICE': {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-element-ice"
                },
                children: null
            },
            'LIGHT': {
                component: FontIcon,
                props: {
                    className:"gloomhaven-icon-element-light"
                },
                children: null
            },
            'ADD TARGET': {
                component: 'span',
                props: null,
                children: [
                    'ADD TARGET',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-add-target"
                        },
                        children: null
                    }
                ]
            },
            'BLESS': {
                component: 'span',
                props: null,
                children: [
                    'BLESS',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-bless"
                        },
                        children: null
                    }
                ]
            },
            'CURSE': {
                component: 'span',
                props: null,
                children: [
                    'CURSE',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-curse"
                        },
                        children: null
                    }
                ]
            },
            'DISARM': {
                component: 'span',
                props: null,
                children: [
                    'DISARM',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-disarm"
                        },
                        children: null
                    }
                ]
            },
            'PUSH': {
                component: 'span',
                props: null,
                children: [
                    'PUSH',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-push"
                        },
                        children: null
                    }
                ]
            },
            'PULL': {
                component: 'span',
                props: null,
                children: [
                    'PULL',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-pull"
                        },
                        children: null
                    }
                ]
            },
            'PIERCE': {
                component: 'span',
                props: null,
                children: [
                    'PIERCE',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-pierce"
                        },
                        children: null
                    }
                ]
            },
            'POISON': {
                component: 'span',
                props: null,
                children: [
                    'POISON',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-poison"
                        },
                        children: null
                    }
                ]
            },
            'MUDDLE': {
                component: 'span',
                props: null,
                children: [
                    'MUDDLE',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-muddle"
                        },
                        children: null
                    }
                ]
            },
            'IMMOBILIZE': {
                component: 'span',
                props: null,
                children: [
                    'IMMOBILIZE',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-immobilize"
                        },
                        children: null
                    }
                ]
            },
            'INVISIBLE': {
                component: 'span',
                props: null,
                children: [
                    'INVISIBLE',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-invisibility"
                        },
                        children: null
                    }
                ]
            },
            'STUN': {
                component: 'span',
                props: null,
                children: [
                    'STUN',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-stun"
                        },
                        children: null
                    }
                ]
            },
            'WOUND': {
                component: 'span',
                props: null,
                children: [
                    'WOUND',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-condition-wound"
                        },
                        children: null
                    }
                ]
            },
            'Heal': {
                component: 'span',
                props: null,
                children: [
                    'Heal',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-general-heal"
                        },
                        children: null
                    }
                ]
            },
            'Shield': {
                component: 'span',
                props: null,
                children: [
                    'Shield',
                    {
                        component: FontIcon,
                        props: {
                            className:"gloomhaven-icon-general-shield"
                        },
                        children: null
                    }
                ]
            }
        }

        let splitRegexPattern = '(';
        
        // Build the pattern
        Object.keys(replacementComponents).forEach((rc, i) => {
            splitRegexPattern += rc;
            if(i < Object.keys(replacementComponents).length - 1) {
                splitRegexPattern += '|';
            } else {
                splitRegexPattern += ')';
            }
        });

        const splitRegex = new RegExp(splitRegexPattern);

        const label = description.split(splitRegex);

        label.forEach((l, i) => {
            const replacements = Object.keys(replacementComponents);

            replacements.forEach(r => {
                if(typeof l === 'string') {
                    if(l.indexOf(r) !== -1) {
                        label[i] = replacementComponents[r];
                    } 
                }
            });
        })

        label.forEach((l, i) => {
            if(typeof l === 'object') {
                label[i] = React.createElement(l.component, l.props,
                    l.children ? l.children.map((c,i) => {

                        if(typeof c === 'string') {

                            return c;

                        } else {

                            return React.createElement(c.component, Object.assign({}, c.props, { key: i } ), c.children)

                        }

                    }) : null
                );
            }
        });

        return React.createElement('span', null, ...label);
    }
}

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
        underlineDisabledStyle: styles.input.underlineDisabledStyle,
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
                menuItems.map(m => <MenuItem key={ m.value } label={ <div><FontIcon className={ m.className } style={{ marginRight: '10px' }} />{ m.primaryText }</div> } leftIcon={ <div className={ m.className }></div> } value={ m.value } primaryText={ m.primaryText } />)
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
            'slider': FormControlSlider,
            'perks': FormControlPerks
        };

        const {
            type,
            properties
        } = this.props;

        return React.createElement(controlTypes[type], properties);
    } 
}

export { FormControl as default };
