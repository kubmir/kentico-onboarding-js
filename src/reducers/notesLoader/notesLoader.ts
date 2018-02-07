import { combineReducers } from 'redux';
import { INotesLoaderState } from '../../models/IStoreState';
import { isLoadingNotes } from './settings/isLoadingNotes';
import { isLoadingSuccessful } from './settings/isLoadingSuccessful';
import { isLoadingFailed } from './settings/isLoadingFailed';
import { errorMessage } from './settings/errorMessage';

export const notesLoader = combineReducers<INotesLoaderState>({
  isLoadingFailed,
  isLoadingSuccessful,
  isLoadingNotes,
  errorMessage,
});
