import {
  SHOW_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL
} from '../../../constants/actionTypes';
import { IAction } from '../../../models/IAction';
import {
  defaultFailedActionNote,
  IFailedActionNote
} from '../../../models/IFailedActionNote';

export const modalNote = (state = defaultFailedActionNote, action: IAction): IFailedActionNote => {
  switch (action.type) {
    case SHOW_CONFIRM_MODAL:
      return {
        noteId: action.payload.noteId,
        failedAction: action.payload.failedAction,
      };

    case HIDE_CONFIRM_MODAL:
      return defaultFailedActionNote;

    default:
      return state;
  }
};
