type ActionType = 'ADD_NOTE' |
  'UPDATE_NOTE' |
  'DELETE_NOTE' |
  'START_EDITING_NOTE' |
  'CANCEL_EDITING_NOTE' |
  'ADD_NOTE_FOCUS' |
  'ADD_NOTE_BLUR';

export interface IAction {
  type: ActionType;
  payload?: any;
};
