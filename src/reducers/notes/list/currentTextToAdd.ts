import { IAction } from '../../../models/IAction';
import {
  ADD_NOTE,
  ADD_NOTE_TEXT_CHANGE
} from '../../../constants/actionTypes';

export const currentTextToAdd = (state = '', action: IAction): string => {
  switch (action.type) {
    case ADD_NOTE_TEXT_CHANGE:
      return action.payload.newText;
    case ADD_NOTE:
      return '';
    default:
      return state;
  }
};
