import { combineReducers } from 'redux';
import { notes } from './notes/notes';

export const application = combineReducers({
  notes,
});
