import { IAction } from '../../models/IAction';
import { Note } from '../../models/Note';
import { HTTP_POST } from '../../constants/httpMethods';
import { IServerNote } from '../../models/IServerNote';
import { Dispatch } from 'redux';
import { IStoreState } from '../../models/IStoreState';
import { ThunkAction } from 'redux-thunk';

interface IPostNote {
  text: string;
}

export interface IPostDependencies {
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onAddingError: (localId: Guid, errorDescription: string) => IAction;
  onAddingSuccessful: (addedNote: Note, localId: Guid) => IAction;
  convertNote: (serverNotes: IServerNote) => Note;
}

export interface IPostNoteDependencies extends IPostDependencies {
  generateLocalId: () => Guid;
  onAddingStarted: (localId: Guid, addedText: string) => IAction;
}

export interface IRepostNoteDependencies extends IPostDependencies {
  onAddingStarted: (localId: Guid) => IAction;
}

export const postNoteFactory = (dependencies: IPostNoteDependencies) => (data: IPostNote): ThunkAction<Promise<IAction>, IStoreState, null> => {
  return function (dispatch: Dispatch<IStoreState>) {
    const localId = dependencies.generateLocalId();

    dispatch(dependencies.onAddingStarted(localId, data.text));

    return dependencies.sendRequest(dependencies.apiAddress, HTTP_POST, data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = dependencies.convertNote(addedNote);

        return dispatch(dependencies.onAddingSuccessful(applicationNote, localId));
      })
      .catch(error => dispatch(dependencies.onAddingError(localId, error.toString())));
  };
};


export const repostNoteFactory = (dependencies: IRepostNoteDependencies) => (data: IPostNote, localId: Guid): ThunkAction<Promise<IAction>, IStoreState, null> => {
  return function (dispatch: Dispatch<IStoreState>) {
    dispatch(dependencies.onAddingStarted(localId));

    return dependencies.sendRequest(dependencies.apiAddress, HTTP_POST, data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = dependencies.convertNote(addedNote);

        return dispatch(dependencies.onAddingSuccessful(applicationNote, localId));
      })
      .catch(error => dispatch(dependencies.onAddingError(localId, error.toString())));
  };
};
