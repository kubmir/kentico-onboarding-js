import { OrderedMap } from 'immutable';
import { Note } from '../models/Note';

interface NoteToStore {
  text: string;
  noteId: string;
}

export const prepareNotesForStoring = (notes: OrderedMap<string, Note>): Iterable<NoteToStore> => (
  notes
    .valueSeq()
    .map(({ text, noteId }: Note) => ({
      text,
      noteId,
    }))
);

export const prepareNotesForApplication = (notes: OrderedMap<string, Note>): Iterable<Note> => (
  notes
    .map(({text, noteId}: Note) => ([
      noteId,
      new Note({
        noteId,
        text,
        isEditActive: false,
      }),
    ]))
);
