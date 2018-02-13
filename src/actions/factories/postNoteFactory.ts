import { IAction } from '../../models/IAction';
import { Note } from '../../models/Note';
import { HTTP_POST } from '../../constants/httpMethods';
import { IServerNote } from '../../models/IServerNote';
import { convertNote } from '../../utils/noteConverter';
import { Dispatch } from 'redux';
import { IStoreState } from '../../models/IStoreState';
import { Promise } from 'es6-promise';

interface IPostNote {
  text: string;
}

export interface IPostNoteDependencies {
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onAddingStarted: () => IAction;
  onAddingError: (errorDescription: string) => IAction;
  onAddingSuccessful: (addedNote: {id: Guid, text: string}) => IAction;
  data: IPostNote;
  convertNote: (serverNotes: IServerNote) => Note;
}

export const postNoteFactory: AsyncActionCreator = (dependencies: IPostNoteDependencies) => {
  return function (dispatch: Dispatch<IStoreState>) {
    dispatch(dependencies.onAddingStarted());

    return dependencies.sendRequest(dependencies.apiAddress, HTTP_POST, dependencies.data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = convertNote(addedNote);

        return dispatch(dependencies.onAddingSuccessful(applicationNote));
      })
      .catch(error => dispatch(dependencies.onAddingError(error.toString())));
  };
};
