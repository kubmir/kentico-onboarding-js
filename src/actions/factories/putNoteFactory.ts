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
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  onUpdateStarted: (noteId: Guid, newText: string) => IAction;
  onUpdateError: (noteId: Guid, errorDescription: string) => IAction;
  onUpdateSuccessful: (updatedNote: Note) => IAction;
  data: IPutNote;
}

export const putNoteFactory = (dependencies: IPutNoteDependencies): Thunk => {
  return function (dispatch: Dispatch<IStoreState>) {
    const { noteId, text } = dependencies.data;

    dispatch(dependencies.onUpdateStarted(noteId, text));

    return dependencies.sendRequest(dependencies.apiAddress, HTTP_PUT, { text })
      .then(response => response.json())
      .then(noteBeforeUpdate => {
        const applicationNote = new Note ({id: noteBeforeUpdate.id, text});

        return dispatch(dependencies.onUpdateSuccessful(applicationNote));
      })
      .catch(error =>  dispatch(dependencies.onUpdateError(noteId, error.toString())));
  };
};
