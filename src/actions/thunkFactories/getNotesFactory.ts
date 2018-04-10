import { Dispatch } from 'redux';
import { Note } from '../../models/Note';
import { IAction } from '../../models/IAction';
import { IServerNote } from '../../models/IServerNote';
import { IStoreState } from '../../models/IStoreState';
import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES
} from '../../constants/actionTypes';
import { convertNotes } from '../../utils/noteConverter';

export interface IGetNotesDependencies {
  sendRequest: () => Promise<IServerNote[]>;
}

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

export const getNotesFactory = (dependencies: IGetNotesDependencies): Thunk =>
  (dispatch: Dispatch<IStoreState>): Promise<IAction> => {
    dispatch(startLoadingNotes());

    return dependencies
      .sendRequest()
      .then(serverNotes => {
          const applicationNotes = convertNotes(serverNotes);

          return dispatch(storeLoadedNotes(applicationNotes));
        }
      )
      .catch(error => dispatch(displayError(error.toString())));
  };
