import { Dispatch } from 'redux';
import { Note } from '../../models/Note';
import { IAction } from '../../models/IAction';
import { IServerNote } from '../../models/IServerNote';
import { IStoreState } from '../../models/IStoreState';
import { HttpMethods } from '../../enums/HttpMethods';

export interface IGetNotesDependencies {
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onGettingStarted: () => IAction;
  onGettingError: (errorDescription: string) => IAction;
  onGettingSuccessful: (notes: Iterable<[Guid, Note]>) => IAction;
  convertNotes: (serverNotes: IServerNote[]) => Iterable<[Guid, Note]>;
}

export const getNotesFactory = (dependencies: IGetNotesDependencies): Thunk =>
  function (dispatch: Dispatch<IStoreState>): Promise<IAction> {

    dispatch(dependencies.onGettingStarted());

    return dependencies.sendRequest(dependencies.apiAddress, HttpMethods.GET)
      .then(response => response.json())
      .then(serverNotes => {
          const applicationNotes = dependencies.convertNotes(serverNotes);

          return dispatch(dependencies.onGettingSuccessful(applicationNotes));
        }
      )
      .catch(error => dispatch(dependencies.onGettingError(error.toString())));
  };
