import {
  createStore,
  applyMiddleware,
} from 'redux';
import { application } from '../reducers/application.ts';
import logger from 'redux-logger';
import { OrderedMap } from 'immutable';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_NOTES_KEY = 'notes';

export const createApplicationStore = (getSavedNotes, saveNotesData) => {
  const store = createStore(
    application,
    prepareInitialState(getSavedNotes),
    applyMiddleware(logger)
  );

  store.subscribe(saveData(saveNotesData, store));

  return store;
};

const prepareInitialState = (getSavedNotes) => {
  const persistedNotes = getSavedNotes(LOCAL_STORAGE_NOTES_KEY);

  return ({
    notes: {
      listOfNotes: OrderedMap(persistedNotes),
      isAddingNote: false,
    },
  });
};

const saveData = (saveNotesData, store) =>
  throttle(() => {
    const stateNotes = store
      .getState()
      .notes
      .listOfNotes;

    saveNotesData(LOCAL_STORAGE_NOTES_KEY, stateNotes);
  }, 1000);

