import { combineReducers } from 'redux';
import { notes } from './notes/notes';
import { IStoreState } from '../models/IStoreState';
import { notesLoader } from './notesLoader/notesLoader';
import { notesModal } from './notesModal/notesModal';

export const application = combineReducers<IStoreState>({
  notes,
  notesLoader,
  notesModal,
});
