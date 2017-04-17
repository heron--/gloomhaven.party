import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { CharacterDetailsEdit } from './details';
import CharacterList from './list';

class Character extends Component {

    render() {
        return (
            <div className="character">
                <Route exact path="/character" component={ CharacterList } />
                <Route path="/character/:characterId/edit" component={ CharacterDetailsEdit } />
                <Route path="/character/create" component={ CharacterDetailsEdit } />
            </div>
        );
    } 
}

export { Character as default };
