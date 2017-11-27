import { OrderedMap } from 'immutable';
import { Note } from './Note';

export type IStoreState = INotesState;

export interface INotesState {
  notes: {
    listOfNotes: OrderedMap<string, Note>;
    isAddingNote: boolean;
    currentTextToAdd: string;
  };
}
