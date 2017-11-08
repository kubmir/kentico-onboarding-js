import { Record } from 'immutable';

export const NoteRecord = new Record({
  text: '',
  id: undefined,
  isEditActive: false,
});
