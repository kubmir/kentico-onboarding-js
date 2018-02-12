import { IAction } from '../../models/IAction';
import { Note } from '../../models/Note';
import { HTTP_POST } from '../../constants/httpMethods';
import { IServerNote } from '../../models/IServerNote';
import { convertNote } from '../../utils/noteConverter';

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

export const postNoteFactory = (dependencies: IPostNoteDependencies) => {
  return function (dispatch: any) {
    dispatch(dependencies.onAddingStarted());

    return dependencies.sendRequest(dependencies.apiAddress, HTTP_POST, dependencies.data)
      .then(response => response.json())
      .then(addedNote => {
        const applicationNote = convertNote(addedNote);

        dispatch(dependencies.onAddingSuccessful(applicationNote));
      })
      .catch(error => dispatch(dependencies.onAddingError(error.toString())));
  };
};
