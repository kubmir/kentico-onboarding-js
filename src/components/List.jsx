import React, { PureComponent } from 'react';
import { AddListMember } from './AddListMember';
import { ListMember } from './ListMember';
import { generateId } from '../utils/generateId';
import { OrderedMap } from 'immutable';
import { NoteRecord } from '../models/NoteRecord';

export class List extends PureComponent {

  constructor() {
    super();
    this.state = {
      notes: OrderedMap(),
      isAddListMemberFocused: false,
    };
  }

  addNewNote = (newNoteText) => {
    const noteToAdd = NoteRecord({
      text: newNoteText,
      id: generateId(),
      isEditActive: false,
    });

    this.setState((previousState) => {
      return {
        notes: previousState
          .notes
          .set(noteToAdd.id, noteToAdd),
        isAddListMemberFocused: false,
      };
    });
  };

  deleteNote = (note) => {
    this.setState((previousState) => {
      return {
        notes: previousState
          .notes
          .delete(note.id),
      };
    });
  };

  updateNoteText = (previousNote, newNoteText) => {
    const updatedNote = previousNote.merge({
      isEditActive: false,
      text: newNoteText,
    });
    this.updateStateNotes(updatedNote);
  };

  startNoteEditor = (previousNote) => {
    const updatedNote = previousNote.merge({ isEditActive: true });
    this.updateStateNotes(updatedNote);
  };

  cancelNoteEditor = (previousNote) => {
    const updatedNote = previousNote.merge({ isEditActive: false });
    this.updateStateNotes(updatedNote);
  };

  updateStateNotes = (updatedNote) => {
    this.setState((previousState) => ({
      notes: previousState
        .notes
        .set(updatedNote.id, updatedNote),
    }));
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
      .valueSeq()
      .map((note, i) => (
        <li
          className="list-group-item"
          key={note.id}
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
