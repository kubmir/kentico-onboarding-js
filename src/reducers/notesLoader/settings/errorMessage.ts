import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES,
} from '../../../constants/actionTypes';
import { IAction } from '../../../models/IAction';

const NO_ERROR_MESSAGE = '';

export const errorMessage = (state = NO_ERROR_MESSAGE, action: IAction): string => {
  switch (action.type) {
    case START_LOADING_NOTES:
      return NO_ERROR_MESSAGE;
    case LOADING_NOTES_FAILURE:
      return action.payload.errorDescription;
    case LOADING_NOTES_SUCCESS:
      return NO_ERROR_MESSAGE;
    default:
      return state;
  }
};
