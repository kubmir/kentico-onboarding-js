import { Note } from '../models/Note';
import {
  SHOW_CONFIRM_MODAL,
  HIDE_CONFIRM_MODAL
} from '../constants/actionTypes';

export const showModalAction = (note: Note) => ({
  type: SHOW_CONFIRM_MODAL,
  payload: {
    noteId: note.id,
    failedAction: note.failedAction,
  },
});

export const hideModalAction = () => ({
  type: HIDE_CONFIRM_MODAL,
});
