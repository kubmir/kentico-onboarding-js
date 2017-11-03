export const addNewNote = (noteText, generateUidFunction) => ({
  type: 'ADD_NEW_NOTE',
  payload: {
    text: noteText,
    isEditActive: false,
    uid: generateUidFunction(),
  },
});

export const updateNote = (textChanges, noteUid) => ({
  type: 'UPDATE_NOTE',
  payload: {
    text: textChanges,
    uid: noteUid,
    isEditActive: false,
  },
});

export const deleteNote = (noteUid) => ({
  type: 'DELETE_NOTE',
  payload: {
    uid: noteUid,
  },
});

export const startEditingNote = (noteUid) => ({
  type: 'START_EDITING_NOTE',
  payload: {
    uid: noteUid,
  },
});

export const cancelEditingNote = (noteUid) => ({
  type: 'CANCEL_EDITING_NOTE',
  payload: {
    uid: noteUid,
  },
});
