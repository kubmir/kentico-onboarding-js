import { IStoreState } from '../../models/IStoreState';
import { HTTP_DELETE } from '../../constants/httpMethods';
import { IAction } from '../../models/IAction';
import { Dispatch } from 'redux';

export interface IDeleteNoteDependencies {
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onDeletingStarted: (noteId: Guid) => IAction;
  onDeletingError: (noteId: Guid, errorDescription: string) => IAction;
  onDeletingSuccessful: (noteId: Guid) => IAction;
  noteId: Guid;
}

export const deleteNoteFactory: AsyncActionCreator = (dependencies: IDeleteNoteDependencies) => {
  return function (dispatch: Dispatch<IStoreState>) {

    dispatch(dependencies.onDeletingStarted(dependencies.noteId));

    return dependencies.sendRequest(dependencies.apiAddress, HTTP_DELETE)
      .then(response => response.json())
      .then(deletedNote => dispatch(dependencies.onDeletingSuccessful(deletedNote.id)))
      .catch(error => dispatch(dependencies.onDeletingError(dependencies.noteId, error.toString())));
  };
};
