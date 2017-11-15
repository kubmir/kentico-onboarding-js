export const addNewNoteFactory = (generateIdFunction) => (noteText) => ({
  type: 'ADD_NOTE',
  payload: {
    text: noteText,
    isEditActive: false,
    id: generateIdFunction(),
  },
});

export const updateNote = (textChanges, id) => ({
  type: 'UPDATE_NOTE',
  payload: {
    text: textChanges,
    id,
    isEditActive: false,
  },
});

export const deleteNote = (id) => ({
  type: 'DELETE_NOTE',
  payload: {
    id,
  },
});

export const startEditingNote = (id) => ({
  type: 'START_EDITING_NOTE',
  payload: {
    id,
  },
});

export const cancelEditingNote = (id) => ({
  type: 'CANCEL_EDITING_NOTE',
  payload: {
    id,
  },
});
