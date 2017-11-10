import {
  createStore,
  applyMiddleware,
} from 'redux';
import { notesApplication } from '../reducers/notesApplication';
import logger from 'redux-logger';
import { OrderedMap } from 'immutable';
import throttle from 'lodash/throttle';

export const createApplicationStore = (getSavedNotes, saveNotesData) => {
  const persistedNotes = getSavedNotes();
  let initialState = undefined;

  if (persistedNotes !== undefined) {
    initialState = {
      listOfNotes: {
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
    saveNotesData(store.getState().listOfNotes);
  }, 1000));

  return store;
};
