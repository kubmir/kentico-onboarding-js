import { ListItem } from '../models/ListItem';

export const prepareNotesForStoring = (notes) => (
  notes
    .valueSeq()
    .map(note => ({
      text: note.text,
      id: note.id,
    }))
);

export const prepareNotesForApplication = (notes) => (
  notes
    .map(note => ([
      note.id,
      new ListItem({
        ...note,
        isEditActive: false,
      }),
    ]))
);
