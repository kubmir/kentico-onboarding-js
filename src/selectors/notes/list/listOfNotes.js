import memoize from 'memoizee';

const getNoteWithoutTextFactory = memoize((note) => ({ isEditActive: note.isEditActive }), { length: 1 });
const getAllIdsFactory = memoize((...params) => params, { length: false });


export const getNoteIsEditActive = (notes, id) =>
  getNoteWithoutTextFactory(notes.get(id));

export const getNoteById = (notes, id) =>
  notes.get(id);

export const getAllIds = (notes) =>
  getAllIdsFactory.apply(this, notes.keySeq().toArray());
