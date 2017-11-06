import {
  createStore,
  applyMiddleware,
} from 'redux';
import { notesApplication } from '../reducers/notesApplication';
import logger from 'redux-logger';

import {
  getSavedNotes,
  saveNotesData,
} from './localStorage';
import { OrderedMap } from 'immutable';
import throttle from 'lodash/throttle';

export const createApplicationStore = () => {
  const persistedNotes = getSavedNotes();
  let initialState = undefined;

  if (persistedNotes !== undefined) {
    initialState = {
      notes: {
        notes: OrderedMap(persistedNotes),
      },
      addListMember: {
        isAddListMemberFocused: false,
      },
    };
  }

  const store = createStore(
    notesApplication,
    initialState,
    applyMiddleware(logger)
  );

  store.subscribe(throttle(() => {
    saveNotesData(store.getState().notes);
  }, 1000));

  return store;
};
