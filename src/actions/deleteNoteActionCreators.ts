import {
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER,
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';

export const startDeletingNoteFromServer = (noteId: Guid): IAction => ({
  type: START_DELETING_NOTE_FROM_SERVER,
  payload: {
    noteId,
  }
});

export const deletingNoteFromServerFailed = (noteId: Guid, errorDescription: string): IAction => ({
  type: DELETING_NOTE_FROM_SERVER_FAILURE,
  payload: {
    errorDescription,
    noteId,
  }
});

export const deletingNoteFromServerSuccess = (noteId: Guid): IAction => ({
  type: DELETING_NOTE_FROM_SERVER_SUCCESS,
  payload: {
    noteId,
  }
});
