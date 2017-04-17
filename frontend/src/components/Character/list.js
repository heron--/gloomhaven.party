import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';

const CharacterList = ({
    characters
}) => {
    return (
        <Card style={{ minWidth: '300px', maxWidth: '80%', margin: '10px auto' }}>
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn style={{ width: '30px' }}>Class</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Level</TableHeaderColumn>
                        <TableHeaderColumn>XP</TableHeaderColumn>
                        <TableHeaderColumn>Gold</TableHeaderColumn>
                        <TableHeaderColumn>Owner</TableHeaderColumn>
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
                                <TableRowColumn>{c.level}</TableRowColumn>
                                <TableRowColumn>{c.experienceNotes}</TableRowColumn>
                                <TableRowColumn>{c.goldNotes}</TableRowColumn>
                                <TableRowColumn>{c.owner}</TableRowColumn>
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
