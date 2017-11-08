import { Record } from 'immutable';

export const NoteRecord = new Record({
  text: '',
  uid: undefined,
  isEditActive: false,
});
