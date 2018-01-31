import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';

export const startLoadingNotes = (): IAction => ({
  type: START_LOADING_NOTES
});

export const storeLoadedNotes = (serializedNotes: string): IAction => ({
  type: LOADING_NOTES_SUCCESS,
  payload: {
    notes: JSON.parse(serializedNotes),
  },
});

export const displayError = (errorDescription: string): IAction => ({
  type: LOADING_NOTES_FAILURE,
  payload : {
    errorDescription,
  },
});
