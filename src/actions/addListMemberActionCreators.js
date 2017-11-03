export const startTouchingAddListMember = () => ({
  type: 'START_TOUCH_ADD_LIST_MEMBER_INPUT',
  payload: {
    isAddListMemberTouched: true,
  },
});

export const stopTouchingAddListMember = () => ({
  type: 'STOP_TOUCH_ADD_LIST_MEMBER_INPUT',
  payload: {
    isAddListMemberTouched: false,
  },
});

