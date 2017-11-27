import { OrderedMap } from 'immutable';
import { Note } from '../models/Note';

interface INoteToStore {
  text: string;
  noteId: string;
}

export const prepareNotesForStoring = (notes: OrderedMap<string, Note>): Iterable<INoteToStore> => (
  notes
    .valueSeq()
    .map(({ text, id: noteId }: Note) => ({
      text,
      noteId,
    }))
);

export const prepareNotesForApplication = (databaseNotes: OrderedMap<string, INoteToStore>): Iterable<Note> => (
  databaseNotes
    .map(({text, noteId: id }: INoteToStore) => ([
      id,
      new Note({
        id,
        text,
        isEditActive: false,
      }),
    ]))
);
