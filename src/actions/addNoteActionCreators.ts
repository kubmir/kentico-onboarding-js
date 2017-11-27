import {
  ADD_NOTE_FOCUS,
  ADD_NOTE_BLUR,
} from '../constants/actionTypes';
import { IAction } from '../models/IAction';

export const startAddingNote = (): IAction => ({
  type: ADD_NOTE_FOCUS,
});

export const stopAddingNote = (): IAction => ({
  type: ADD_NOTE_BLUR,
});

