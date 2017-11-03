import * as types from '../../src/constants/actionTypes';
import * as actionCreators from '../../src/actions/addListMemberActionCreators';

describe('notesActionCreators', () => {
  it('should create an action START_TOUCH_ADD_LIST_MEMBER_INPUT', () => {
    const expectedAction = {
      type: types.START_TOUCH_ADD_LIST_MEMBER_INPUT,
      payload: {
        isAddListMemberTouched: true,
      },
    };

    const returnedAction = actionCreators.startTouchingAddListMember();

    expect(returnedAction).toEqual(expectedAction);
  });

  it('should create an action STOP_TOUCH_ADD_LIST_MEMBER_INPUT', () => {
    const expectedAction = {
      type: types.STOP_TOUCH_ADD_LIST_MEMBER_INPUT,
      payload: {
        isAddListMemberTouched: false,
      },
    };

    const returnedAction = actionCreators.stopTouchingAddListMember();

    expect(returnedAction).toEqual(expectedAction);
  });
});

