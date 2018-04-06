import { Dispatch } from 'redux';
import { Note } from '../../models/Note';
import { IAction } from '../../models/IAction';
import { IServerNote } from '../../models/IServerNote';
import { IStoreState } from '../../models/IStoreState';
import { HttpMethods } from '../../enums/HttpMethods';
import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES
} from '../../constants/actionTypes';

export interface IGetNotesDependencies {
  apiAddress: string;
  sendRequest: (apiAddress: string, httpMethod: HttpMethods, data?: object) => Promise<Response>;
  convertNotes: (serverNotes: IServerNote[]) => Iterable<[Guid, Note]>;
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
  function (dispatch: Dispatch<IStoreState>): Promise<IAction> {

    dispatch(startLoadingNotes());

    return dependencies.sendRequest(dependencies.apiAddress, HttpMethods.GET)
      .then(response => response.json())
      .then(serverNotes => {
          const applicationNotes = dependencies.convertNotes(serverNotes);

          return dispatch(storeLoadedNotes(applicationNotes));
        }
      )
      .catch(error => dispatch(displayError(error.toString())));
  };
