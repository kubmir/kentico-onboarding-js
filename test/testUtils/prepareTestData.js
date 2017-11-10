import { OrderedMap } from 'immutable';
import { ListItem } from '../../src/models/ListItem';

export const prepareActionWithUidPayload = (type, id) => ({
  type,
  payload: {
    id,
  },
});

export const prepareListItem = (text, id, isEditActive) =>
  new ListItem({
    text,
    id,
    isEditActive,
  });

export const prepareNotePayload = (text, id, isEditActive) => ({
  text,
  id,
  isEditActive,
});

export const prepareNotesInitialState = () => ({
  notes: OrderedMap(
    [
      [1, prepareListItem('First test note', 1, false)],
      [2, prepareListItem('Second test note', 2, false)],
    ],
  ),
});

export const prepareApplicationInitialState = () => ({
  notes: prepareNotesInitialState(),
  addListMember: {
    isAddListMemberFocused: false,
  },
});
