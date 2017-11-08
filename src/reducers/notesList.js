import { notesInitialState } from '../utils/notesInitialState';
import { NoteRecord } from '../models/NoteRecord';

export const notes = (state = notesInitialState(), action) => {
  switch (action.type) {
    case 'ADD_NEW_NOTE':
      return addNewNote(state, action);
    case 'UPDATE_NOTE':
      return updateNote(state, action);
    case 'DELETE_NOTE':
      return deleteNote(state, action);
    case 'START_EDITING_NOTE':
      return changeEditingMode(state, action, true);
    case 'CANCEL_EDITING_NOTE':
      return changeEditingMode(state, action, false);
    default:
      return state;
  }
};

const addNewNote = (state, action) => {
  const payload = action.payload;
  const addNote = NoteRecord({ ...payload });

  return Object.assign({}, state, {
    notes: state
      .notes
      .set(payload.id, addNote),
  });
};

const updateNote = (state, action) => {
  const payload = action.payload;
  const updatedNote = NoteRecord({ ...payload });

  return Object.assign({}, state, {
    notes: state
      .notes
      .set(action.payload.id, updatedNote),
  });
};

const deleteNote = (state, action) => {
  return Object.assign({}, state, {
    notes: state
      .notes
      .delete(action.payload.id),
  });
};

const changeEditingMode = (state, action, newEditingMode) => {
  const id = action.payload.id;
  const changeNote = state
    .notes
    .get(id);

  const updatedNote = changeNote.merge({ isEditActive: newEditingMode });

  return Object.assign({}, state, {
    notes: state
      .notes
      .set(id, updatedNote),
  });
};
