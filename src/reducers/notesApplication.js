import { combineReducers } from 'redux';
import { addListMember } from './addListMember';
import { notes } from './notesList';

export const notesApplication = combineReducers({
  addListMember,
  notes,
});
