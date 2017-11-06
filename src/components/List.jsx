import React, { PureComponent } from 'react';
import { AddListMember } from './AddListMember';
import { ListMember } from './ListMember';
import { generateUid } from '../utils/generateUid';

export class List extends PureComponent {

  constructor() {
    super();
    this.state = {
      notes: [],
      isAddListMemberFocused: false,
    };
  }

  addNewNote = (newNoteText) => {
    const noteToAdd = {
      text: newNoteText,
      uid: generateUid(),
      isEditActive: false,
    };

    this.setState((previousState) => {
      return {
        notes: [
          ...previousState.notes,
          noteToAdd,
        ],
        isAddListMemberFocused: false,
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
    const updatedNote = {
      text: newNoteText,
      uid: previousNote.uid,
      isEditActive: false,
    };

    this.updateNote(updatedNote);
  };

  startNoteEditor = (previousNote) => {
    this.updateNoteEditMode(previousNote, true);
  };

  cancelNoteEditor = (previousNote) => {
    this.updateNoteEditMode(previousNote, false);
  };

  updateNoteEditMode = (previousNote, isEditActive) => {
    const updatedNote = {
      ...previousNote,
      isEditActive,
    };

    this.updateNote(updatedNote);
  };

  updateNote = (updatedNote) => {
    this.setState((previousState) => {
      const updatedNotes = previousState.notes.map(note => {
        return note.uid === updatedNote.uid
          ? updatedNote
          : note;
      });

      return {
        notes: updatedNotes,
      };
    });
  };

  onIsAddListMemberFocus = () => {
    this.setState({
      isAddListMemberFocused: true,
    });
  };

  onIsAddListMemberBlur = () => {
    this.setState({
      isAddListMemberFocused: false,
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
            startNoteEditor={this.startNoteEditor}
            cancelNoteEditor={this.cancelNoteEditor}
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
                onInputFocus={this.onIsAddListMemberFocus}
                onInputBlur={this.onIsAddListMemberBlur}
                isInputFocused={this.state.isAddListMemberFocused}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
