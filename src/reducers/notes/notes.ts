import { combineReducers } from 'redux';
import { isAddingNote } from './list/isAddingNote';
import { listOfNotes } from './list/listOfNotes';
import { currentTextToAdd } from './list/currentTextToAdd';
import { INotesState } from '../../models/IStoreState';

export const notes = combineReducers<INotesState>({
  isAddingNote,
  listOfNotes,
  currentTextToAdd,
});
