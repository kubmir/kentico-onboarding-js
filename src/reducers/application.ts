import { combineReducers } from 'redux';
import { notes } from './notes/notes';
import { IStoreState } from './IStoreState';
import { notesLoader } from './notesLoader/notesLoader';

export const application = combineReducers<IStoreState>({
  notes,
  notesLoader,
});
