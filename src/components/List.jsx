import React, { PureComponent } from 'react';
import { AddListMember } from './AddListMember';
import { ListMember } from './ListMember';
import { generateId } from '../utils/generateId';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';

export class List extends PureComponent {

  constructor() {
    super();
    this.state = {
      notes: OrderedMap(),
      isAddListMemberFocused: false,
    };
  }

  addNewNote = (newNoteText) =>
    this.setState((previousState) => {
      const noteToAdd = new ListItem({
        text: newNoteText,
        id: generateId(),
        isEditActive: false,
      });

      const notes = previousState
        .notes
        .set(noteToAdd.id, noteToAdd);

      return {
        notes,
        isAddListMemberFocused: false,
      };
    });

  deleteNote = (note) =>
    this.setState((previousState) => {
      const notes = previousState
        .notes
        .delete(note.id);

      return { notes };
    });

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

  updateStateNotes = (updatedNote) =>
    this.setState((previousState) => {
      const notes = previousState
        .notes
        .set(updatedNote.id, updatedNote);

      return { notes };
    });

  onIsAddListMemberFocus = () =>
    this.setState({
      isAddListMemberFocused: true,
    });

  onIsAddListMemberBlur = () =>
    this.setState({
      isAddListMemberFocused: false,
    });

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
