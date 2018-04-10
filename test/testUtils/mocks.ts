import { OrderedMap } from 'immutable';
import { IStoreState } from '../../src/models/IStoreState';
import { IServerNote } from '../../src/models/IServerNote';

export const mockServerNote = (text: string, id: Guid): IServerNote => ({
  text,
  id,
  lastModificationDate: new Date(2017, 12, 5),
  creationDate: new Date(2017, 12, 4),
});

export const FALSE_INITIAL_STATE = false;
export const TRUE_INITIAL_STATE = true;

export const mockStoreState = (): IStoreState =>
  ({
    notes: {
      listOfNotes: OrderedMap(),
      isAddingNote: false,
      addNoteText: '',
    },
    notesLoader: {
      isLoadingFailed: false,
      isLoadingNotes: false,
      isLoadingSuccessful: false,
      errorMessage: '',
    }
  });

