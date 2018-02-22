import {
  ADD_NOTE_FOCUS,
  ADD_NOTE_BLUR,
  ADD_NOTE_TEXT_CHANGE,
  START_SENDING_NOTE_TO_SERVER,
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_RESENDING_NOTE_TO_SERVER,
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

export const startReSendingNoteToServer = (localNoteId: Guid) => ({
  type: START_RESENDING_NOTE_TO_SERVER,
  payload: {
    localNoteId,
  }
});

export const startSendingNoteToServer  = (noteId: Guid, text: string): IAction => ({
  type: START_SENDING_NOTE_TO_SERVER,
  payload: {
    noteId,
    text,
    isCommunicating: true,
  }
});

export const sendingNoteToServerFailed = (noteId: Guid, errorDescription: string): IAction => ({
  type: SENDING_NOTE_TO_SERVER_FAILURE,
  payload: {
    noteId,
    errorDescription,
  }
});

export const sendingNoteToServerSuccess = (addedNote: Note, localNoteId: Guid): IAction => ({
  type: SENDING_NOTE_TO_SERVER_SUCCESS,
  payload: {
    text: addedNote.text,
    noteId: addedNote.id,
    isCommunicating: false,
    localNoteId,
  }
});
