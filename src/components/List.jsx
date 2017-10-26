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
    const newNote = {
      text: newNoteText !== ''
        ? newNoteText
        : previousNote.text,
      uid: previousNote.uid,
      isEditActive: false,
    };

    this.updateNote(previousNote, newNote);
  };

  updateNoteEditMode = (previousNote, isEditActive) => {
    const newNote = {
      text: previousNote.text,
      uid: previousNote.uid,
      isEditActive,
    };

    this.updateNote(previousNote, newNote);
  };

  updateNote = (previousNote, newNote) => {
    this.setState((previousState) => {
      const newNotes = previousState.notes.map(note => {
        return note === previousNote
          ? newNote
          : note;
      });

      return {
        notes: newNotes,
      };
    });
  };

  render() {
    const members = this
      .state
      .notes
      .map((note, i) => (
        <li
          className="list-group-item"
          key={i}
        >
          <ListMember
            note={note}
            number={i + 1}
            key={note.uid}
            onDeleteClick={this.deleteNote}
            onSaveClick={this.updateNoteText}
            onEditModeChanges={this.updateNoteEditMode}
          />
        </li>
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
