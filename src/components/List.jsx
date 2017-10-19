import React, { PureComponent } from 'react';
import { AddLine } from './AddLine';
import { ListMember } from './ListMember';
import { v4 } from 'uuid';

export class List extends PureComponent {

  constructor() {
    super();
    this.state = {
      notes: [],
    };
  }

  addNewNote = (newNoteText) => {
    const addNote = {
      text: newNoteText,
      uid: v4(),
      isEditActive: false,
    };

    this.setState({
      notes: [...this.state.notes, addNote],
    });
  }

  deleteNote = (note) => {
    this.setState({
      notes: this
        .state
        .notes
        .filter(arrayNote => arrayNote !== note),
    });
  }

  updateNoteText = (previousNote, changes) => {
    const previousNoteIndex = this.state.notes.indexOf(previousNote);
    const copy = [...this.state.notes];

    copy[previousNoteIndex] = {
      text: changes !== ''
        ? changes
        : previousNote.text,
      uid: previousNote.uid,
      isEditActive: false,
    };

    this.setState({
      notes: copy,
    });
  }

  updateNoteEditMode = (note, isEditActive) => {
    const previousNoteIndex = this.state.notes.indexOf(note);
    const copy = [...this.state.notes];

    copy[previousNoteIndex] = {
      text: note.text,
      uid: note.uid,
      isEditActive,
    };

    this.setState({
      notes: copy,
    });
  }

  render() {
    const members = this
      .state
      .notes
      .map((note, i) => (
        <ListMember
          note={note}
          number={i + 1}
          key={note.uid}
          onDeleteClick={this.deleteNote}
          onSaveClick={this.updateNoteText}
          onEditModeChanges={this.updateNoteEditMode}
        />
      ));

    return (
      <div className="row">
        <ul className="list-group">
          {members}
          <AddLine onAddClick={this.addNewNote} />
        </ul>
      </div>
    );
  }
}
