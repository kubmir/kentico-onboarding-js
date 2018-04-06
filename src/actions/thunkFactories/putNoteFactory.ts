import { Dispatch } from 'redux';
import { IAction } from '../../models/IAction';
import { IStoreState } from '../../models/IStoreState';
import { Note } from '../../models/Note';
import { HttpMethods } from '../../enums/HttpMethods';
import {
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS
} from '../../constants/actionTypes';

interface IPutNote {
  readonly noteId: Guid;
  readonly text: string;
}

export interface IPutNoteDependencies {
  apiPrefix: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
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

export const putNoteFactory = (dependencies: IPutNoteDependencies) => (data: IPutNote): Thunk =>
  function (dispatch: Dispatch<IStoreState>): Promise<IAction> {
    const { noteId, text } = data;
    const apiAddress = dependencies.apiPrefix + '/' + noteId;

    dispatch(startUpdatingNoteOnServer(noteId, text));

    const noteToUpdate = {
      text,
      id: noteId
    };

    return dependencies.sendRequest(apiAddress, HttpMethods.PUT, noteToUpdate)
      .then(response => response.json())
      .then(noteBeforeUpdate => {
        const applicationNote = new Note({
          id: noteBeforeUpdate.id,
          visibleText: text
        });

        return dispatch(updatingNoteOnServerSuccess(applicationNote));
      })
      .catch(error => dispatch(updatingNoteOnServerFailed(noteId, error.toString())));
  };
