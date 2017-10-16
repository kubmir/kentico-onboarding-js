import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './../inputStyle.css';

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
        <div className="input-group input-width-smaller">
          <input type="text" className="form-control" onChange={this.updateNewNote} value={this.state.noteToBeAdded} onKeyPress={this.handleEnterPress} />
          <span className="input-group-btn">
            <button type="button" className="btn btn-outline-dark" onClick={() => this.handleAddNewNote()}>Add</button>
          </span>
        </div>
      </li>
    );
  }
}

AddLine.PropTypes = {
  addNewNote: PropTypes.func.isRequired,
};
