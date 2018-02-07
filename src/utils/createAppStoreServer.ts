import { application } from '../reducers/application';
import { IStoreState } from '../models/IStoreState';
import {
  applyMiddleware,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Store } from 'react-redux';
import { getAllNotes } from '../actions/serverActionCreators/getActionCreators';

export const createAppStoreServer = (): Store<IStoreState> => {

  const store = createStore<IStoreState>(
    application,
    applyMiddleware(logger, thunk)
  );

  store
    .dispatch(getAllNotes)
    .then(() => console.log('Store state after server loading of notes' + store.getState().notes.listOfNotes));

  return store;
};
