import { OrderedMap } from 'immutable';
import { ListItem } from './ListItem';

export interface IStore {
  notes: {
    listOfNotes: OrderedMap<string, ListItem>;
    isAddingNote: boolean;
  };
}
