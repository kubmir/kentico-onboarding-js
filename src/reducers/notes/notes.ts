import { combineReducers } from 'redux';
import { isAddingNote } from './list/isAddingNote';
import { listOfNotes } from './list/listOfNotes';

export const notes = combineReducers({
  isAddingNote,
  listOfNotes,
});
