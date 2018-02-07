import { Note } from '../../models/Note';
import { IAction } from '../../models/IAction';
import { IServerNote } from '../../models/IServerNote';

interface IGetNotesDependencies {
  apiAddress: string;
  onGettingStarted: () => IAction;
  onGettingError: (errorDescription: string) => IAction;
  onGettingSuccessful: (notes: Iterable<[Guid, Note]>) => IAction;
  convertNotes: (serverNotes: IServerNote[]) => Iterable<[Guid, Note]>;
}

export const getNotesFactory = (dependencies: IGetNotesDependencies) => {
  return function (dispatch: any) {

    dispatch(dependencies.onGettingStarted());

    return fetch(dependencies.apiAddress)
      .then(
        response => response.json(),
        error => dependencies.onGettingError(error.toString())
      )
      .then(
        serverNotes => {
          const applicationNotes = dependencies.convertNotes(serverNotes);

          dispatch(dependencies.onGettingSuccessful(applicationNotes));
        },
        error => dependencies.onGettingError(error.toString()),
      );
  };
};

