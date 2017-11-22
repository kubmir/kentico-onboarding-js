import memoize from 'memoizee';

const getNoteWithoutTextFactory = memoize((note) => ({ isEditActive: note.isEditActive }), { length: 1 });
const getAllIdsFactory = memoize((...params) => params, { length: false });


export const getNoteIsEditActive = (notes, noteId) =>
  getNoteWithoutTextFactory(notes.get(noteId));

export const getNoteById = (notes, noteId) =>
  notes.get(noteId);

export const getAllIds = (notes) =>
  getAllIdsFactory.apply(this, notes.keySeq().toArray());
