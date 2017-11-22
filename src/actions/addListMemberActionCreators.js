import {
  START_ADDING_NOTE_FOCUS,
  STOP_ADDING_NOTE_FOCUS,
} from '../constants/actionTypes';

export const startAddingNote = () => ({
  type: START_ADDING_NOTE_FOCUS,
});

export const stopAddingNote = () => ({
  type: STOP_ADDING_NOTE_FOCUS,
});

