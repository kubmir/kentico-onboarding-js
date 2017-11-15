export const isAddingNote = (state = false, action) => {
  switch (action.type) {
    case 'START_ADDING_NOTE':
      return changeIsAddingNote(state, action);
    case 'STOP_ADDING_NOTE':
      return changeIsAddingNote(state, action);
    default:
      return state;
  }
};

const changeIsAddingNote = (state, action) =>
  action.payload.isAddListMemberFocused;

