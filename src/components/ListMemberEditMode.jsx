import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListMemberEditMode extends PureComponent {

  constructor() {
    super();
    this.state = {
      changesOnNote: '',
    };

    this.handleNoteEditing = this.handleNoteEditing.bind(this);
  }

  handleNoteEditing(event) {
    this.setState({
      changesOnNote: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <p>{this.props.number + '.'}</p>
        <input defaultValue={this.props.note.text} onChange={this.handleNoteEditing} />
        <button type="button" className="btn btn-primary" onClick={() => this.props.handleSaveEdit(this.props.note, this.state.changesOnNote)}>Save</button>
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
