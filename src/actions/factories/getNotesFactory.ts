import { Note } from '../../models/Note';
import { IAction } from '../../models/IAction';
import { IServerNote } from '../../models/IServerNote';
import { HTTP_GET } from '../../constants/httpMethods';
import { Dispatch } from 'redux';
import { IStoreState } from '../../models/IStoreState';

export interface IGetNotesDependencies {
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onGettingStarted: () => IAction;
  onGettingError: (errorDescription: string) => IAction;
  onGettingSuccessful: (notes: Iterable<[Guid, Note]>) => IAction;
  convertNotes: (serverNotes: IServerNote[]) => Iterable<[Guid, Note]>;
}

export const getNotesFactory = (dependencies: IGetNotesDependencies): Thunk => {
  return function (dispatch: Dispatch<IStoreState>) {

    dispatch(dependencies.onGettingStarted());

    return dependencies.sendRequest(dependencies.apiAddress, HTTP_GET)
      .then(response => response.json())
      .then(serverNotes => {
          const applicationNotes = dependencies.convertNotes(serverNotes);

          return dispatch(dependencies.onGettingSuccessful(applicationNotes));
        }
      )
      .catch(error => dispatch(dependencies.onGettingError(error.toString())));
  };
};

