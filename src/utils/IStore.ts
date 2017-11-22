import { OrderedMap } from 'immutable';
import { Note } from '../models/Note';

export interface IStore {
  notes: {
    listOfNotes: OrderedMap<string, Note>;
    isAddingNote: boolean;
  };
}
