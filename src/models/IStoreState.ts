import { OrderedMap } from 'immutable';
import { Note } from './Note';

export type IStoreState = INotesState;

export interface INotesState {
  readonly notes: {
    readonly listOfNotes: OrderedMap<string, Note>;
    readonly isAddingNote: boolean;
    readonly addNoteText: string;
  };
}
