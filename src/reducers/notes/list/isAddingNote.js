export const isAddingNote = (state = false, action) => {
  switch (action.type) {
    case 'START_FOCUS_ADD_NOTE':
      return changeIsAddingNote(state, action);
    case 'STOP_FOCUS_ADD_NOTE':
      return changeIsAddingNote(state, action);
    default:
      return state;
  }
};

const changeIsAddingNote = (state, action) =>
  action.payload.isAddListMemberFocused;

