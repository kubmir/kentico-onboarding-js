import * as memoize from 'memoizee';
import { OrderedMap } from 'immutable';
import { Note } from '../../../models/Note';
import { Guid } from '../../../@types/globals';

const getIds = memoize((...params: string[]) => params, { length: false });

export const getNoteById = (notes: OrderedMap<string, Note>, noteId: Guid): Note =>
  notes.get(noteId);

export const getAllIds = (notes: OrderedMap<string, Note>): string[] =>
  getIds(...notes.keySeq().toArray());
