import { OrderedMap } from 'immutable';

export const prepareActionWithUidPayload = (type, uid) => {
  return {
    type,
    payload: {
      uid,
    },
  };
};

export const prepareNoteObject = (text, uid, isEditActive) => {
  return {
    text,
    uid,
    isEditActive,
  };
};

export const prepareInitialState = () => {
  return {
    notes: OrderedMap(
      [
        [1, prepareNoteObject('First test note', 1, false)],
        [2, prepareNoteObject('Second test note', 2, false)],
      ],
    ),
    isAddListMemberTouched: false,
  };
};
