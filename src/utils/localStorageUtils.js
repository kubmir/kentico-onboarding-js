import { Note } from '../models/Note.ts';

export const prepareNotesForStoring = (notes) => (
  notes
    .valueSeq()
    .map(({ text, noteId }) => ({
      text,
      noteId,
    }))
);

export const prepareNotesForApplication = (notes) => (
  notes
    .map(note => ([
      note.noteId,
      new Note({
        ...note,
        isEditActive: false,
      }),
    ]))
);
