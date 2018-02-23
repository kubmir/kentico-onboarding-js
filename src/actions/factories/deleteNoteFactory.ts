import { Dispatch } from 'redux';
import { IStoreState } from '../../models/IStoreState';
import { HTTP_DELETE } from '../../constants/httpMethods';
import { IAction } from '../../models/IAction';

export interface IDeleteNoteDependencies {
  apiPrefix: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onDeletingStarted: (noteId: Guid) => IAction;
  onDeletingError: (noteId: Guid, errorDescription: string) => IAction;
  onDeletingSuccessful: (noteId: Guid) => IAction;
}

export const deleteNoteFactory = (dependencies: IDeleteNoteDependencies) => (noteId: Guid): Thunk =>
  function (dispatch: Dispatch<IStoreState>) {
    const apiAddress = dependencies.apiPrefix + '/' + noteId;
    dispatch(dependencies.onDeletingStarted(noteId));

    return dependencies.sendRequest(apiAddress, HTTP_DELETE)
      .then(response => response.json())
      .then(deletedNote => dispatch(dependencies.onDeletingSuccessful(deletedNote.id)))
      .catch(error => dispatch(dependencies.onDeletingError(noteId, error.toString())));
  };
