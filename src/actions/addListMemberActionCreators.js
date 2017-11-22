import {
  START_ADDING_NOTE,
  STOP_ADDING_NOTE,
} from '../constants/actionTypes';

export const startAddingNote = () => ({
  type: START_ADDING_NOTE,
  payload: {
    isAddListMemberFocused: true,
  },
});

export const stopAddingNote = () => ({
  type: STOP_ADDING_NOTE,
  payload: {
    isAddListMemberFocused: false,
  },
});

