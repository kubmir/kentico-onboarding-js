import {
  CANCEL_EDITING_NOTE,
  DELETE_NOTE,
  START_EDITING_NOTE,
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';

export const deleteNote = (noteId: Guid): IAction => ({
  type: DELETE_NOTE,
  payload: {
    noteId,
  },
});

export const startEditingNote = (noteId: Guid): IAction => ({
  type: START_EDITING_NOTE,
  payload: {
    noteId,
  },
});

export const cancelEditingNote = (noteId: Guid): IAction => ({
  type: CANCEL_EDITING_NOTE,
  payload: {
    noteId,
  },
});
