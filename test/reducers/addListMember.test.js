import { addListMember } from '../../src/reducers/addListMember';
import {
  prepareAddListMemberInitialState,
  prepareActionWithPayload,
} from '../testUtils/prepareTestData';

describe('Reducer addListMember tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = prepareAddListMemberInitialState();
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
    const updateNoteAction = prepareActionWithPayload('UPDATE_NOTE', 3, 'Test note', false);

    const actualState = addListMember(initialState, updateNoteAction);

    expect(actualState).toEqual(initialState);
  });

  it('should set isAddListMemberFocused to true when START_FOCUS_ADD_LIST_MEMBER_INPUT is dispatched', () => {
    const startTouchAction = {
      type: 'START_FOCUS_ADD_LIST_MEMBER_INPUT',
      payload: {
        isAddListMemberFocused: true,
      },
    };

    const actualState = addListMember(initialState, startTouchAction);

    expect(actualState.isAddListMemberFocused).toBeTruthy();
  });

  it('should set isAddListMemberFocused to false when STOP_FOCUS_ADD_LIST_MEMBER_INPUT is dispatched', () => {
    const startTouchAction = {
      type: 'STOP_FOCUS_ADD_LIST_MEMBER_INPUT',
      payload: {
        isAddListMemberFocused: false,
      },
    };

    initialState = {
      isAddListMemberFocused: true,
    };

    const actualState = addListMember(initialState, startTouchAction);

    expect(actualState.isAddListMemberFocused).toBeFalsy();
  });
});
