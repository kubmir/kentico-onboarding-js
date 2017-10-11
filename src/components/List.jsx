import React, { PureComponent } from 'react';
import assignment from './../../assignment.gif';

import { ListMember } from './ListMember.jsx';
import { generateUid } from '../UidGenerator';

export class List extends PureComponent {

  constructor() {
    super();
    this.state = {
      notes: [],
      noteToBeAdded: '',
    };
    this.addNewNote = this.addNewNote.bind(this);
    this.updateNewNote = this.updateNewNote.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  addNewNote() {
    this.setState({
      notes: [...this.state.notes, this.state.noteToBeAdded],
      noteToBeAdded: '',
    });
  }

  updateNewNote(event) {
    this.setState({ noteToBeAdded: event.target.value });
  }

  handleEnterPress(event) {
    if (event.key === 'Enter') {
      this.addNewNote();
    }
  }

  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}

        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured in the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item like
              <code>dateCreated</code>).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <ul className="list-group">
          {this.state.notes.map((note, i) =>
            <ListMember note={note} number={i + 1} key={generateUid()} />
          )}
          <li className="list-group-item">
            <input type="text" className="form-control" onChange={this.updateNewNote} value={this.state.noteToBeAdded} onKeyPress={this.handleEnterPress} />
            <button type="button" className="btn btn-outline-dark" onClick={this.addNewNote}>Add</button>
          </li>
        </ul>
      </div>
    );
  }
}
