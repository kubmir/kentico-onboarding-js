import { OrderedMap } from 'immutable';
import { Note } from './Note';
import { Guid } from '../@types/globals';

export interface IStoreState {
  readonly notes: INotesState;
}

export interface INotesState {
    readonly listOfNotes: OrderedMap<Guid, Note>;
    readonly isAddingNote: boolean;
    readonly addNoteText: string;
}
