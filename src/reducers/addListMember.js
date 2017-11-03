import addListMemberInitialState from '../utils/addListMemberInitialState';

export const addListMember = (state = addListMemberInitialState(), action) => {
  switch (action.type) {
    case 'START_TOUCH_ADD_LIST_MEMBER_INPUT':
      return changeIsAddListMemberTouched(state, action);
    case 'STOP_TOUCH_ADD_LIST_MEMBER_INPUT':
      return changeIsAddListMemberTouched(state, action);
    default:
      return state;
  }
};

const changeIsAddListMemberTouched = (state, action) => {
  return Object.assign({}, state, {
    isAddListMemberTouched: action.payload.isAddListMemberTouched,
  });
};

