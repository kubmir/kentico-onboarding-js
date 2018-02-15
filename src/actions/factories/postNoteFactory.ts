import { IAction } from '../../models/IAction';
import { Note } from '../../models/Note';
import { HTTP_POST } from '../../constants/httpMethods';
import { IServerNote } from '../../models/IServerNote';
import { convertNote } from '../../utils/noteConverter';
import { Dispatch } from 'redux';
import { IStoreState } from '../../models/IStoreState';

interface IPostNote {
  text: string;
}

export interface IPostNoteDependencies {
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onAddingStarted: (localId: Guid, addedText: string) => IAction;
  onAddingError: (localId: Guid, errorDescription: string) => IAction;
  onAddingSuccessful: (addedNote: Note) => IAction;
  data: IPostNote;
  convertNote: (serverNotes: IServerNote) => Note;
  generateLocalId: () => Guid;
  deleteNote: (localId: Guid) => IAction;
}

export const postNoteFactory: AsyncActionCreator = (dependencies: IPostNoteDependencies) => {
  return function (dispatch: Dispatch<IStoreState>) {
    const localId = dependencies.generateLocalId();
    dispatch(dependencies.onAddingStarted(localId, dependencies.data.text));

    return dependencies.sendRequest(dependencies.apiAddress, HTTP_POST, dependencies.data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = convertNote(addedNote);

        dispatch(dependencies.deleteNote(localId));
        return dispatch(dependencies.onAddingSuccessful(applicationNote));
      })
      .catch(error =>  dispatch(dependencies.onAddingError(localId, error.toString())));
  };
};
