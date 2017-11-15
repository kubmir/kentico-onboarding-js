import { ListItem } from '../../../models/ListItem';
import { OrderedMap } from 'immutable';

export const listOfNotes = (state = OrderedMap(), action) => {
  switch (action.type) {
    case 'ADD_NOTE':
    case 'UPDATE_NOTE':
      return setNoteToState(state, action);
    case 'DELETE_NOTE':
      return deleteNote(state, action);
    case 'START_EDITING_NOTE':
      return changeEditingMode(state, action, true);
    case 'CANCEL_EDITING_NOTE':
      return changeEditingMode(state, action, false);
    default:
      return state;
  }
};

const setNoteToState = (state, action) => {
  const payload = action.payload;
  const addNote = new ListItem({
    id: payload.id,
    text: payload.text,
    isEditActive: payload.isEditActive,
  });
  const newNotes = state
    .set(payload.id, addNote);

  return newNotes;
};

const deleteNote = (state, action) => {
  const currentNotes = state
    .delete(action.payload.id);

  return currentNotes;
};

const changeEditingMode = (state, action, newEditingMode) => {
  const id = action.payload.id;
  const noteText = state
    .get(id)
    .text;

  const editAction = {
    payload: {
      id,
      text: noteText,
      isEditActive: newEditingMode,
    },
  };

  return setNoteToState(state, editAction);
};
