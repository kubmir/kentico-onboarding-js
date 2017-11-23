import * as memoize from 'memoizee';
import { OrderedMap } from 'immutable';
import { Note } from '../../../models/Note';

const getIsEditActive = memoize((note: Note) => ({ isEditActive: note.isEditActive }), { length: 1 });
const getIds = memoize((...params: string[]) => params, { length: false });

export const getNoteById = (notes: OrderedMap<string, Note>, noteId: string): Note =>
  notes.get(noteId);

export const getNoteIsEditActive = (notes: OrderedMap<string, Note>, noteId: string): { isEditActive: boolean } =>
  getIsEditActive(getNoteById(notes, noteId));

export const getAllIds = (notes: OrderedMap<string, Note>): string[] =>
  getIds(...notes.keySeq().toArray());
