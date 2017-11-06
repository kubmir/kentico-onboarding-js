export const addNewNote = (noteText, generateUidFunction) => ({
  type: 'ADD_NEW_NOTE',
  payload: {
    text: noteText,
    isEditActive: false,
    uid: generateUidFunction(),
  },
});

export const updateNote = (textChanges, uid) => ({
  type: 'UPDATE_NOTE',
  payload: {
    text: textChanges,
    uid,
    isEditActive: false,
  },
});

export const deleteNote = (uid) => ({
  type: 'DELETE_NOTE',
  payload: {
    uid,
  },
});

export const startEditingNote = (uid) => ({
  type: 'START_EDITING_NOTE',
  payload: {
    uid,
  },
});

export const cancelEditingNote = (uid) => ({
  type: 'CANCEL_EDITING_NOTE',
  payload: {
    uid,
  },
});
