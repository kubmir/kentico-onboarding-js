import { addListMember } from '../../src/reducers/addListMember';
import {
  prepareInitialState,
  prepareNoteObject,
} from './reducerTestUtils';

describe('Reducer notesApplication tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = prepareInitialState();
  });

  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
      payload: {},
    };

    const actualState = addListMember(initialState, unknownAction);

    expect(actualState).toEqual(initialState);
  });

  it('should return previous state if action for another reducer is dispatched', () => {
    const newNote = prepareNoteObject('Third test note - added', 3, false);

    const updateNoteAction = {
      type: 'UPDATE_NOTE',
      payload: newNote,
    };

    const actualState = addListMember(initialState, updateNoteAction);

    expect(actualState).toEqual(initialState);
  });

  it('should set isAddListMemberTouched to true when START_TOUCH_ADD_LIST_MEMBER_INPUT is dispatched', () => {
    const startTouchAction = {
      type: 'START_TOUCH_ADD_LIST_MEMBER_INPUT',
      payload: {
        isAddListMemberTouched: true,
      },
    };

    const actualState = addListMember(initialState, startTouchAction);

    expect(actualState.notes).toEqual(initialState.notes);
    expect(actualState.isAddListMemberTouched).toBeTruthy();
  });

  it('should set isAddListMemberTouched to false when STOP_TOUCH_ADD_LIST_MEMBER_INPUT is dispatched', () => {
    const startTouchAction = {
      type: 'STOP_TOUCH_ADD_LIST_MEMBER_INPUT',
      payload: {
        isAddListMemberTouched: false,
      },
    };

    const actualState = addListMember(initialState, startTouchAction);

    expect(actualState.notes).toEqual(initialState.notes);
    expect(actualState.isAddListMemberTouched).toBeFalsy();
  });
});
