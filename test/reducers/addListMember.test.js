import { addListMember } from '../../src/reducers/addListMember';
import {
  prepareNotesInitialState,
  prepareListItem,
} from '../testUtils/prepareTestData';

describe('Reducer addListMember tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = prepareNotesInitialState();
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
    const newNote = prepareListItem('Third test note - added', 3, false);

    const updateNoteAction = {
      type: 'UPDATE_NOTE',
      payload: newNote,
    };

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

    expect(actualState.notes).toEqual(initialState.notes);
    expect(actualState.isAddListMemberFocused).toBeTruthy();
  });

  it('should set isAddListMemberTouched to false when STOP_FOCUS_ADD_LIST_MEMBER_INPUT is dispatched', () => {
    const startTouchAction = {
      type: 'STOP_FOCUS_ADD_LIST_MEMBER_INPUT',
      payload: {
        isAddListMemberTouched: false,
      },
    };

    const actualState = addListMember(initialState, startTouchAction);

    expect(actualState.notes).toEqual(initialState.notes);
    expect(actualState.isAddListMemberTouched).toBeFalsy();
  });
});
