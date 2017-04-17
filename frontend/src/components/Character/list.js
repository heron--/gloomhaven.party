import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardTitle } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';

const CharacterList = ({
    characters
}) => {

    const cardTitle = [
        <span>
            Characters&nbsp;
            <Link to={ `/character/create` }>
                <FlatButton label="Add Character" primary={true} />
            </Link>
        </span>
    ];

    return (
        <Card style={{ minWidth: '300px', maxWidth: '80%', margin: '10px auto' }}>
            <CardTitle title={cardTitle} />
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{ width: '30px' }}>Class</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn className="hidden-xs">Level</TableHeaderColumn>
                        <TableHeaderColumn className="hidden-xs">XP</TableHeaderColumn>
                        <TableHeaderColumn className="hidden-xs">Gold</TableHeaderColumn>
                        <TableHeaderColumn className="hidden-xs">Owner</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        characters.map(c =>
                            <TableRow>
                                <TableRowColumn style={{ width: '30px', textAlign: 'center' }}><FontIcon className="gloomhaven-icon-class-01" /></TableRowColumn>
                                <TableRowColumn>
                                    <Link to={ `/character/${ c.id }/edit` } key={ c.id }>{c.name}</Link>
                                </TableRowColumn>
                                <TableRowColumn className="hidden-xs">{c.level}</TableRowColumn>
                                <TableRowColumn className="hidden-xs">{c.experienceNotes}</TableRowColumn>
                                <TableRowColumn className="hidden-xs">{c.goldNotes}</TableRowColumn>
                                <TableRowColumn className="hidden-xs">{c.owner}</TableRowColumn>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </Card>
    );
}

function mapStateToProps(state) {
    return {
        characters: state.character.userCharacters,
        characterClasses: state.character.classes
    }
}

const ConnectedCharacterList = connect(mapStateToProps)(CharacterList);

export { ConnectedCharacterList as default };
