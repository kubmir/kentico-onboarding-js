import React, { PureComponent } from 'react';
import { AddLine } from './ListMemberAddForm';
import ListMember from './ListMember';
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

    this.setState((previousState) => {
      return {
        notes: [
          ...previousState.notes,
          addNote,
        ],
      };
    });
  };

  deleteNote = (note) => {
    this.setState((previousState) => {
      return {
        notes: previousState
          .notes
          .filter(arrayNote => arrayNote !== note),
      };
    });
  };

  updateNoteText = (previousNote, newNoteText) => {
    this.setState((previousState) => {
      const previousNoteIndex = previousState.notes.indexOf(previousNote);
      const copy = [...previousState.notes];

      copy[previousNoteIndex] = {
        text: newNoteText !== ''
          ? newNoteText
          : previousNote.text,
        uid: previousNote.uid,
        isEditActive: false,
      };

      return {
        notes: copy,
      };
    });
  };

  updateNoteEditMode = (note, isEditActive) => {
    this.setState((previousState) => {
      const previousNoteIndex = previousState.notes.indexOf(note);
      const copy = [...previousState.notes];

      copy[previousNoteIndex] = {
        text: note.text,
        uid: note.uid,
        isEditActive,
      };

      return {
        notes: copy,
      };
    });
  };

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
