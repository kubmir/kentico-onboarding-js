import notesInitialState from '../utils/notesInitialState';

export const notes = (state = notesInitialState(), action) => {
  switch (action.type) {
    case 'ADD_NEW_NOTE':
      return addNewNote(state, action);
    case 'UPDATE_NOTE':
      return updateNote(state, action);
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

const addNewNote = (state, action) => {
  const payload = action.payload;
  const addNote = {
    text: payload.text,
    uid: payload.uid,
    isEditActive: payload.isEditActive,
  };

  return Object.assign({}, state, {
    notes: state
      .notes
      .set(payload.uid, addNote),
  });
};

const updateNote = (state, action) => {
  const updates = action.payload;
  const previousNote = state
    .notes
    .get(updates.uid);

  const updatedNote = {
    text: updates.text !== previousNote.text
      ? updates.text
      : previousNote.text,
    uid: updates.uid,
    isEditActive: updates.isEditActive,
  };

  return Object.assign({}, state, {
    notes: state
      .notes
      .set(updates.uid, updatedNote),
  });
};

const deleteNote = (state, action) => {
  return Object.assign({}, state, {
    notes: state
      .notes
      .delete(action.payload.uid),
  });
};

const changeEditingMode = (state, action, newEditingMode) => {
  const uid = action.payload.uid;
  const changeNote = state
    .notes
    .get(uid);
  const updatedNote = {
    text: changeNote.text,
    uid,
    isEditActive: newEditingMode,
  };

  return Object.assign({}, state, {
    notes: state
      .notes
      .set(uid, updatedNote),
  });
};
