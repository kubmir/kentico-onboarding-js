import { combineReducers } from 'redux';
import { addListMember } from './addListMember';
import { listOfNotes } from './listOfNotes';

export const notesApplication = combineReducers({
  addListMember,
  notes: listOfNotes,
});
