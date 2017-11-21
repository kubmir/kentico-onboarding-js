import {
  createStore,
  applyMiddleware,
} from 'redux';
import { application } from '../reducers/application';
import logger from 'redux-logger';
import { OrderedMap } from 'immutable';
import throttle from 'lodash/throttle';

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
  const persistedNotes = getSavedNotes('notes');

  return persistedNotes === undefined
    ? undefined
    : {
      notes: {
        listOfNotes: OrderedMap(persistedNotes),
        isAddingNote: false,
      },
    };
};

const saveData = (saveNotesData, store) =>
  throttle(() => {
    const stateNotes = store
      .getState()
      .notes
      .listOfNotes;

    saveNotesData('notes', stateNotes);
  }, 1000);

