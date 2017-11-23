import {
  createStore,
  applyMiddleware,
} from 'redux';
import { logger } from 'redux-logger';
import { OrderedMap } from 'immutable';
import { application } from '../reducers/application';
import { Note } from '../models/Note';
import { IStoreState } from '../models/IStoreState';
import { Store } from 'react-redux';
import { throttle } from 'lodash';

const LOCAL_STORAGE_NOTES_KEY = 'notes';

const prepareInitialState = (getSavedNotes: (key: string) => Iterable<Note> | {}): IStoreState => {
  const persistedNotes = getSavedNotes(LOCAL_STORAGE_NOTES_KEY);

  return {
    notes: {
      listOfNotes: OrderedMap(persistedNotes),
      isAddingNote: false,
    },
  };
};

const saveData = (saveNotesData: (key: string, data: OrderedMap<string, Note>) => void, store: Store<IStoreState>) =>
  throttle(() => {
    const stateNotes = store
      .getState()
      .notes
      .listOfNotes;

    saveNotesData(LOCAL_STORAGE_NOTES_KEY, stateNotes);
  },       1000);

export const createApplicationStore = (getSavedNotes: (key: string) => Iterable<Note> | {},
  saveNotesData: (key: string, data: OrderedMap<string, Note>) => void) => {

  const store = createStore<IStoreState>(
    application,
    prepareInitialState(getSavedNotes),
    applyMiddleware(logger)
  );

  store.subscribe(saveData(saveNotesData, store));

  return store;
};
