import {
  START_ADDING_NOTE_FOCUS,
  STOP_ADDING_NOTE_FOCUS,
} from '../../../constants/actionTypes';

export const isAddingNote = (state = false, action) => {
  switch (action.type) {
    case START_ADDING_NOTE_FOCUS:
      return true;
    case STOP_ADDING_NOTE_FOCUS:
      return false;
    default:
      return state;
  }
};
