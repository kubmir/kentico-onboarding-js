import {
  CANCEL_FAILED_ADD_ACTION,
  CANCEL_FAILED_DELETE_ACTION,
  CANCEL_FAILED_UPDATE_ACTION,
  SHOW_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL
} from '../../../constants/actionTypes';
import { IAction } from '../../../models/IAction';

export const isConfirmModalVisible = (state = false, action: IAction): boolean => {
  switch (action.type) {
    case SHOW_CONFIRM_MODAL:
      return true;

    case HIDE_CONFIRM_MODAL:
    case CANCEL_FAILED_ADD_ACTION:
    case CANCEL_FAILED_UPDATE_ACTION:
    case CANCEL_FAILED_DELETE_ACTION:
      return false;

    default:
      return state;
  }
};
