import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';

const CharacterList = ({
    characters
}) => {
    return (
        <Card style={{ maxWidth: '600px', margin: '10px auto' }}>
            {
                characters.map(c => <Link to={ `/character/${ c.id }/edit` } key={ c.id } style={{ padding: '20px 12px', display: 'block' }}>{c.name}</Link>)
            }
        </Card>
    );
}

function mapStateToProps(state) {
    return {
        characters: state.character.userCharacters
    }
}

const ConnectedCharacterList = connect(mapStateToProps)(CharacterList);

export { ConnectedCharacterList as default };
