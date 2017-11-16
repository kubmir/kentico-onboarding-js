import { isAddingNote } from '../../../../src/reducers/notes/list/isAddingNote';
import {
  prepareAddListMemberInitialState,
} from '../../../testUtils/prepareTestData';
import {
  startAddingNote,
  stopAddingNote,
} from '../../../../src/actions/actionCreators';

describe('Reducer isAddingNote tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = prepareAddListMemberInitialState();
  });

  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
      payload: {},
    };

    const actualState = isAddingNote(initialState, unknownAction);

    expect(actualState).toEqual(initialState);
  });

  it('should set isAddListMemberFocused to true when START_ADDING_NOTE is dispatched', () => {
    const startTouchAction = startAddingNote();
    const expectedState = true;

    const actualState = isAddingNote(initialState, startTouchAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isAddListMemberFocused to false when STOP_ADDING_NOTE is dispatched', () => {
    const stopTouchAction = stopAddingNote();
    const expectedState = false;
    initialState = true;

    const actualState = isAddingNote(initialState, stopTouchAction);

    expect(actualState).toEqual(expectedState);
  });
});
