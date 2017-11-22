import memoize from 'memoizee';

const getIsEditActive = memoize((note) => ({ isEditActive: note.isEditActive }), { length: 1 });
const getIds = memoize((...params) => params, { length: false });

export const getNoteIsEditActive = (notes, noteId) =>
  getIsEditActive(getNoteById(notes, noteId));

export const getNoteById = (notes, noteId) =>
  notes.get(noteId);

export const getAllIds = (notes) =>
  getIds(...notes.keySeq().toArray());
