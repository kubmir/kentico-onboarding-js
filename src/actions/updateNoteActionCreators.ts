import {
  CANCEL_EDITING_NOTE,
  START_EDITING_NOTE,
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';
import { Note } from '../models/Note';

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

export const startUpdatingNoteOnServer = (noteId: Guid, newText: string): IAction => ({
  type: START_UPDATING_NOTE_ON_SERVER,
  payload: {
    noteId,
    newText,
  }
});

export const updatingNoteOnServerFailed = (noteId: Guid, errorDescription: string): IAction => ({
  type: UPDATING_NOTE_ON_SERVER_FAILURE,
  payload: {
    noteId,
    errorDescription,
  }
});

export const updatingNoteOnServerSuccess = (updatedNote: Note) => ({
  type: UPDATING_NOTE_ON_SERVER_SUCCESS,
  payload: {
    noteId: updatedNote.id,
    text: updatedNote.text,
  }
});
