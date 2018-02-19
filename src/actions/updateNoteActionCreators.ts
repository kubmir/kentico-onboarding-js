import {
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';
import { Note } from '../models/Note';

export const startUpdatingNoteOnServer = (noteId: Guid): IAction => ({
  type: START_UPDATING_NOTE_ON_SERVER,
  payload: {
    noteId,
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
