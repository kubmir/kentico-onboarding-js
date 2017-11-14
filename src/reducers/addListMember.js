import { addListMemberInitialState } from '../utils/addListMemberInitialState';

export const addListMember = (state = addListMemberInitialState(), action) => {
  switch (action.type) {
    case 'START_FOCUS_ADD_LIST_MEMBER_INPUT':
      return changeIsAddListMemberFocused(state, action);
    case 'STOP_FOCUS_ADD_LIST_MEMBER_INPUT':
      return changeIsAddListMemberFocused(state, action);
    default:
      return state;
  }
};

const changeIsAddListMemberFocused = (state, action) => {
  const isAddListMemberFocused = action.payload.isAddListMemberFocused;

  return Object.assign({}, state, {
    isAddListMemberFocused,
  });
};

