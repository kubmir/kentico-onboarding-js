import {
  ADD_NOTE_FOCUS,
  ADD_NOTE_BLUR,
  ADD_NOTE_TEXT_CHANGE,
  START_SENDING_NOTE_TO_SERVER,
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';
import { Note } from '../models/Note';

export const startAddingNote = (): IAction => ({
  type: ADD_NOTE_FOCUS,
});

export const stopAddingNote = (): IAction => ({
  type: ADD_NOTE_BLUR,
});

export const changeAddingNoteText = (newText: string): IAction => ({
  type: ADD_NOTE_TEXT_CHANGE,
  payload: {
    newText,
  }
});

export const startSendingNoteToServer = (): IAction => ({
  type: START_SENDING_NOTE_TO_SERVER,
});

export const sendingNoteToServerFailed = (errorDescription: string): IAction => ({
  type: SENDING_NOTE_TO_SERVER_FAILURE,
  payload: {
    errorDescription,
  }
});

export const sendingNoteToServerSuccess = (addedNote: Note): IAction => ({
  type: SENDING_NOTE_TO_SERVER_SUCCESS,
  payload: {
    noteId: addedNote.id,
    text: addedNote.text,
  }
});
