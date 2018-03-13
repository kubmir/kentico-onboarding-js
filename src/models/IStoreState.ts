import { OrderedMap } from 'immutable';
import { Note } from './Note';
import { IFailedActionNote } from './IFailedActionNote';

export interface IStoreState {
  readonly notes: INotesState;
  readonly notesLoader: INotesLoaderState;
  readonly notesModal: INotesModalState;
}

export interface INotesModalState {
  readonly isConfirmModalVisible: boolean;
  readonly modalNote: IFailedActionNote;
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
