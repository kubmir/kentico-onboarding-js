import { Dispatch } from 'redux';
import { IServerNote } from '../../models/Note';
import { IStoreState } from '../../reducers/IStoreState';
import { IAction } from '../IAction';
import {
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER,
} from '../../constants/actionTypes';

export interface IDeleteNoteDependencies {
  sendRequest: (id: Guid) => Promise<IServerNote>;
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

export const deleteNoteFactory = (dependencies: IDeleteNoteDependencies) =>
  (noteId: Guid): Thunk =>
    (dispatch: Dispatch<IStoreState>): Promise<IAction> => {
      dispatch(startDeletingNoteFromServer(noteId));

      return dependencies
        .sendRequest(noteId)
        .then(deletedNote => dispatch(deletingNoteFromServerSuccess(deletedNote.id)))
        .catch(error => dispatch(deletingNoteFromServerFailed(noteId, error.toString())));
    };
