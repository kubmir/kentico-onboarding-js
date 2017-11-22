import {
  ADD_NOTE,
  CANCEL_EDITING_NOTE,
  DELETE_NOTE,
  START_EDITING_NOTE,
  UPDATE_NOTE,
} from '../constants/actionTypes';

export const addNewNoteFactory = (generateIdFunction) => (noteText) => ({
  type: ADD_NOTE,
  payload: {
    text: noteText,
    noteId: generateIdFunction(),
  },
});

export const updateNote = (textChanges, id) => ({
  type: UPDATE_NOTE,
  payload: {
    text: textChanges,
    noteId: id,
  },
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: {
    noteId: id,
  },
});

export const startEditingNote = (id) => ({
  type: START_EDITING_NOTE,
  payload: {
    noteId: id,
  },
});

export const cancelEditingNote = (id) => ({
  type: CANCEL_EDITING_NOTE,
  payload: {
    noteId: id,
  },
});
