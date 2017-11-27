import memoize from 'memoizee';

const getIds = memoize((...params) => params, { length: false });

export const getNoteById = (notes, noteId) =>
  notes.get(noteId);

export const getAllIds = (notes) =>
  getIds(...notes.keySeq().toArray());
