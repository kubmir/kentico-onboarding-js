import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';

export interface IStore {
  notes: {
    listOfNotes: OrderedMap<string, ListItem>;
    isAddingNote: boolean;
  };
}
