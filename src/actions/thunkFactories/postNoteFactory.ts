import { Dispatch } from 'redux';
import { IAction } from '../../models/IAction';
import { Note } from '../../models/Note';
import { IServerNote } from '../../models/IServerNote';
import { IStoreState } from '../../models/IStoreState';
import { HttpMethods } from '../../enums/HttpMethods';

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

export const postNoteFactory = (dependencies: IPostNoteDependencies) => (data: IPostNote): Thunk =>
  function (dispatch: Dispatch<IStoreState>): Promise<IAction> {
    const localId = dependencies.generateLocalId();

    dispatch(dependencies.onAddingStarted(localId, data.text));

    return dependencies.sendRequest(dependencies.apiAddress, HttpMethods.POST, data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = dependencies.convertNote(addedNote);

        return dispatch(dependencies.onAddingSuccessful(applicationNote, localId));
      })
      .catch(error => dispatch(dependencies.onAddingError(localId, error.toString())));
  };

export const repostNoteFactory = (dependencies: IRepostNoteDependencies) => (data: IPostNote, localId: Guid): Thunk =>
  function (dispatch: Dispatch<IStoreState>): Promise<IAction> {
    dispatch(dependencies.onAddingStarted(localId));

    return dependencies.sendRequest(dependencies.apiAddress, HttpMethods.POST, data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = dependencies.convertNote(addedNote);

        return dispatch(dependencies.onAddingSuccessful(applicationNote, localId));
      })
      .catch(error => dispatch(dependencies.onAddingError(localId, error.toString())));
  };
