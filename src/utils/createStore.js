import {
  createStore,
  applyMiddleware,
} from 'redux';
import { application } from '../reducers/application';
import logger from 'redux-logger';
import { OrderedMap } from 'immutable';
import throttle from 'lodash/throttle';

export const createApplicationStore = (getSavedNotes, saveNotesData) => {
  const persistedNotes = getSavedNotes('notes');
  let initialState = undefined;

  if (persistedNotes !== undefined) {
    initialState = {
      notes: {
        listOfNotes: OrderedMap(persistedNotes),
        isAddingNote: false,
      },
    };
  }

  const store = createStore(
    application,
    initialState,
    applyMiddleware(logger)
  );

  store.subscribe(throttle(() => {
    const stateNotes = store
      .getState()
      .notes
      .listOfNotes;

    saveNotesData('notes', stateNotes);
  }, 1000));

  return store;
};
