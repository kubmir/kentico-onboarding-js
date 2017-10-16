import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class AddLine extends PureComponent {

  constructor() {
    super();
    this.state = {
      noteToBeAdded: '',
    };

    this.updateNewNote = this.updateNewNote.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleAddNewNote = this.handleAddNewNote.bind(this);
  }

  updateNewNote(event) {
    this.setState({
      noteToBeAdded: event.target.value,
    });
  }

  handleEnterPress(event) {
    if (event.key === 'Enter') {
      this.handleAddNewNote();
    }
  }

  handleAddNewNote() {
    this.props.addNewNote({
      text: this.state.noteToBeAdded,
    });
    this.setState({
      noteToBeAdded: '',
    });
  }

  render() {
    return (
      <li className="list-group-item">
        <input type="text" className="form-control" onChange={this.updateNewNote} value={this.state.noteToBeAdded} onKeyPress={this.handleEnterPress} />
        <button type="button" className="btn btn-outline-dark" onClick={() => this.handleAddNewNote()}>Add</button>
      </li>
    );
  }
}

AddLine.PropTypes = {
  addNewNote: PropTypes.func.isRequired,
};
