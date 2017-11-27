import { OrderedMap } from 'immutable';
import { Note } from '../models/Note';

interface NoteToStore {
  text: string;
  noteId: string;
}

export const prepareNotesForStoring = (notes: OrderedMap<string, Note>): Iterable<NoteToStore> => (
  notes
    .valueSeq()
    .map(({ text, id: noteId }: Note) => ({
      text,
      noteId,
    }))
);

export const prepareNotesForApplication = (databaseNotes: OrderedMap<string, NoteToStore>): Iterable<Note> => (
  databaseNotes
    .map(({text, noteId: id }: NoteToStore) => ([
      id,
      new Note({
        id,
        text,
        isEditActive: false,
      }),
    ]))
);
