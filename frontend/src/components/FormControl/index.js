import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import perkIcons from './perkIcons';
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
        },
    }
};

const FormControlPerks = ({
    handleOnChange,
    perks,
    characterPerks
}) => {
    return (
        <div className="form-control form-control-container">
            <h3>Perks</h3>
            {
                perks.map(p =>
                    <Checkbox
                        key={ p.id }
                        label={ getLabel(p.description) }
                        labelStyle={ styles.checkbox.labelStyle }
                        checked={ characterPerks.indexOf(p.id) !== -1 }
                        onCheck={ (e,v) => {
            
                            let newPerks;

                            if(v) {
                                newPerks = characterPerks.slice();
                                newPerks.push(p.id);
                            } else {
                                newPerks = characterPerks.filter(cp => cp !== p.id);
                                console.log(newPerks)
                            }

                            handleOnChange(newPerks);
                        }}
                    />)
            }
        </div>
    );

    function getLabel(description) {

        // This function looks for certain patterns in the description and replaces them with corresponding React Components
        // The actual replacement components are in the perkIcons.js file
        
        let splitRegexPattern = '(';
        
        // Build the pattern
        Object.keys(perkIcons).forEach((rc, i) => {
            splitRegexPattern += rc;
            if(i < Object.keys(perkIcons).length - 1) {
                splitRegexPattern += '|';
            } else {
                splitRegexPattern += ')';
            }
        });

        const splitRegex = new RegExp(splitRegexPattern);

        const label = description.split(splitRegex);

        label.forEach((l, i) => {
            const replacements = Object.keys(perkIcons);

            replacements.forEach(r => {
                if(typeof l === 'string') {
                    if(l.indexOf(r) !== -1) {
                        label[i] = perkIcons[r];
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

class FormControlChecks extends Component {
    constructor(props) {
        super(props);
        this.getCheckContainers = this.getCheckContainers.bind(this);
        this.initializeChecks = this.initializeChecks.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.maxChecks = 18; // Must be divisible by three, or things might explode
        this.state = {
            checks: []
        };

        for(let i = 0; i < this.maxChecks; i++) {
            this.state.checks.push(false);
        }
    }

    componentWillMount() {
        this.initializeChecks();
    }

    initializeChecks() {
        const {
            currentValue
        } = this.props;

        const copyArray = this.state.checks.slice();

        for(let i = 0; i < copyArray.length; i++) {
            if(i + 1 <= currentValue) {
                copyArray[i] = true;
            }
        }

        this.setState({
            checks: copyArray
        });
    }

    componentWillReceiveProps(nextProps) {
        let currentCount = 0;
        this.state.checks.forEach(c => { if(c) currentCount++; });

        if(currentCount !== nextProps.currentValue) {
            const copyArray = this.state.checks.slice();

            for(let i = 0; i < copyArray.length; i++) {
                if(i + 1 <= nextProps.currentValue) {
                    copyArray[i] = true;
                }
            }

            this.setState({
                checks: copyArray
            });
        }
    }

    handleCheck(i, value) {

        const {
            handleOnChange
        } = this.props;

        const copyArray = this.state.checks.slice(); 

        copyArray[i] = value;

        this.setState({
            checks: copyArray
        });

        let count = 0;
        copyArray.forEach(c => { if(c) count++; });
        setTimeout(() => handleOnChange(count), 1);
    }

    getCheckContainers() {

        const children = [];

        for(let i = 0; i < this.state.checks.length; i += 3) {
            children.push((
                <div className="checks-container" key={ i }>
                    <FontIcon className="gloomhaven-icon-general-check" />
                    <Checkbox checked={ this.state.checks[i] } onCheck={ (e,v) => { this.handleCheck(i, v); }} />
                    <Checkbox checked={ this.state.checks[i + 1] } onCheck={ (e,v) => { this.handleCheck(i + 1, v); }} />
                    <Checkbox checked={ this.state.checks[i + 2] }  onCheck={ (e,v) => { this.handleCheck(i + 2, v); }} />
                </div>
            ));
        }

        return React.createElement('div', null, children);
    }

    render() {

        return (
            <div className="form-control form-control-container">
                <h3>Checks</h3>
                {
                    this.getCheckContainers()
                }
            </div>
        );
    }
};

const FormControlText = ({
    labelText,
    required,
    currentValue,
    handleOnChange,
    errorText,
    textArea = {}
}) => {


    const requiredProps = {
        errorStyle: styles.input.errorStyle,
        errorText: typeof errorText === 'undefined' ? '' : errorText
    };

    const props = Object.assign({}, required ? requiredProps : {}, {
        className: "form-control",
        value: currentValue,
        floatingLabelText: labelText,
        floatingLabelStyle: styles.input.floatingLabelStyle,
        floatingLabelShrinkStyle: styles.input.floatingLabelShrinkStyle,
        style: styles.input.style,
        inputStyle: styles.input.inputStyle,
        underlineDisabledStyle: styles.input.underlineDisabledStyle,
        underlineStyle: styles.input.underlineStyle,
        underlineFocusStyle: styles.input.underlineFocusStyle,
        onChange: handleOnChange
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
    errorText,
    handleOnChange,
    currentValue
}) => {

    const requiredProps = {
        errorStyle: styles.input.errorStyle,
        errorText: typeof errorText !== 'undefined' ? '' : errorText
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
            'perks': FormControlPerks,
            'checks': FormControlChecks
        };

        const {
            type,
            properties
        } = this.props;

        return React.createElement(controlTypes[type], properties);
    } 
}

export { FormControl as default };
