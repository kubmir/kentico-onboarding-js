import { Record } from 'immutable';

const defaultNote = {
  text: '',
  noteId: '00000000-0000-0000-0000-000000000000',
  isEditActive: false,
};
export const Note = Record(defaultNote);
