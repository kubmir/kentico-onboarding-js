import { Dispatch } from 'redux';
import { IAction } from '../../models/IAction';
import { IStoreState } from '../../models/IStoreState';
import { Note } from '../../models/Note';
import { HTTP_PUT } from '../../constants/httpMethods';

interface IPutNote {
  readonly noteId: Guid;
  readonly text: string;
}

export interface IPutNoteDependencies {
  apiPrefix: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onUpdateStarted: (noteId: Guid, newText: string) => IAction;
  onUpdateError: (noteId: Guid, errorDescription: string) => IAction;
  onUpdateSuccessful: (updatedNote: Note) => IAction;
}

export const putNoteFactory = (dependencies: IPutNoteDependencies) => (data: IPutNote): Thunk =>
  function (dispatch: Dispatch<IStoreState>) {
    const { noteId, text } = data;
    const apiAddress = dependencies.apiPrefix + '/' + noteId;

    dispatch(dependencies.onUpdateStarted(noteId, text));

    const noteToUpdate = {
      text,
      id: noteId
    };

    return dependencies.sendRequest(apiAddress, HTTP_PUT, noteToUpdate)
      .then(response => response.json())
      .then(noteBeforeUpdate => {
        const applicationNote = new Note({
          id: noteBeforeUpdate.id,
          text
        });

        return dispatch(dependencies.onUpdateSuccessful(applicationNote));
      })
      .catch(error => dispatch(dependencies.onUpdateError(noteId, error.toString())));
  };
