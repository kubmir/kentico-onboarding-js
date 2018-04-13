import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES,
} from '../../../constants/actionTypes';
import { IAction } from '../../../actions/IAction';

export const isLoadingFailed = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case LOADING_NOTES_FAILURE:
      return true;

    case START_LOADING_NOTES:
    case LOADING_NOTES_SUCCESS:
      return false;

    default:
      return state;
  }
};
