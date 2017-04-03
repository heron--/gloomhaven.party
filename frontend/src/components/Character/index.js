import React, { Component } from 'react';
import { connect } from 'react-redux';

class Character extends Component {
    render() {
        const {
            characterClasses
        } = this.props;

        return (
            <select>
                {
                    characterClasses.map(c => <option key={ c.id } value={ c.id }>{ c.name }</option>)
                } 
            </select>
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
