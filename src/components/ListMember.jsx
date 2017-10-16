import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListMemberEditMode } from './ListMemberEditMode';

export class ListMember extends PureComponent {

  constructor(props) {
    super();
    this.state = {
      editable: props.note.edit,
    };

    this.handleExitingEdit = this.handleExitingEdit.bind(this);
    this.handleStartEdit = this.handleStartEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleStartEdit() {
    this.props.handleEditModeChanges(true, this.props.note);
    this.setState({
      editable: true,
    });
  }

  handleExitingEdit() {
    this.props.handleEditModeChanges(false, this.props.note);
    this.setState({
      editable: false,
    });
  }

  handleSave(prevNote, newNote) {
    this.setState({
      editable: false,
    });
    this.props.handleSaveEdit(prevNote, newNote);
  }

  render() {
    return (
      <li className="list-group-item">
        {
          this.state.editable ?
            <ListMemberEditMode
              note={this.props.note}
              number={this.props.number}
              handleDeleteNotes={this.props.handleDeleteNotes}
              handleSaveEdit={this.handleSave}
              handleCancelClick={this.handleExitingEdit}
            />
             :
            <p onClick={this.handleStartEdit}>{this.props.number + '. ' + this.props.note.text}</p>
        }
      </li>
    );
  }
}

ListMember.propTypes = {
  note: PropTypes.object,
  number: PropTypes.number,
  handleDeleteNotes: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleEditModeChanges: PropTypes.func.isRequired,
};
