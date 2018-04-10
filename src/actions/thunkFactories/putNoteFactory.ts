import { Dispatch } from 'redux';
import { IAction } from '../../models/IAction';
import { IStoreState } from '../../models/IStoreState';
import { Note } from '../../models/Note';
import { IServerNote } from '../../models/IServerNote';
import { INoteDto } from './fetchFactories';

import {
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS
} from '../../constants/actionTypes';

export interface IPutNoteDependencies {
  sendRequest: (noteId: Guid, data: INoteDto) => Promise<IServerNote>;
}

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

export const updatingNoteOnServerSuccess = (updatedNote: Note): IAction => ({
  type: UPDATING_NOTE_ON_SERVER_SUCCESS,
  payload: {
    noteId: updatedNote.id,
    text: updatedNote.visibleText,
  }
});

export const putNoteFactory = (dependencies: IPutNoteDependencies) =>
  (data: INoteDto): Thunk =>
    (dispatch: Dispatch<IStoreState>): Promise<IAction> => {
      const { id: noteId, text } = data;

      dispatch(startUpdatingNoteOnServer(noteId, text));

      const noteToUpdate = {
        text,
        id: noteId
      };

      return dependencies
        .sendRequest(noteId, noteToUpdate)
        .then(noteBeforeUpdate => {
          const applicationNote = new Note({
            id: noteBeforeUpdate.id,
            visibleText: text
          });

          return dispatch(updatingNoteOnServerSuccess(applicationNote));
        })
        .catch(error => dispatch(updatingNoteOnServerFailed(noteId, error.toString())));
    };
