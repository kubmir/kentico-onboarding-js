import { OrderedMap } from 'immutable';
import { Note } from './Note';

export interface IStoreState {
  readonly notes: INotesState;
  readonly notesLoader: INotesLoaderState;
}

export interface INotesState {
  readonly listOfNotes: OrderedMap<Guid, Note>;
  readonly isAddingNote: boolean;
  readonly addNoteText: string;
}

export interface INotesLoaderState {
  readonly isLoadingFailed: boolean;
  readonly isLoadingSuccessful: boolean;
  readonly isLoadingNotes: boolean;
  readonly errorMessage: string;
}
