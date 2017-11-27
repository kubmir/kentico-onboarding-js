import { OrderedMap } from 'immutable';
import { Note } from '../../../models/Note';
import {
  ADD_NOTE,
  CANCEL_EDITING_NOTE,
  DELETE_NOTE,
  START_EDITING_NOTE,
  UPDATE_NOTE,
} from '../../../constants/actionTypes';

export const listOfNotes = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_NOTE:
    case UPDATE_NOTE:
      return setNoteToState(state, action);
    case DELETE_NOTE:
      return deleteNote(state, action);
    case START_EDITING_NOTE:
      return changeEditingMode(state, action, true);
    case CANCEL_EDITING_NOTE:
      return changeEditingMode(state, action, false);
    default:
      return state;
  }
};

const setNoteToState = (state, action) => {
  const { noteId, text } = action.payload;
  const noteToAdd = new Note({
    id: noteId,
    text,
    isEditActive: false,
  });
  const newNotes = state
    .set(noteId, noteToAdd);

  return newNotes;
};

const deleteNote = (state, action) => {
  const currentNotes = state
    .delete(action.payload.noteId);

  return currentNotes;
};

const changeEditingMode = (state, action, newEditingMode) => {
  const noteId = action.payload.noteId;

  return state.update(noteId, note => note.merge({
    isEditActive: newEditingMode,
  }));
};
