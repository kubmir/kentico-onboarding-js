import { Dispatch } from 'redux';
import { IStoreState } from '../../models/IStoreState';
import { IAction } from '../../models/IAction';
import { HttpMethods } from '../../enums/HttpMethods';
import {
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER,
} from '../../constants/actionTypes';

export interface IDeleteNoteDependencies {
  apiPrefix: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
}

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

export const deleteNoteFactory = (dependencies: IDeleteNoteDependencies) => (noteId: Guid): Thunk =>
  function (dispatch: Dispatch<IStoreState>): Promise<IAction> {
    const apiAddress = dependencies.apiPrefix + '/' + noteId;
    dispatch(startDeletingNoteFromServer(noteId));

    return dependencies.sendRequest(apiAddress, HttpMethods.DELETE)
      .then(response => response.json())
      .then(deletedNote => dispatch(deletingNoteFromServerSuccess(deletedNote.id)))
      .catch(error => dispatch(deletingNoteFromServerFailed(noteId, error.toString())));
  };
