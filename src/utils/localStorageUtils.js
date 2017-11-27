import { Note } from '../models/Note';

export const prepareNotesForStoring = (notes) => (
  notes
    .valueSeq()
    .map(({ text, id: noteId }) => ({
      text,
      noteId,
    }))
);

export const prepareNotesForApplication = (databaseNotes) => (
  databaseNotes
    .map(note => ([
      note.noteId,
      new Note({
        id: note.noteId,
        ...note,
        isEditActive: false,
      }),
    ]))
);
