import * as types from '../../src/constants/actionTypes';
import * as actionCreators from '../../src/actions/addListMemberActionCreators';

describe('addListMemberActionCreators tests', () => {
  it('startFocusingAddListMember - should create an action START_FOCUS_ADD_LIST_MEMBER_INPUT', () => {
    const expectedAction = {
      type: types.START_FOCUS_ADD_LIST_MEMBER_INPUT,
      payload: {
        isAddListMemberFocused: true,
      },
    };

    const returnedAction = actionCreators.startFocusingAddListMember();

    expect(returnedAction).toEqual(expectedAction);
  });

  it('stopFocusingAddListMember - should create an action STOP_FOCUS_ADD_LIST_MEMBER_INPUT', () => {
    const expectedAction = {
      type: types.STOP_FOCUS_ADD_LIST_MEMBER_INPUT,
      payload: {
        isAddListMemberFocused: false,
      },
    };

    const returnedAction = actionCreators.stopFocusingAddListMember();

    expect(returnedAction).toEqual(expectedAction);
  });
});

