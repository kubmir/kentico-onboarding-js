import {
  ADD_NOTE,
  CANCEL_EDITING_NOTE,
  DELETE_NOTE,
  START_EDITING_NOTE,
  UPDATE_NOTE,
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';

export const addNewNoteFactory = (generateIdFunction: () => string) => (noteText: string): IAction => ({
  type: ADD_NOTE,
  payload: {
    text: noteText,
    noteId: generateIdFunction(),
  },
});

export const updateNote = (textChanges: string, noteId: string): IAction => ({
  type: UPDATE_NOTE,
  payload: {
    text: textChanges,
    noteId,
  },
});

export const deleteNote = (noteId: string): IAction => ({
  type: DELETE_NOTE,
  payload: {
    noteId,
  },
});

export const startEditingNote = (noteId: string): IAction => ({
  type: START_EDITING_NOTE,
  payload: {
    noteId,
  },
});

export const cancelEditingNote = (noteId: string): IAction => ({
  type: CANCEL_EDITING_NOTE,
  payload: {
    noteId,
  },
});
