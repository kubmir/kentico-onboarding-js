import { OrderedMap } from 'immutable';
import { Note } from '../models/Note';
import { ApplicationError } from '../models/ApplicationError';

export interface IStoreState {
  readonly notes: INotesState;
  readonly notesLoader: INotesLoaderState;
  readonly listOfErrors: OrderedMap<Guid, ApplicationError>;
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
