import { Record } from 'immutable';

export const Note = new Record({
  text: '',
  id: undefined,
  isEditActive: false,
});
