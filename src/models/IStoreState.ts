import { OrderedMap } from 'immutable';
import { Note } from './Note';

export interface IStore {
  notes: {
    listOfNotes: OrderedMap<string, Note>;
    isAddingNote: boolean;
  };
}
