import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';
import { Note } from '../models/Note';

export const startLoadingNotes = (): IAction => ({
  type: START_LOADING_NOTES
});

export const storeLoadedNotes = (notes: Iterable<[Guid, Note]>): IAction => ({
  type: LOADING_NOTES_SUCCESS,
  payload: {
    notes,
  },
});

export const displayError = (errorDescription: string): IAction => ({
  type: LOADING_NOTES_FAILURE,
  payload : {
    errorDescription,
  },
});
