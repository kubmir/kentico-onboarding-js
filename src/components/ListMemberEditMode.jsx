import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListMemberEditMode extends PureComponent {

  constructor(props) {
    super();
    this.state = {
      newNote: {
        text: props.note.text,
        edit: false,
        changes: '',
      },
    };

    this.handleNoteEditing = this.handleNoteEditing.bind(this);
  }

  handleNoteEditing(event) {
    this.setState({
      newNote: {
        text: this.state.newNote.text,
        edit: this.state.newNote.edit,
        changes: event.target.value,
      },
    });
  }

  render() {
    return (
      <div>
        <p>{this.props.number + '.'}</p>
        <input defaultValue={this.props.note.changes !== '' ? this.props.note.changes : this.props.note.text} onChange={this.handleNoteEditing} />
        <button type="button" className="btn btn-primary" onClick={() => this.props.handleSaveEdit(this.props.note, this.state.newNote)}>Save</button>
        <button type="button" className="btn btn-dark" onClick={this.props.handleCancelClick}>Cancel</button>
        <button type="button" className="btn btn-danger" onClick={() => this.props.handleDeleteNotes(this.props.note)}>Delete</button>
      </div>);
  }
}

ListMemberEditMode.propTypes = {
  note: PropTypes.object,
  number: PropTypes.number,
  handleDeleteNotes: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
};
