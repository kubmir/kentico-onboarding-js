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

export const updateNote = (textChanges, noteId) => ({
  type: UPDATE_NOTE,
  payload: {
    text: textChanges,
    noteId,
  },
});

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: {
    noteId,
  },
});

export const startEditingNote = (noteId) => ({
  type: START_EDITING_NOTE,
  payload: {
    noteId,
  },
});

export const cancelEditingNote = (noteId) => ({
  type: CANCEL_EDITING_NOTE,
  payload: {
    noteId,
  },
});
