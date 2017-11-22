import {
  ADD_NOTE_FOCUS,
  ADD_NOTE_BLUR,
} from '../constants/actionTypes';

export const startAddingNote = () => ({
  type: ADD_NOTE_FOCUS,
});

export const stopAddingNote = () => ({
  type: ADD_NOTE_BLUR,
});

