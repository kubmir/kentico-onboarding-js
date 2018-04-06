import { Dispatch } from 'redux';
import { IAction } from '../../models/IAction';
import { Note } from '../../models/Note';
import { IServerNote } from '../../models/IServerNote';
import { IStoreState } from '../../models/IStoreState';
import { HttpMethods } from '../../enums/HttpMethods';
import {
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_RESENDING_NOTE_TO_SERVER,
  START_SENDING_NOTE_TO_SERVER
} from '../../constants/actionTypes';

interface IPostNote {
  text: string;
}

export interface IPostDependencies {
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  convertNote: (serverNotes: IServerNote) => Note;
}

export interface IPostNoteDependencies extends IPostDependencies {
  generateLocalId: () => Guid;
}

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

export const postNoteFactory = (dependencies: IPostNoteDependencies) => (data: IPostNote): Thunk =>
  function (dispatch: Dispatch<IStoreState>): Promise<IAction> {
    const localId = dependencies.generateLocalId();

    dispatch(startSendingNoteToServer(localId, data.text));

    return dependencies.sendRequest(dependencies.apiAddress, HttpMethods.POST, data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = dependencies.convertNote(addedNote);

        return dispatch(sendingNoteToServerSuccess(applicationNote, localId));
      })
      .catch(error => dispatch(sendingNoteToServerFailed(localId, error.toString())));
  };

export const repostNoteFactory = (dependencies: IPostDependencies) => (data: IPostNote, localId: Guid): Thunk =>
  function (dispatch: Dispatch<IStoreState>): Promise<IAction> {
    dispatch(startReSendingNoteToServer(localId));

    return dependencies.sendRequest(dependencies.apiAddress, HttpMethods.POST, data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = dependencies.convertNote(addedNote);

        return dispatch(sendingNoteToServerSuccess(applicationNote, localId));
      })
      .catch(error => dispatch(sendingNoteToServerFailed(localId, error.toString())));
  };
