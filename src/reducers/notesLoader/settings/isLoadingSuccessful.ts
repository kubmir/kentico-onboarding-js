import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES,
} from '../../../constants/actionTypes';
import { IAction } from '../../../models/IAction';

export const isLoadingSuccessful = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case START_LOADING_NOTES:
    case LOADING_NOTES_FAILURE:
      return false;

    case LOADING_NOTES_SUCCESS:
      return true;

    default:
      return state;
  }
};
