import React, { PureComponent } from 'react';
import { AddLine } from '../components/AddLine';
import { ListMember } from '../components/ListMember';
import { generateUid } from '../UidGenerator';

export class List extends PureComponent {

  constructor() {
    super();
    this.state = {
      notes: [],
    };

    this.handleAddNewNote = this.handleAddNewNote.bind(this);
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this);
    this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
  }

  handleAddNewNote(noteToBeAdded) {
    const addNote = {
      text: noteToBeAdded.text,
      uid: generateUid(),
    };

    this.setState({
      notes: [...this.state.notes, addNote],
    });
  }

  handleDeleteNotes(note) {
    this.setState({
      notes: this.state.notes.filter(arrayNote => arrayNote !== note),
    });
  }

  handleNoteUpdate(prevNote, changes) {
    const prevNoteIndex = this.state.notes.indexOf(prevNote);
    const copy = JSON.parse(JSON.stringify(this.state.notes));

    copy[prevNoteIndex] = {
      text: changes !== '' ? changes : prevNote.text,
      uid: prevNote.uid,
    };

    this.setState({
      notes: copy,
    });
  }

  render() {
    return (
      <div className="row">
        <ul className="list-group">
          {this.state.notes.map((note, i) =>
            <ListMember
              note={note}
              number={i + 1}
              key={note.uid}
              handleDeleteNotes={this.handleDeleteNotes}
              handleSaveEdit={this.handleNoteUpdate}
            />
          )
          }
          <AddLine
            addNewNote={this.handleAddNewNote}
          />
        </ul>
      </div>
    );
  }
}
