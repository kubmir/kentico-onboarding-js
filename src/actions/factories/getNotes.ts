import { INote } from '../../models/Note';
import { IAction } from '../../models/IAction';
import { IServerNote } from '../../models/IServerNote';

interface IGetNotesDependencies {
  apiAddress: string;
  onGettingStarted: () => IAction;
  onGettingError: (errorDescription: string) => IAction;
  onGettingSuccessful: (notes: Iterable<INote>) => IAction ;
  convertNotes: (serverNotes: IServerNote[]) => Iterable<INote>;
}

export const getNotesFactory = (dependencies: IGetNotesDependencies) => {
  return function(dispatch: any) {

    dispatch(dependencies.onGettingStarted());

    return fetch(dependencies.apiAddress)
      .then(
        response => response.json(),
        error => dependencies.onGettingError(error.toString())
      )
      .then(serializedServerNotes => {
        const serverNotes = JSON.parse(serializedServerNotes);
        const applicationNotes = dependencies.convertNotes(serverNotes);

        dispatch(dependencies.onGettingSuccessful(applicationNotes));
      });
  };
};

