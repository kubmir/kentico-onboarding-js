export const startFocusingAddListMember = () => ({
  type: 'START_FOCUS_ADD_LIST_MEMBER_INPUT',
  payload: {
    isAddListMemberFocused: true,
  },
});

export const stopFocusingAddListMember = () => ({
  type: 'STOP_FOCUS_ADD_LIST_MEMBER_INPUT',
  payload: {
    isAddListMemberFocused: false,
  },
});

