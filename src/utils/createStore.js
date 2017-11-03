import {
  createStore,
  applyMiddleware,
} from 'redux';
import { notesApplication } from '../reducers/notesApplication';
import logger from 'redux-logger';

const store = createStore(
  notesApplication,
  applyMiddleware(logger)
);

export default store;
