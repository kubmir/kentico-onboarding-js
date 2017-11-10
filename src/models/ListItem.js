import { Record } from 'immutable';

const defaultListItem = {
  text: '',
  id: '00000000-0000-0000-0000-000000000000',
  isEditActive: false,
};
export const ListItem = Record(defaultListItem);
