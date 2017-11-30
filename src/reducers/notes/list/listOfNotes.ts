import { OrderedMap } from 'immutable';
import { Note } from '../../../models/Note';
import {
  ADD_NOTE,
  CANCEL_EDITING_NOTE,
  DELETE_NOTE,
  START_EDITING_NOTE,
  UPDATE_NOTE,
} from '../../../constants/actionTypes';
import { IAction } from '../../../models/IAction';

const setNoteToState = (state: OrderedMap<string, Note>, action: IAction): OrderedMap<string, Note> => {
  const { noteId, text } = action.payload;
  const noteToAdd = new Note({
    id: noteId,
    text,
    isEditActive: false,
  });
  const newNotes = state
    .set(noteId, noteToAdd);

  return newNotes;
};

const updateText = (state: OrderedMap<string, Note>, action: IAction): OrderedMap<string, Note> => {
  const { noteId, text } = action.payload;

  return state.update(noteId, note => note.with({
    text,
    isEditActive: false,
  }));
};

const deleteNote = (state: OrderedMap<string, Note>, action: IAction): OrderedMap<string, Note> => {
  const currentNotes = state
    .delete(action.payload.noteId);

  return currentNotes;
};

const updateEditingMode = (state: OrderedMap<string, Note>, action: IAction, newEditingMode: boolean): OrderedMap<string, Note> => {
  const { noteId } = action.payload;

  return state.update(noteId, note => note.with({
    isEditActive: newEditingMode,
  }));
};

export const listOfNotes = (state = OrderedMap<string, Note>(), action: IAction): OrderedMap<string, Note> => {
  switch (action.type) {
    case ADD_NOTE:
      return setNoteToState(state, action);
    case UPDATE_NOTE:
      return updateText(state, action);
    case DELETE_NOTE:
      return deleteNote(state, action);
    case START_EDITING_NOTE:
      return updateEditingMode(state, action, true);
    case CANCEL_EDITING_NOTE:
      return updateEditingMode(state, action, false);
    default:
      return state;
  }
};
