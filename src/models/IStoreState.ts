import { OrderedMap } from 'immutable';
import { Note } from './Note';

export interface IStoreState {
  notes: INotesState;
};

export interface INotesState {
    readonly listOfNotes: OrderedMap<string, Note>;
    readonly isAddingNote: boolean;
    readonly addNoteText: string;
}
