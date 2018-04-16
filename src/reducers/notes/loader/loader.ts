import { combineReducers } from 'redux';
import { INotesLoaderState } from '../../IStoreState';
import { isLoadingNotes } from './settings/isLoadingNotes';
import { isLoadingSuccessful } from './settings/isLoadingSuccessful';
import { isLoadingFailed } from './settings/isLoadingFailed';
import { errorMessage } from './settings/errorMessage';

export const loader = combineReducers<INotesLoaderState>({
  isLoadingFailed,
  isLoadingSuccessful,
  isLoadingNotes,
  errorMessage,
});
