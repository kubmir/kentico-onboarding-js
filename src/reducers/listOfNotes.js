import { notesInitialState } from '../utils/notesInitialState';
import { ListItem } from '../models/ListItem';

export const listOfNotes = (state = notesInitialState(), action) => {
  switch (action.type) {
    case 'ADD_NEW_NOTE':
      return setNoteToState(state, action);
    case 'UPDATE_NOTE':
      return setNoteToState(state, action);
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

const setNoteToState = (state, action) => {
  const payload = action.payload;
  const addNote = new ListItem({ ...payload });

  const newNotes = state
    .notes
    .set(payload.id, addNote);

  return Object.assign({}, state, { notes: newNotes });
};

const deleteNote = (state, action) => {
  const currentNotes = state
    .notes
    .delete(action.payload.id);

  return Object.assign({}, state, { notes: currentNotes });
};

const changeEditingMode = (state, action, newEditingMode) => {
  const id = action.payload.id;
  const changeNote = state
    .notes
    .get(id);

  const updatedNote = changeNote.merge({ isEditActive: newEditingMode });

  const newNotes = state
    .notes
    .set(id, updatedNote);

  return Object.assign({}, state, { notes: newNotes });
};
