import React, { PureComponent } from 'react';
import { AddListMember } from './AddListMember';
import ListMember from './ListMember';
import generateUid from '../utils/uidGenerator';

export class List extends PureComponent {

  constructor() {
    super();
    this.state = {
      notes: [],
      isAddListMemberTouched: false,
    };
  }

  addNewNote = (newNoteText) => {
    const addNote = {
      text: newNoteText,
      uid: generateUid(),
      isEditActive: false,
    };

    this.setState((previousState) => {
      return {
        notes: [
          ...previousState.notes,
          addNote,
        ],
        isAddListMemberTouched: false,
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
      text: newNoteText,
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

  changeIsAddListMemberTouched = (isTouched) => {
    this.setState({
      isAddListMemberTouched: isTouched,
    });
  };

  render() {
    const members = this
      .state
      .notes
      .map((note, i) => (
        <li
          className="list-group-item"
          key={note.uid}
        >
          <ListMember
            note={note}
            number={i + 1}
            onDeleteClick={this.deleteNote}
            onSaveClick={this.updateNoteText}
            onEditModeChanges={this.updateNoteEditMode}
          />
        </li>
      ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-1 col-md-10">
          <ul className="list-group">
            {members}
            <li className="list-group-item">
              <AddListMember
                onAddClick={this.addNewNote}
                onInputTouch={this.changeIsAddListMemberTouched}
                isInputTouched={this.state.isAddListMemberTouched}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
