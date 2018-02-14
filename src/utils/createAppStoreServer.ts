import { application } from '../reducers/application';
import { IStoreState } from '../models/IStoreState';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Store } from 'react-redux';
import { getAllNotes } from '../actions/actionCreators';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createAppStoreServer = (): Store<IStoreState> => {

  const store = createStore<IStoreState>(
    application,
    composeEnhancers(applyMiddleware(logger, thunk)),
  );

  store.dispatch(getAllNotes);

  return store;
};
