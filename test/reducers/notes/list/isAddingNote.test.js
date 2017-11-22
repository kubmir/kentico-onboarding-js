import { isAddingNote } from '../../../../src/reducers/notes/list/isAddingNote';
import {
  startAddingNote,
  stopAddingNote,
} from '../../../../src/actions/actionCreators';

describe('Reducer isAddingNote tests', () => {
  it('should return previous state if unknown action is dispatched', () => {
    const unknownAction = {
      type: 'Test action',
    };
    const expectedState = false;

    const actualState = isAddingNote(undefined, unknownAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isAddListMemberFocused to true when START_ADDING_NOTE is dispatched', () => {
    const startTouchAction = startAddingNote();
    const expectedState = true;

    const actualState = isAddingNote(undefined, startTouchAction);

    expect(actualState).toEqual(expectedState);
  });

  it('should set isAddListMemberFocused to false when STOP_ADDING_NOTE is dispatched', () => {
    const stopTouchAction = stopAddingNote();
    const expectedState = false;
    const mockedInitialState = true;

    const actualState = isAddingNote(mockedInitialState, stopTouchAction);

    expect(actualState).toEqual(expectedState);
  });
});
