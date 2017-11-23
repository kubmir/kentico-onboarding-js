import { OrderedMap } from 'immutable';
import { Note } from './Note';

export interface IStoreState {
  notes: {
    listOfNotes: OrderedMap<string, Note>;
    isAddingNote: boolean;
  };
}
