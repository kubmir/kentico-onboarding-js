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
import { Guid } from '../../../@types/globals';

const addNote = (state: OrderedMap<string, Note>, payload: { noteId: Guid, text: string }): OrderedMap<string, Note> => {
  const { noteId, text } = payload;
  const noteToAdd = new Note({
    id: noteId,
    text,
  });
  const newNotes = state
    .set(noteId, noteToAdd);

  return newNotes;
};

const updateText = (state: OrderedMap<string, Note>, payload: { noteId: Guid, text: string }): OrderedMap<string, Note> => {
  const { noteId, text } = payload;

  return state.update(noteId, note => note.with({
    text,
    isEditActive: false,
  }));
};

const deleteNote = (state: OrderedMap<string, Note>, payload: {noteId: Guid}): OrderedMap<string, Note> => {
  const currentNotes = state
    .delete(payload.noteId);

  return currentNotes;
};

const updateEditingMode = (state: OrderedMap<string, Note>, payload: {noteId: Guid}, newEditingMode: boolean): OrderedMap<string, Note> => {
  const { noteId } = payload;

  return state.update(noteId, note => note.with({
    isEditActive: newEditingMode,
  }));
};

export const listOfNotes = (state = OrderedMap<string, Note>(), action: IAction): OrderedMap<string, Note> => {
  switch (action.type) {
    case ADD_NOTE:
      return addNote(state, action.payload);
    case UPDATE_NOTE:
      return updateText(state, action.payload);
    case DELETE_NOTE:
      return deleteNote(state, action.payload);
    case START_EDITING_NOTE:
      return updateEditingMode(state, action.payload, true);
    case CANCEL_EDITING_NOTE:
      return updateEditingMode(state, action.payload, false);
    default:
      return state;
  }
};
