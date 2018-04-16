import { Dispatch } from 'redux';
import {
  Note,
  IServerNote
} from '../../models/Note';
import { IAction } from '../IAction';
import { IStoreState } from '../../reducers/IStoreState';
import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES
} from '../../constants/actionTypes';
import { convertNotes } from '../../utils/noteConverter';
import { generateLocalId } from '../../utils/generateLocalId';

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

const loadingFailedFactory = (generateErrorId: () => Guid) => (errorDescription: string): IAction => ({
  type: LOADING_NOTES_FAILURE,
  payload: {
    errorDescription,
    errorId: generateErrorId(),
  },
});

export const displayError = (errorDescription: string) =>
  loadingFailedFactory(generateLocalId)(errorDescription);

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
